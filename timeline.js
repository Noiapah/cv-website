(() => {
  const storageKey = "ncs-work-experience-v1";
  // Edit these entries to publish work experience for every visitor.
  const defaultExperience = [
    {
      id: "telenor",
      role: "Sales, support & store operations",
      company: "Telenor retail · Connect / Så&Høste",
      start: 2021,
      end: null,
      description: "Technical guidance, consultative sales, problem-solving, and smooth day-to-day operations across several Oslo-area stores.\n\nTroubleshot devices, connectivity, apps, accounts, and basic security settings. Supported and trained new colleagues and collaborated across stores to resolve customer cases.",
    },
  ];
  const list = document.getElementById("timeline-list");
  const dialog = document.getElementById("experience-editor");
  const form = document.getElementById("experience-form");
  const fields = form.elements;
  const status = document.getElementById("timeline-status");
  const storageNote = document.getElementById("timeline-storage-note");
  let entries = defaultExperience.map((entry) => ({ ...entry }));
  let editingId = null;
  let returnFocus = null;

  function validEntry(entry) {
    return entry && typeof entry.id === "string" && entry.id.length > 0 &&
      typeof entry.role === "string" && entry.role.trim().length > 0 && entry.role.length <= 120 &&
      typeof entry.company === "string" && entry.company.trim().length > 0 && entry.company.length <= 160 &&
      Number.isInteger(entry.start) && entry.start >= 1900 && entry.start <= 9999 &&
      (entry.end === null || (Number.isInteger(entry.end) && entry.end >= entry.start && entry.end <= 9999)) &&
      typeof entry.description === "string" && entry.description.length <= 4000;
  }

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || !parsed.every(validEntry) || new Set(parsed.map((entry) => entry.id)).size !== parsed.length) {
        throw new Error("Invalid saved timeline");
      }
      entries = parsed;
    }
  } catch {
    storageNote.textContent = "Saved experience could not be loaded. You can still edit this timeline; saving depends on browser storage being available.";
  }

  function persist(message) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(entries));
      storageNote.textContent = "Changes are saved in this browser. They are not published to other visitors.";
      status.textContent = message;
    } catch {
      storageNote.textContent = "Browser storage is unavailable. Changes will last only while this page is open.";
      status.textContent = `${message} Changes could not be saved to this browser.`;
    }
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function render(expandedId = null) {
    list.replaceChildren();
    const sorted = [...entries].sort((a, b) =>
      Number(b.end === null) - Number(a.end === null) || b.start - a.start || (b.end ?? 9999) - (a.end ?? 9999)
    );
    sorted.forEach((entry) => {
      const item = element("li", "timeline-item");
      const date = element("p", "card-date timeline-date", `${entry.start} — ${entry.end ?? "Present"}`);
      const details = element("details", "timeline-card");
      details.open = entry.id === expandedId;
      const summary = element("summary", "timeline-summary");
      const heading = element("div", "timeline-heading");
      heading.append(element("span", "card-kicker", entry.company), element("h3", "", entry.role));
      if (entry.end === null) heading.append(element("span", "timeline-current", "Current role"));
      const toggle = element("span", "timeline-toggle");
      toggle.setAttribute("aria-hidden", "true");
      summary.append(heading, toggle);
      const body = element("div", "timeline-details");
      body.append(element("p", "timeline-description", entry.description || "No additional details yet."));
      const actions = element("div", "timeline-entry-actions");
      const edit = element("button", "text-button", "Edit experience");
      edit.type = "button";
      edit.setAttribute("aria-label", `Edit ${entry.role} at ${entry.company}`);
      edit.addEventListener("click", () => openEditor(entry, edit));
      const remove = element("button", "text-button timeline-remove", "Remove");
      remove.type = "button";
      remove.setAttribute("aria-label", `Remove ${entry.role} at ${entry.company}`);
      remove.addEventListener("click", () => {
        if (!window.confirm(`Remove ${entry.role} at ${entry.company} from your timeline?`)) return;
        entries = entries.filter((item) => item.id !== entry.id);
        persist("Experience removed.");
        render();
        document.getElementById("add-experience").focus({ preventScroll: true });
      });
      actions.append(edit, remove);
      body.append(actions);
      details.append(summary, body);
      item.append(date, details);
      list.append(item);
    });
    document.getElementById("timeline-count").textContent = `${entries.length} ${entries.length === 1 ? "role" : "roles"} · Newest first`;
    document.getElementById("timeline-empty").hidden = entries.length > 0;
  }

  function updateDates() {
    fields.end.disabled = fields.current.checked;
    fields.end.required = !fields.current.checked;
    fields.end.min = fields.start.value || "1900";
    fields.end.setCustomValidity(
      !fields.current.checked && fields.end.value && Number(fields.end.value) < Number(fields.start.value)
        ? "End year must be the same as or later than the start year." : ""
    );
  }

  function openEditor(entry, trigger) {
    form.reset();
    editingId = entry?.id ?? null;
    returnFocus = trigger;
    document.getElementById("experience-editor-title").textContent = entry ? "Edit experience" : "Add experience";
    if (entry) {
      fields.role.value = entry.role;
      fields.company.value = entry.company;
      fields.start.value = entry.start;
      fields.end.value = entry.end ?? "";
      fields.current.checked = entry.end === null;
      fields.description.value = entry.description;
    }
    fields.role.setCustomValidity("");
    fields.company.setCustomValidity("");
    updateDates();
    dialog.showModal();
    document.body.classList.add("dialog-open");
    fields.role.focus();
  }

  fields.current.addEventListener("change", updateDates);
  fields.start.addEventListener("input", updateDates);
  fields.end.addEventListener("input", updateDates);
  [fields.role, fields.company].forEach((field) => field.addEventListener("input", () => field.setCustomValidity("")));
  document.getElementById("add-experience").addEventListener("click", (event) => openEditor(null, event.currentTarget));
  document.getElementById("cancel-experience").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    const target = returnFocus?.isConnected ? returnFocus : document.getElementById("add-experience");
    target.focus({ preventScroll: true });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    [fields.role, fields.company].forEach((field) => {
      field.setCustomValidity(field.value.trim() ? "" : "Please enter a value.");
    });
    updateDates();
    if (!form.reportValidity()) return;
    const entry = {
      id: editingId ?? (globalThis.crypto?.randomUUID?.() || `experience-${Date.now()}-${Math.random().toString(36).slice(2)}`),
      role: fields.role.value.trim(),
      company: fields.company.value.trim(),
      start: Number(fields.start.value),
      end: fields.current.checked ? null : Number(fields.end.value),
      description: fields.description.value.trim(),
    };
    if (editingId) entries = entries.map((item) => item.id === editingId ? entry : item);
    else entries.push(entry);
    persist(editingId ? "Experience updated." : "Experience added.");
    render(entry.id);
    dialog.close();
  });

  render();
})();
