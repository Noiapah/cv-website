const menuButton = document.querySelector(".menu-button");
const menuLabel = menuButton?.querySelector(".sr-only");
const skipLink = document.querySelector(".skip-link");
const brand = document.querySelector(".brand");
const mainContent = document.querySelector("main");
const mobileLinks = document.querySelectorAll(".mobile-nav a");
const dialogTriggers = document.querySelectorAll("[data-dialog]");
const dialogs = document.querySelectorAll("dialog");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setMenuState(isOpen) {
  document.body.classList.toggle("menu-open", isOpen);
  menuButton?.setAttribute("aria-expanded", String(isOpen));
  if (menuLabel) menuLabel.textContent = isOpen ? "Close navigation" : "Open navigation";
  if (skipLink) skipLink.inert = isOpen;
  if (brand) brand.inert = isOpen;
  if (mainContent) mainContent.inert = isOpen;
}

menuButton?.addEventListener("click", () => {
  setMenuState(!document.body.classList.contains("menu-open"));
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMenuState(false);
    requestAnimationFrame(() => menuButton?.focus({ preventScroll: true }));
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
    setMenuState(false);
    menuButton?.focus();
  }
});

window.matchMedia("(min-width: 981px)").addEventListener("change", (event) => {
  if (event.matches) setMenuState(false);
});

dialogTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const dialog = document.getElementById(trigger.dataset.dialog);
    if (!dialog) return;
    dialog.showModal();
    document.body.classList.add("dialog-open");
  });
});

dialogs.forEach((dialog) => {
  dialog.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    const isOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;
    if (isOutside) dialog.close();
  });
  dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
});

document.querySelector(".back-to-top")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
