document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const burger = document.querySelector(".fl-burger");
const links = document.querySelector(".fl-links");
if (burger && links) {
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
    links.style.display = open ? "flex" : "";
    if (open) {
      links.style.position = "fixed";
      links.style.top = "68px";
      links.style.left = "0";
      links.style.right = "0";
      links.style.flexDirection = "column";
      links.style.gap = "18px";
      links.style.padding = "24px";
      links.style.background = "#0a0908";
      links.style.borderBottom = "2px solid rgba(244,236,223,0.14)";
    }
  });
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      links.removeAttribute("style");
    });
  });
}

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// Booking form -> mailto fallback
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
