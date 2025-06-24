const canvas = document.getElementById('scrollCanvas');
const ctx = canvas.getContext('2d');
const video = document.getElementById('introVideo');

const totalFrames = 585;
const scrollEnd = 5000;  // Adjust as needed
let lastFrameIndex = -1;

function drawFrame(index) {
  if (index === lastFrameIndex) return;

  if (index === 0) {
    // Frame 0 → Show video, hide canvas
    canvas.style.display = 'none';
    video.style.display = 'block';

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn('Video autoplay blocked:', error);
      });
    }

    lastFrameIndex = index;
    return;
  }

  // For all other frames → Show canvas, hide video
  if (video) {
    video.pause();
    video.style.display = 'none';
  }
  canvas.style.display = 'block';

  const img = new Image();
  const frameNumber = index;  // Now starts from 1 onwards
  img.src = `https://raw.githubusercontent.com/RodrigoScopel/exist/main/existLanding.0.${frameNumber}.png`;

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
    console.warn(`❌ Failed to load frame ${index}: ${img.src}`);
  };

  lastFrameIndex = index;
}

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const clamped = Math.max(0, Math.min(scrollEnd, scrollY));
  const progress = clamped / scrollEnd;
  const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));

  drawFrame(frameIndex);
});

function initTypingAnimation() {
  // Inject blinking cursor style
  const style = document.createElement('style');
  style.innerHTML = `
    #hero-type::after {
      content: '';
      animation: blink 1s step-end infinite;
      font-weight: 300;
      color: #78091b;
      margin-left: 2px;
    }
    @keyframes blink {
      50% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  const startTypingLoop = () => {
    const container = document.getElementById('hero-type');
    if (!window.theaterJS || !container) return;

    container.textContent = '';

    const theater = window.theaterJS();
    theater
      .addActor('hero-type', {
        speed: 0.9,
        accuracy: 0.97,
        element: container,
      })
      .addScene('hero-type:EXIST to evolve', 1000)
      .addScene('hero-type:evolve to EXIST', 1000)
      .addScene('hero-type:coming soon', 1000)
      .addScene('hero-type:', 1000)
      .addScene(() => {
        startTypingLoop(); // 🔁 Loop it
      })
      .play();
  };

  const loadTheaterJS = () => {
    if (window.theaterJS) {
      startTypingLoop();
    } else {
      console.error('❌ TheaterJS not available');
    }
  };

  if (!window.theaterJS) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/theaterjs@latest/dist/theater.min.js';
    script.async = true;
    script.onload = loadTheaterJS;
    script.onerror = () => console.error('❌ Failed to load Theater.js');
    document.body.appendChild(script);
  } else {
    loadTheaterJS();
  }
}

// ✅ Run it after DOM is ready
document.addEventListener('DOMContentLoaded', initTypingAnimation);

document.addEventListener('DOMContentLoaded', () => {
  const spacer = document.getElementById('scroll-spacer');
  if (spacer) {
    spacer.style.height = `${scrollEnd}px`;  // Makes the page height match your scrollEnd
  }
});
