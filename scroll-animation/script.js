
const canvas = document.getElementById('scrollCanvas');
const ctx = canvas.getContext('2d');
const video = document.getElementById('introVideo');

const totalFrames = 585;
const videoFrameCount = 90;
const scrollEnd = 50;

let lastFrameIndex = -1;

function drawFrame(index) {
  if (index === lastFrameIndex) return;

  if (index === 0) {
    canvas.style.display = 'none';
    video.style.display = 'block';
    video.play().catch(e => console.warn('Video play blocked:', e));
    lastFrameIndex = index;
    return;
  }

  video.pause();
  video.style.display = 'none';
  canvas.style.display = 'block';

  const img = new Image();
  let imgSrc = "";

  if (index < videoFrameCount) {
    const frameNumber = String(index).padStart(3, "0");
    imgSrc = `https://raw.githubusercontent.com/RodrigoScopel/exist/main/videoFrames/existLandingEx${frameNumber}.png`;
  } else {
    imgSrc = `https://raw.githubusercontent.com/RodrigoScopel/exist/main/existLanding.0.${index}.png`;
  }

  img.onload = () => {
    ctx.clearRect(0, 0, 1920, 1080);
    const canvasAspect = 1920 / 1080;
    const imgAspect = img.width / img.height;
    let drawWidth = 1920;
    let drawHeight = 1080;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspect > canvasAspect) {
      drawWidth = 1920;
      drawHeight = 1920 / imgAspect;
      offsetY = (1080 - drawHeight) / 2;
    } else {
      drawHeight = 1080;
      drawWidth = 1080 * imgAspect;
      offsetX = (1920 - drawWidth) / 2;
    }
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  img.onerror = () => {
    console.warn(`❌ Failed to load frame ${index}: ${imgSrc}`);
  };

  img.src = imgSrc;
  lastFrameIndex = index;
}

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const clamped = Math.max(0, Math.min(scrollEnd, scrollY));
  const progress = clamped / scrollEnd;
  const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
  drawFrame(frameIndex);
});
