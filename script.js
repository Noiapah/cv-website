const menuButton = document.querySelector(".menu-button");
const menuLabel = menuButton?.querySelector(".sr-only");
const mobileNav = document.querySelector(".mobile-nav");
const skipLink = document.querySelector(".skip-link");
const brand = document.querySelector(".brand");
const mainContent = document.querySelector("main");
const mobileLinks = document.querySelectorAll(".mobile-nav a");
const dialogs = document.querySelectorAll("dialog");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setMenuState(isOpen) {
  document.body.classList.toggle("menu-open", isOpen);
  if (isOpen && mobileNav) mobileNav.scrollTop = 0;
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

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-dialog]");
  if (!trigger) return;
  const dialog = document.getElementById(trigger.dataset.dialog);
  if (!dialog) return;
  dialog.showModal();
  document.body.classList.add("dialog-open");
});

const projectFeature = document.querySelector(".project-feature");
const projectMeta = document.querySelector(".project-meta");
const projectCards = document.querySelectorAll(".project-card");
const selectedProjectMarkup = projectFeature?.innerHTML;
const selectedProjectMeta = projectMeta?.innerHTML;

const horsinAroundMarkup = `
  <div class="project-copy">
    <span class="client-chip">Phaser game prototype</span>
    <h2 id="project-title">Horsin'<br />Around</h2>
    <p>
      A top-down, single-player horse game with eight-direction movement,
      multiple gaits, jumping, enterable facilities, local progression, and timed racing.
    </p>
    <div class="project-tags" role="list" aria-label="Key technologies">
      <span role="listitem">Phaser 3</span>
      <span role="listitem">JavaScript</span>
      <span role="listitem">Game systems</span>
      <span role="listitem">Pixel art</span>
    </div>
    <div class="project-actions">
      <a
        class="case-link"
        href="https://github.com/Noiapah/horsinaround"
        target="_blank"
        rel="noopener noreferrer"
      >
        View source on GitHub <span aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
  <div class="project-window horse-window">
    <div class="window-bar" aria-hidden="true">
      <div class="window-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span>horsin-around / meadow</span>
    </div>
    <div class="window-body horse-body">
      <img
        src="assets/horsinaround-smoke.png"
        alt="Pixel-art gameplay showing a horse standing in a green meadow with its movement and gait HUD"
      />
    </div>
  </div>
`;

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    projectCards.forEach((item) => {
      const isSelected = item === card;
      item.classList.toggle("is-selected", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    if (!projectFeature || !projectMeta) return;

    if (card.dataset.project === "reuse-id") {
      projectFeature.innerHTML = selectedProjectMarkup;
      projectMeta.innerHTML = selectedProjectMeta;
      return;
    }

    if (card.dataset.project === "horsin-around") {
      projectFeature.innerHTML = horsinAroundMarkup;
      projectMeta.innerHTML = "Personal project <span>·</span> Browser game <span>·</span> 2026";
      return;
    }

    projectMeta.textContent = "Project details coming soon";
    projectFeature.innerHTML = `
      <div class="project-feature-empty">
        <p id="project-title">Project coming soon</p>
      </div>
    `;
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
