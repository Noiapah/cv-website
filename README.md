# Noah Cornelius Sørli — CV and portfolio

A responsive CV for a recruiter to scan: professional profile, visible project summaries,
work experience, education, and specific technical skills.

**Live website:** [noiapah.github.io/cv-website](https://noiapah.github.io/cv-website/)

## Content and interactions

- A name-and-role introduction, profile overview, email, GitHub, and LinkedIn links.
- Three projects visible together: ReuseID, Telefonhjelp, and Horsin' Around.
- A ReuseID case study and downloadable bachelor report, plus demo and source links.
- A single work-experience section with visible responsibilities.
- Separate education, volunteering, and technical-skills sections.
- Optional dialogs for the detailed case study and curriculum.
- A **Print / save CV** button using the browser's print dialog. Choose **Save as PDF**
  there to export the CV; the bachelor report is a separate document.
- Responsive layouts, keyboard focus styles, reduced-motion support, and a readable
  static CV when JavaScript is unavailable.

## Run locally

Plain HTML, CSS, and JavaScript; no build process or package installation is required.
Open `index.html` directly, or serve the directory:

```powershell
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Maintaining content

- `index.html`: profile, all three projects, skills, education, links, and dialog content.
- `styles.css`: visual design, responsive layouts, dialogs, and print formatting.
- `script.js`: dialogs, focus return, print action, and footer year.
- `timeline.js`: published work entries and the browser-local experience editor.
- `assets/`: bachelor report and other static assets.

Edit `defaultExperience` in `timeline.js` to publish work experience. Keep the static
`#timeline-list` in `index.html` in sync so visitors without JavaScript see the same CV.
Each non-empty line in an entry's description becomes a responsibility bullet.

**Edit local copy** reveals the Add, Edit, and Remove experience controls. Changes are
saved only in that browser under `ncs-work-experience-v1`; they are not published.
Existing saved entries remain compatible. Clear that local-storage key to restore the
published defaults. The editor reports when storage cannot be loaded or saved.
Editing controls are excluded from printing.

The PDF is linked in both the ReuseID summary and its case-study dialog. Update both
links if the asset is renamed. No separate CV PDF needs to be maintained: printing
uses the current page content, including locally edited experience.

## Deployment

The existing site uses GitHub Pages from `main`, repository root. Push reviewed source
changes to that branch to update the live site. In GitHub, the configuration is under
**Settings → Pages → Deploy from a branch → main → / (root)**.
