document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    mainNav.style.display = isOpen ? "flex" : "";
    if (isOpen) {
      mainNav.style.position = "absolute";
      mainNav.style.top = "76px";
      mainNav.style.left = "0";
      mainNav.style.right = "0";
      mainNav.style.flexDirection = "column";
      mainNav.style.padding = "20px 24px";
      mainNav.style.background = "rgba(7,5,10,0.97)";
      mainNav.style.borderBottom = "1px solid rgba(255,255,255,0.08)";
    }
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      mainNav.removeAttribute("style");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal-on-scroll for cards, steps, stats, posters
const revealTargets = document.querySelectorAll(
  ".card, .step, .stat-card, .about-text, .about-visual, .poster-item, .discog-panel, .film-teaser"
);
if ("IntersectionObserver" in window) {
  revealTargets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => io.observe(el));
}

// Booking form (no backend — opens a pre-filled email as fallback)
const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const kind = data.get("kind");
    const message = data.get("message");
    const subject = encodeURIComponent(`Anfrage über flomado.-Website: ${kind}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:DEINE-EMAIL@beispiel.de?subject=${subject}&body=${body}`;
    note.textContent = "Dein E-Mail-Programm wird geöffnet …";
  });
}
