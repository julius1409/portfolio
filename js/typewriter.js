// js/typewriter.js
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Elemente: alles mit data-tw und optional data-tw-speed / data-tw-delay
  const nodes = Array.from(document.querySelectorAll("[data-tw]"));
  if (!nodes.length || reduceMotion) return;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function typeOne(el) {
    const full = el.textContent;
    el.dataset.twFull = full;
    el.textContent = "";

    const speed = Number(el.getAttribute("data-tw-speed") || "14"); // ms/char
    const delay = Number(el.getAttribute("data-tw-delay") || "0");
    const cursor = el.getAttribute("data-tw-cursor") === "1";

    if (delay) await sleep(delay);

    for (let i = 1; i <= full.length; i++) {
      el.textContent = full.slice(0, i) + (cursor ? "▍" : "");
      await sleep(speed);
    }
    el.textContent = full; // Cursor am Ende entfernen
  }

  // Sequenziell tippen (wirkt hochwertiger als alles gleichzeitig)
  (async () => {
    for (const el of nodes) await typeOne(el);
  })();
})();
