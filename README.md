# Noah Cornelius Sørli — CV and portfolio

A responsive, single-page portfolio presenting my computer-engineering background,
professional experience, technical toolkit, and bachelor project for Signicat.

**Live website:** [noiapah.github.io/cv-website](https://noiapah.github.io/cv-website/)

## About the website

The website is designed to keep the main content concise and easy to scan. Additional
details about my bachelor project, work experience, and education are available through
accessible dialog windows.

The site includes:

- A concise professional profile
- A featured ReuseID bachelor project
- A downloadable copy of the complete bachelor report
- Work, education, and volunteer experience
- An interactive capabilities explorer covering frontend, backend, cloud, security,
  and collaboration
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
- Update navigation and dialog behavior in `script.js`.
- Store downloadable documents and other static files in `assets/`.

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
