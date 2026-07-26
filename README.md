# CV website

A responsive, single-page CV and portfolio website built with plain HTML, CSS, and JavaScript. It has no build step and can be hosted directly with GitHub Pages.

## Preview locally

Open `index.html` in a browser, or run a small local server:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Customize

Content and links are maintained in `index.html`. Colors, typography, and layout
tokens are defined at the top of `styles.css`. Interactive navigation and dialogs
are handled by `script.js`.

The downloadable bachelor report is stored in `assets/`. Keep its filename stable
unless the two report links in `index.html` are updated at the same time.

## Publish with GitHub Pages

1. Push this repository to GitHub.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select your main branch and the `/ (root)` folder, then save.

GitHub will display the public URL after the first deployment completes.
