const menuButton = document.querySelector(".menu-button");
const mobileLinks = document.querySelectorAll(".mobile-nav a");
const siteNotice = document.querySelector(".site-notice");
const acceptNotice = document.querySelector("#accept-notice");

acceptNotice.focus();
acceptNotice.addEventListener("click", () => {
  siteNotice.hidden = true;
  document.body.classList.remove("notice-open");
  document.querySelector(".site-header").removeAttribute("inert");
  document.querySelector("main").removeAttribute("inert");
  document.querySelector(".trip-toggle").removeAttribute("inert");
  document.querySelector("main").focus({ preventScroll: true });
});

function closeMenu() {
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.querySelector("#print-cv").addEventListener("click", () => window.print());
document.querySelector(".back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));

const tripToggle = document.querySelector(".trip-toggle");
const tripLabel = tripToggle.querySelector("strong");
const tripAura = document.querySelector(".trip-aura");

tripToggle.addEventListener("click", () => {
  const isActive = document.body.classList.toggle("trip-mode");
  tripToggle.setAttribute("aria-pressed", String(isActive));
  tripLabel.textContent = isActive ? "ON" : "OFF";
});

window.addEventListener("pointermove", (event) => {
  tripAura.style.setProperty("--aura-x", `${event.clientX}px`);
  tripAura.style.setProperty("--aura-y", `${event.clientY}px`);
});
