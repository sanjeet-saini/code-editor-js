# Code Editor

A lightweight in-browser playground for HTML, CSS and JavaScript — write code in three panels and see the result live, like a mini CodePen.

**Live demo:** https://sanjeet-saini.github.io/code-editor-js/

## Features

- **Separate HTML, CSS and JavaScript panels**
- **Live preview** that refreshes shortly after you stop typing
- **Sandboxed output:** code runs in an `<iframe sandbox>`, isolated from the editor page
- **Auto-save:** your code is stored in `localStorage` and restored on refresh
- **Copy buttons** for each panel
- Responsive layout: side by side on desktop, stacked on mobile

## Tech stack

- JavaScript (ES6+)
- HTML5 `<iframe srcdoc>` and `sandbox`
- Web Storage API (`localStorage`) and Clipboard API
- CSS3 (Flexbox, media queries)

## How it works

The three panels are combined into one HTML document and set as the iframe's `srcdoc`. Each update creates a fresh document, so old scripts and event listeners never pile up. Updates are debounced by 400 ms so the preview doesn't reload on every keystroke.

## Run locally

No build step is needed. Clone the repo and open `index.html` in a browser:

```bash
git clone https://github.com/sanjeet-saini/code-editor-js.git
cd code-editor-js
```

## Author

**Sanjeet Saini** · [GitHub](https://github.com/sanjeet-saini) · [LinkedIn](https://www.linkedin.com/in/sanjeet-saini-880b1827a)
