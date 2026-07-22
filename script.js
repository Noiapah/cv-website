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
const particleCanvas = document.querySelector(".particle-field");
const particleContext = particleCanvas.getContext("2d");
const distortionMap = document.querySelector("#text-warp-map");
const distortionNoise = document.querySelector("#text-warp-noise");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let particles = [];
let particleFrame = 0;
let scrollFrame = 0;
let distortionTarget = 0;
let scrollProgress = 0;
let lastPointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, time: performance.now() };
const pointer = { x: -1000, y: -1000 };

function resizeParticleField() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  particleCanvas.width = Math.floor(window.innerWidth * ratio);
  particleCanvas.height = Math.floor(window.innerHeight * ratio);
  particleContext.setTransform(ratio, 0, 0, ratio, 0, 0);

  const particleCount = window.innerWidth < 700 ? 34 : 68;
  particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - .5) * .34,
    vy: (Math.random() - .5) * .34,
    radius: Math.random() * 1.8 + .7,
    phase: Math.random() * Math.PI * 2
  }));
}

function drawParticleField(time) {
  particleContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
  const hue = 194 + scrollProgress * 105;

  particles.forEach((particle, index) => {
    const dx = particle.x - pointer.x;
    const dy = particle.y - pointer.y;
    const pointerDistance = Math.hypot(dx, dy);

    if (pointerDistance < 150 && pointerDistance > 0) {
      const force = (150 - pointerDistance) / 150;
      particle.vx += (dx / pointerDistance) * force * .045;
      particle.vy += (dy / pointerDistance) * force * .045;
    }

    particle.vx *= .992;
    particle.vy *= .992;
    particle.x += particle.vx + Math.sin(time * .00045 + particle.phase) * .12;
    particle.y += particle.vy + Math.cos(time * .00038 + particle.phase) * .1;

    if (particle.x < -10) particle.x = window.innerWidth + 10;
    if (particle.x > window.innerWidth + 10) particle.x = -10;
    if (particle.y < -10) particle.y = window.innerHeight + 10;
    if (particle.y > window.innerHeight + 10) particle.y = -10;

    particleContext.beginPath();
    particleContext.fillStyle = `hsla(${hue + index % 38}, 100%, 72%, .82)`;
    particleContext.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    particleContext.fill();

    for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
      const other = particles[otherIndex];
      const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
      if (distance < 118) {
        particleContext.beginPath();
        particleContext.strokeStyle = `hsla(${hue + 24}, 100%, 70%, ${(1 - distance / 118) * .2})`;
        particleContext.lineWidth = .7;
        particleContext.moveTo(particle.x, particle.y);
        particleContext.lineTo(other.x, other.y);
        particleContext.stroke();
      }
    }
  });

  const currentScale = Number(distortionMap.getAttribute("scale")) || 0;
  const nextScale = currentScale + (distortionTarget - currentScale) * .16;
  distortionMap.setAttribute("scale", nextScale.toFixed(2));
  distortionTarget *= .91;
  particleFrame = requestAnimationFrame(drawParticleField);
}

function startPulseEffects() {
  if (reducedMotion.matches || particleFrame) return;
  resizeParticleField();
  updateScrollEffects();
  particleFrame = requestAnimationFrame(drawParticleField);
}

function stopPulseEffects() {
  cancelAnimationFrame(particleFrame);
  cancelAnimationFrame(scrollFrame);
  particleFrame = 0;
  scrollFrame = 0;
  particles = [];
  particleContext.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  distortionTarget = 0;
  distortionMap.setAttribute("scale", "0");
}

function updateScrollEffects() {
  if (!document.body.classList.contains("trip-mode")) return;
  const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const strength = window.innerWidth < 700 ? .55 : 1;
  scrollProgress = Math.min(window.scrollY / scrollable, 1);
  document.documentElement.style.setProperty("--scroll-y", `${-scrollProgress * 10}vh`);
  document.documentElement.style.setProperty("--scroll-hue", `${scrollProgress * 78}deg`);
  distortionNoise.setAttribute("baseFrequency", `${(.008 + scrollProgress * .006).toFixed(4)} ${(.016 + scrollProgress * .01).toFixed(4)}`);
  distortionTarget = Math.max(distortionTarget, (2.5 + scrollProgress * 3) * strength);
}

function requestScrollUpdate() {
  if (scrollFrame || !document.body.classList.contains("trip-mode")) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    updateScrollEffects();
  });
}

tripToggle.addEventListener("click", () => {
  const isActive = document.body.classList.toggle("trip-mode");
  tripToggle.setAttribute("aria-pressed", String(isActive));
  tripLabel.textContent = isActive ? "ON" : "OFF";
  if (isActive) startPulseEffects();
  else stopPulseEffects();
});

window.addEventListener("pointermove", (event) => {
  tripAura.style.setProperty("--aura-x", `${event.clientX}px`);
  tripAura.style.setProperty("--aura-y", `${event.clientY}px`);
  pointer.x = event.clientX;
  pointer.y = event.clientY;

  if (document.body.classList.contains("trip-mode")) {
    const now = performance.now();
    const elapsed = Math.max(now - lastPointer.time, 16);
    const velocity = Math.hypot(event.clientX - lastPointer.x, event.clientY - lastPointer.y) / elapsed;
    const strength = window.innerWidth < 700 ? .5 : 1;
    distortionTarget = Math.min(15 * strength, Math.max(distortionTarget, velocity * 18 * strength));
    lastPointer = { x: event.clientX, y: event.clientY, time: now };
  }
});

window.addEventListener("pointerleave", () => {
  pointer.x = -1000;
  pointer.y = -1000;
});
window.addEventListener("resize", () => {
  if (document.body.classList.contains("trip-mode")) resizeParticleField();
});
window.addEventListener("scroll", requestScrollUpdate, { passive: true });
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) stopPulseEffects();
  else if (document.body.classList.contains("trip-mode")) startPulseEffects();
});
