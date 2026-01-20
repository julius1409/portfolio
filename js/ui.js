(() => {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  let lastY = window.scrollY || 0;
  let ticking = false;

  const update = () => {
    const y = window.scrollY || 0;

    // show when at very top
    if (y <= 2) {
      topbar.classList.remove("is-hidden");
      lastY = y;
      ticking = false;
      return;
    }

    // hide when scrolling down, show when scrolling up
    if (y > lastY + 4) topbar.classList.add("is-hidden");
    else if (y < lastY - 4) topbar.classList.remove("is-hidden");

    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  // init state
  update();
})();
