window.addEventListener("DOMContentLoaded", () => {
  const startTypingLoop = () => {
    const container = document.getElementById("hero-type");
    if (!window.theaterJS || !container) return;

    container.textContent = "";
    const theater = window.theaterJS();

    theater
      .addActor("hero-type", {
        speed: 0.9,
        accuracy: 0.97,
        element: container,
      })
      .addScene("hero-type:EXIST to evolve", 1000)
      .addScene("hero-type:evolve to EXIST", 1000)
      .addScene("hero-type:coming soon", 1000)
      .addScene("hero-type:", 1000)
      .addScene(() => {
        startTypingLoop();
      })
      .play();
  };

  startTypingLoop();
});
