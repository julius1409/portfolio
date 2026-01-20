(() => {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  const onScroll = () => {
    const y = window.scrollY || 0;
    if (y <= 2) topbar.classList.remove("is-hidden");
    else topbar.classList.add("is-hidden");
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
