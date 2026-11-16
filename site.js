/* Theme handling, mirroring omid-tools-kit's kit-theme.js so a visitor's
 * choice carries between this site and the tools (same localStorage key).
 * Loaded in <head> so the saved theme applies before the page paints.
 * The OS preference decides by default; the toggle flips and remembers. */
(function () {
  "use strict";
  var KEY = "omid-tools-theme";

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(t) {
    try { localStorage.setItem(KEY, t); } catch (e) { /* private mode */ }
  }
  function current() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
  }
  function apply(t) {
    document.documentElement.setAttribute("data-theme", t);
    save(t);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(t === "dark"));
    });
  }

  var saved = stored();
  if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-theme", saved);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(current() === "dark"));
      b.addEventListener("click", function () {
        apply(current() === "dark" ? "light" : "dark");
      });
    });
  });
})();
