import { THEME_KEY, THEME_MODES } from "../constants/themeConstants.js";

export const applyTheme = (mode, cb = () => {}) => {
  document.body.classList.toggle("dark-theme", mode === THEME_MODES.DARK);
  document.body.classList.toggle("light-theme", mode === THEME_MODES.LIGHT);
  cb(mode);
};

export const saveTheme = (mode) => localStorage.setItem(THEME_KEY, mode);
export const loadTheme = () =>
  localStorage.getItem(THEME_KEY) || THEME_MODES.LIGHT;

export const toggleTheme = (cb = () => {}) => {
  const current = loadTheme();
  const next =
    current === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK;
  applyTheme(next, cb);
  saveTheme(next);
  return next;
};

const updateUI = (mode) => {
  const icon = document.getElementById("themeIcon");
  const label = document.querySelector("#themeToggle .label");
  if (!icon || !label) return;
  if (mode === THEME_MODES.DARK) {
    icon.textContent = "☀️";
    label.textContent = "Light";
  } else {
    icon.textContent = "🌙";
    label.textContent = "Dark";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const mode = loadTheme();
  applyTheme(mode, updateUI);
  updateUI(mode);
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const next = toggleTheme(updateUI);
      updateUI(next);
    });
  }
});
