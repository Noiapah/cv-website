const dialogs = document.querySelectorAll("dialog");
let dialogTrigger = null;

document.querySelectorAll("[data-dialog]").forEach((trigger) => {
  trigger.hidden = false;
  trigger.addEventListener("click", () => {
    const dialog = document.getElementById(trigger.dataset.dialog);
    if (!dialog) return;
    dialogTrigger = trigger;
    dialog.showModal();
    document.body.classList.add("dialog-open");
  });
});

dialogs.forEach((dialog) => {
  dialog.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    if (dialog.id !== "experience-editor") dialogTrigger?.focus({ preventScroll: true });
  });
});

const printButton = document.querySelector(".print-button");
if (printButton) {
  printButton.hidden = false;
  printButton.addEventListener("click", () => window.print());
}
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
