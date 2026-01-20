(() => {
  // 1) Scroll progress
  const progress = document.querySelector(".scroll-progress__bar");
  const updateProgress = () => {
    if (!progress) return;
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
    const pct = (window.scrollY || 0) / max;
    progress.style.width = `${Math.max(0, Math.min(1, pct)) * 100}%`;
  };

  // 2) Reveal on scroll
  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealAll = () => revealEls.forEach((el) => el.classList.add("is-in"));

  const setupReveal = () => {
    if (!("IntersectionObserver" in window)) {
      revealAll();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-in")),
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  };

  // 3) Back to top
  const toTop = document.querySelector(".to-top");
  const showToTop = () => {
    if (!toTop) return;
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
    const pct = (window.scrollY || 0) / max;
    toTop.classList.toggle("is-visible", pct > 0.25);
  };

  // 4) Active section highlight (nav pills)
  const navLinks = Array.from(document.querySelectorAll(".nav a[href^='#']"));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
  };

  const setupActiveSection = () => {
    if (!sections.length) return;
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.12, 0.2, 0.35, 0.5] }
    );

    sections.forEach((s) => io.observe(s));
  };

  // Bind
  window.addEventListener("scroll", () => {
    updateProgress();
    showToTop();
  }, { passive: true });

  window.addEventListener("resize", updateProgress);

  updateProgress();
  showToTop();
  setupReveal();
  setupActiveSection();
})();
