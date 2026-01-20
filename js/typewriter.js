(() => {
  const el = document.getElementById("tw");
  if (!el) return;

  const full = el.textContent.trim();
  el.textContent = "";

  let i = 0;
  const speed = 22; // ms per char

  const tick = () => {
    i++;
    el.textContent = full.slice(0, i);
    if (i < full.length) setTimeout(tick, speed);
  };

  setTimeout(tick, 180);
})();
