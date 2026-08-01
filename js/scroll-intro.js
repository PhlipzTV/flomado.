// Scroll-driven intro: the record zooms in as you scroll, the headline
// fades away, an orange flash burns through the middle, and the real
// site emerges underneath once the sticky intro releases.
(function () {
  const intro = document.getElementById("intro");
  const pin = document.querySelector(".intro-pin");
  const deck = document.querySelector(".deck-stage");
  const copy = document.querySelector(".intro-copy");
  const flash = document.querySelector(".intro-flash");
  const hint = document.querySelector(".intro-hint");
  if (!intro || !pin || !deck || !copy || !flash) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  let ticking = false;

  function update() {
    ticking = false;
    const total = intro.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const scrolled = -intro.getBoundingClientRect().top;
    const progress = Math.min(1, Math.max(0, scrolled / total));

    // record grows from its normal size up to a huge, screen-filling zoom
    const scale = 1 + progress * 11;
    deck.style.transform = `scale(${scale})`;

    // headline/cta fade + drift up early in the scroll
    const copyProgress = Math.min(1, progress / 0.32);
    copy.style.opacity = String(1 - copyProgress);
    copy.style.transform = `translateY(${-copyProgress * 60}px)`;
    copy.style.pointerEvents = copyProgress > 0.6 ? "none" : "auto";

    // orange flash bursts through the middle of the sequence
    let flashOpacity = 0;
    if (progress > 0.42 && progress < 0.92) {
      const local = (progress - 0.42) / 0.5;
      flashOpacity = local < 0.5 ? local * 2 : (1 - local) * 2;
    }
    flash.style.opacity = String(Math.max(0, Math.min(1, flashOpacity)));

    // the whole pinned stage dissolves near the end, ceding to the real site
    const stageFade = Math.min(1, Math.max(0, (progress - 0.82) / 0.18));
    pin.style.opacity = String(1 - stageFade);

    if (hint) {
      hint.style.opacity = String(Math.max(0, 1 - progress / 0.15));
    }
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
