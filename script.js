document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    const scrollTopBtn = document.querySelector(".scroll-top");
    const themeToggle = document.querySelector(".theme-toggle");
    const root = document.documentElement;
  
    // ----- MENU MOBILE -----
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        nav.classList.toggle("open");
      });
    }
  
    if (nav) {
      nav.addEventListener("click", (e) => {
        if (e.target.tagName === "A" && nav.classList.contains("open")) {
          nav.classList.remove("open");
        }
      });
    }
  
    // ----- BOUTON SCROLL TOP -----
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  
    // ----- THEME HELIOS / NYX -----
    const THEME_KEY = "athenes_theme";
  
    function applyTheme(theme) {
      root.setAttribute("data-theme", theme);
      if (themeToggle) {
        if (theme === "light") {
          themeToggle.textContent = "☀";
          themeToggle.title = "Passer en mode nuit (Nyx)";
        } else {
          themeToggle.textContent = "🌙";
          themeToggle.title = "Passer en mode jour (Hélios)";
        }
      }
    }
  
    // Thème initial
    let stored = localStorage.getItem(THEME_KEY);
    if (stored !== "light" && stored !== "dark") {
      stored = "dark";
    }
    applyTheme(stored);
  
    // Clic sur le bouton de thème
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
      });
    }
  });
  