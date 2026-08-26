# Noah Cornelius Sørli — CV and portfolio

A responsive, single-page portfolio presenting my computer-engineering background,
professional experience, technical toolkit, and selected software projects.

**Live website:** [noiapah.github.io/cv-website](https://noiapah.github.io/cv-website/)

## About the website

The website is designed to keep the main content concise and easy to scan. Additional
details about my bachelor project, work experience, and education are available through
accessible dialog windows. A project-card selector switches the featured project without
leaving the page.

The site includes:

- A concise professional profile
- A selectable project showcase featuring the ReuseID bachelor project and
  [Spin & Spill](https://github.com/Noiapah/spin-party-game)
- A downloadable copy of the complete bachelor report
- A link to the live [Spin & Spill game](https://noiapah.github.io/spin-party-game/)
- Work, education, and volunteer experience
- A capability-card overview covering frontend, backend, cloud, security, and
  collaboration
- Responsive desktop and mobile layouts
- Keyboard navigation and reduced-motion support
- Print-friendly styling

## Technology

The website uses plain HTML, CSS, and JavaScript. It has no framework, package
dependencies, build process, or generated output.

```text
cv-website/
├── assets/
│   └── noah-sorli-bachelor-report-reuseid.pdf
├── index.html
├── script.js
├── styles.css
└── README.md
```

## Run locally

The site can be opened directly by launching `index.html` in a browser.

For behavior closer to GitHub Pages, serve the directory through a local HTTP server:

```powershell
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Maintaining the content

- Update text, links, sections, and dialog content in `index.html`.
- Update colors, typography, spacing, and responsive layouts in `styles.css`.
- Update navigation, dialog behavior, and project-selection logic in `script.js`.
- Store downloadable documents and other static files in `assets/`.

Project-card labels and ordering are defined in the `.project-picker` element in
`index.html`. The ReuseID markup comes from the initial `.project-feature` element, while
the Spin & Spill featured-project markup is stored in `spinAndSpillMarkup` in `script.js`.
When adding another project, give its card a unique `data-project` value and add the
matching selected-project markup to the card click handler.

The bachelor report is referenced twice in `index.html`: once in the main project section
and once inside the project dialog. If the PDF is renamed, both links must be updated.

## Deployment

The site is deployed through GitHub Pages from the repository root:

1. Push the changes to the `main` branch.
2. Open **Settings → Pages** in the GitHub repository.
3. Select **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Save the configuration.

GitHub Pages republishes the website after new changes reach the selected branch. Updates
may take a few minutes to appear.
