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
  document.addEventListener("DOMContentLoaded", function () {
  // On vérifie si on est sur la page "Important"
  const importantPage = document.querySelector("[data-important-page]");
  if (!importantPage) return;

  const STORAGE_PREFIX = "athenes-important-";

  // 1) Sauvegarde automatique des champs texte / textarea
  document.querySelectorAll("[data-store-key]").forEach((el) => {
    const key = STORAGE_PREFIX + el.dataset.storeKey;

    // Restaure la valeur si existante
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      el.value = saved;
    }

    // Sauvegarde à chaque saisie
    el.addEventListener("input", () => {
      localStorage.setItem(key, el.value);
    });
  });

  // 2) Gestion du QR code (image sauvegardée en base64 dans localStorage)
  const qrInput = document.getElementById("qr-input");
  const qrImg = document.getElementById("qr-preview");
  const qrPlaceholder = document.getElementById("qr-placeholder");
  const qrClearBtn = document.getElementById("qr-clear");
  const QR_KEY = STORAGE_PREFIX + "qr-parking";

  function updateQrVisibility() {
    if (qrImg && qrImg.src && qrImg.src.startsWith("data:image")) {
      qrImg.style.display = "block";
      if (qrPlaceholder) qrPlaceholder.style.display = "none";
    } else {
      if (qrImg) {
        qrImg.style.display = "none";
        qrImg.removeAttribute("src");
      }
      if (qrPlaceholder) qrPlaceholder.style.display = "inline-block";
    }
  }

  // Restaure l'image si déjà enregistrée
  const savedQr = localStorage.getItem(QR_KEY);
  if (savedQr && qrImg) {
    qrImg.src = savedQr;
  }
  updateQrVisibility();

  if (qrInput && qrImg) {
    qrInput.addEventListener("change", () => {
      const file = qrInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        qrImg.src = dataUrl;
        localStorage.setItem(QR_KEY, dataUrl);
        updateQrVisibility();
      };
      reader.readAsDataURL(file);
    });
  }

  if (qrClearBtn) {
    qrClearBtn.addEventListener("click", () => {
      localStorage.removeItem(QR_KEY);
      if (qrInput) qrInput.value = "";
      updateQrVisibility();
    });
  }
});
