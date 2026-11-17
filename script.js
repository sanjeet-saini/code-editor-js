const output = document.querySelector("#output");
const editors = {
  html: document.querySelector("#html"),
  css: document.querySelector("#css"),
  js: document.querySelector("#js"),
};
const STORAGE_KEY = "code-editor-js";

// Build a full HTML page from the three panels. Using srcdoc gives the
// preview a fresh document every time, so old scripts don't keep running.
function buildPage() {
  const js = editors.js.value.replace(/<\/script>/gi, "<\\/script>");
  return `<!DOCTYPE html>
<html>
<head><style>${editors.css.value}</style></head>
<body>
${editors.html.value}
<script>${js}<\/script>
</body>
</html>`;
}

function saveCode() {
  try {
    const code = Object.fromEntries(Object.entries(editors).map(([key, el]) => [key, el.value]));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(code));
  } catch {
    // Storage can be unavailable (private mode); the editor still works
  }
}

function loadCode() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    Object.entries(editors).forEach(([key, el]) => {
      if (typeof saved[key] === "string") el.value = saved[key];
    });
  } catch {
    // Ignore broken saved data
  }
}

function updateOutput() {
  output.srcdoc = buildPage();
  saveCode();
}

// Wait until typing pauses before re-running the preview
let timer;
function scheduleUpdate() {
  clearTimeout(timer);
  timer = setTimeout(updateOutput, 400);
}

Object.values(editors).forEach((textarea) => {
  textarea.addEventListener("input", scheduleUpdate);
});

document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(editors[button.dataset.target].value);
      button.textContent = "Copied!";
    } catch {
      button.textContent = "Copy failed";
    }
    setTimeout(() => (button.textContent = original), 1500);
  });
});

loadCode();
updateOutput();
