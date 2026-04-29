import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import ffmpegStatic from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';

(async () => {
  console.log('Launching browser (Hardware Accelerated)...');
  // `headless: false` forces Chromium to use real GPU acceleration, massively increasing animation frame rates!
  const browser = await chromium.launch({ headless: false });

  // Switching back to exactly 720x1280 HD for optimal file size and recording performance!
  const context = await browser.newContext({
    viewport: { width: 540, height: 960 },
    isMobile: true,
    hasTouch: true,
    recordVideo: {
      dir: './videos/',
      size: { width: 540, height: 960 }
    }
  });

  const page = await context.newPage();

  // Get the raw video path before closing
  const videoObj = page.video();
  const rawVideoPath = await videoObj.path();

  const startTime = Date.now();

  console.log('Navigating to local app...');
  await page.goto('http://localhost:5173');

  // Inject CSS to hide floating navigation and mute buttons visually during video capture!
  // We use opacity: 0 and pointer-events: none so it doesn't affect layout, 
  // and page.$eval(el => el.click()) will still successfully click them to navigate.
  await page.addStyleTag({ content: `
    .glass-back-btn,
    .mute-btn-fixed {
      opacity: 0 !important;
      pointer-events: none !important;
    }
  `});

  // Inject a native zoom to scale elements up!
  // 720 / 432 = 1.6666, making the layout act exactly like a standard iPhone width.
  /*await page.evaluate(() => {
    document.documentElement.style.zoom = '1.25';
  });*/

  console.log('Waiting for "Begin" button...');
  await page.waitForSelector('button[title="Begin"]', { state: 'visible', timeout: 60000 });
  await page.waitForTimeout(500);

  console.log('Clicking "Begin" (audio technically starts here in app)...');
  const beginClickTime = Date.now();
  const offsetMs = beginClickTime - startTime; // Time from start of video until music kicks in
  // Use $eval to click via DOM to bypass coordinate math which breaks when CSS zoom is applied
  await page.$eval('button[title="Begin"]', el => el.click());

  await page.waitForTimeout(1000);

  console.log('Viewing Landing Page...');
  await page.waitForTimeout(6000);

  console.log('Opening the invitation...');
  await page.$eval('section[role="button"]', el => el.click());

  await page.waitForTimeout(2500);

  console.log('Scrolling down Chennai Venue Page smoothly...');
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let scrolled = 0;
      let stuckFrames = 0;
      let lastScrollY = -1;
      const distance = 3; // move 3 pixels per frame

      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        scrolled += distance;

        // If the scrollbar physically hasn't moved down for 5 consecutive frames, we hit the bottom wall!
        if (window.scrollY === lastScrollY) {
          stuckFrames++;
          if (stuckFrames >= 5) {
            clearInterval(timer);
            resolve();
          }
        } else {
          stuckFrames = 0;
          lastScrollY = window.scrollY;
        }

        // Ultimate failsafe to prevent infinite loops just in case
        if (scrolled >= 15000) {
          clearInterval(timer);
          resolve();
        }
      }, 16); // target 60fps
    });
  });

  await page.waitForTimeout(3000);
  await page.waitForTimeout(2000);

  console.log('Closing browser and flushing raw video...');
  await context.close();
  await browser.close();

  // We will crop 1.0 second from the raw video using ffmpeg, so we subtract it from the total duration
  const captureDurationSec = ((Date.now() - startTime) / 1000) - 1.0;
  const fadeOutStart = Math.max(0, captureDurationSec - 1.5).toFixed(2); // Fade out the last 1.5 seconds

  // === AUDIO ADDITION STEP ===
  console.log('Extracting audio and enhancing video quality...');
  const audioPath = path.resolve('./src/assets/until_i_found_you.ogg');
  const finalVideoPath = path.resolve('./videos/wedding_invitation_final.mp4');

  if (fs.existsSync(finalVideoPath)) {
    fs.unlinkSync(finalVideoPath);
  }

  // Delay the audio slightly so it syncs with when exactly we clicked the 'Begin' button.
  // We subtract 1000ms because of the video crop, and another 1000ms to intentionally start the audio one second earlier!
  const offsetSeconds = (Math.max(0, offsetMs - 2000) / 1000).toFixed(2);

  try {
    // Combine video + audio using a static ffmpeg binary (doesn't require global install)
    execFileSync(ffmpegStatic, [
      '-ss', '1.0',                     // Drop the first 1.0 second of the raw video
      '-i', rawVideoPath,               // Input 1: The Raw WebM video
      '-itsoffset', offsetSeconds,      // Delay the next input (audio) to sync with click
      '-i', audioPath,                  // Input 2: The background music file
      '-map', '0:v:0',                  // Use video from Input 1
      '-map', '1:a:0',                  // Use audio from Input 2
      '-vf', `fade=t=in:st=0:d=3.0,fade=t=out:st=${fadeOutStart}:d=1.5`,   // Fade from black at start, fade to black at end
      '-af', `afade=t=in:st=0:d=3.0,afade=t=out:st=${fadeOutStart}:d=1.5`,  // Fade audio in at start, fade out at end
      '-c:v', 'libx264',                // Best quality video codec (MP4)
      '-preset', 'slow',                // Excellent compression
      '-crf', '16',                     // Visually lossless, but standard mobile compression
      '-profile:v', 'high',             // Strictly required profile for flawless iPhone/Android playback
      '-c:a', 'aac',                    // Best quality audio codec
      '-b:a', '320k',                   // Maximum Audio bitrate
      '-pix_fmt', 'yuv420p',            // MANDATORY chroma-subsampling for all smartphone hardware decoders
      '-shortest',                      // Stop when the video stops (not the long song)
      '-y',                             // Overwrite if exists
      finalVideoPath
    ]);

    console.log(`\n🎉 Success! High-Quality MP4 Video with Audio saved at:`);
    console.log(finalVideoPath);

    // Optional: Delete the raw, audio-less webm to keep folder clean
    fs.unlinkSync(rawVideoPath);

  } catch (error) {
    console.error('\nError adding audio. Ensure ffmpeg-static was installed.');
    console.error(error.message);
  }
})();
