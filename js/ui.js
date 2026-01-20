(() => {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  const update = () => {
    const y = window.scrollY || 0;
    if (y <= 2) topbar.classList.remove("is-hidden");
    else topbar.classList.add("is-hidden");
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
})();

