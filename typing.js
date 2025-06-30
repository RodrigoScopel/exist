document.addEventListener("DOMContentLoaded", () => {
  const sentences = [
    "EXIST to evolve",
    "evolve to EXIST",
    "arriving...",
    ""
  ];

  const sizer = document.getElementById("sizer");
  const heroType = document.getElementById("hero-type");
  const span = document.querySelector("#hero-type span");

  if (!sizer || !heroType || !span) return;

  let maxWidth = 0;
  sentences.forEach(text => {
    sizer.textContent = text;
    const width = sizer.offsetWidth;
    if (width > maxWidth) maxWidth = width;
  });

  heroType.style.width = `${maxWidth}px`;

  const startTyping = () => {
    span.textContent = "";
    const theater = window.theaterJS();
    theater
      .addActor("hero-type", {
        speed: 0.9,
        accuracy: 0.97,
        element: span
      })
      .addScene("hero-type:EXIST to evolve", 1000)
      .addScene("hero-type:evolve to EXIST", 1000)
      .addScene("hero-type:arriving...", 2000)
      .addScene("hero-type:", 1000)
      .addScene(() => startTyping())
      .play();
  };

  if (window.theaterJS) {
    startTyping();
  }
});
