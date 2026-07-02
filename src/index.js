import "./styles/style.scss";
import "./styles/hero.scss";
import "./styles/services.scss";
import "./styles/trainers.scss";
import "./styles/pricing.scss";
import "./styles/reviews.scss";
import "./styles/contact.scss";

// ─── Зображення (Webpack обробляє через asset/resource) ───────────
import trainer1 from "./assets/trainer_1.jpg";
import trainer2 from "./assets/trainer_2.jpg";
import trainer3 from "./assets/trainer_3.jpg";
import client1 from "./assets/client_1.jpg";
import client2 from "./assets/client_2.jpg";
import client3 from "./assets/client_3.jpg";

// ─── Словник перекладів ────────────────────────────────────────────
// ПРИПУЩЕННЯ: об'єкт translations раніше використовувався, але ніде
// не оголошувався й не імпортувався. Виніс його в окремий файл
// translations.js такого вигляду:
//
//   export const translations = {
//     ua: { heroTitle: "...", ... },
//     en: { heroTitle: "...", ... },
//   };
//
// Якщо переклади лежать деінде — просто зміни шлях імпорту нижче.
import translations from "./translations.js";

// ─── Theme (світла/темна тема) ─────────────────────────────────────
class ThemeManager {
  constructor(toggleBtn) {
    this.toggleBtn = toggleBtn;
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem("theme") || "light";
    this.apply(savedTheme);
    this.toggleBtn.addEventListener("click", () => this.toggle());
  }

  apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  toggle() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    this.apply(next);
    localStorage.setItem("theme", next);
  }
}

// ─── Language (перемикання мови + переклади) ───────────────────────
class LanguageManager {
  constructor(btnUA, btnEN, translations) {
    this.btnUA = btnUA;
    this.btnEN = btnEN;
    this.translations = translations;
    this.init();
  }

  init() {
    const savedLang = localStorage.getItem("lang") || "ua";
    this.setActiveLang(savedLang);
    this.applyTranslations(savedLang);

    this.btnUA.addEventListener("click", () => this.switchLang("ua"));
    this.btnEN.addEventListener("click", () => this.switchLang("en"));
  }

  switchLang(lang) {
    localStorage.setItem("lang", lang);
    this.setActiveLang(lang);
    this.applyTranslations(lang);
  }

  setActiveLang(lang) {
    document.querySelectorAll(".header__lang-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
    if (activeBtn) activeBtn.classList.add("active");
  }

  applyTranslations(lang) {
    const dict = this.translations[lang];
    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.documentElement.lang = lang === "ua" ? "uk" : "en";
  }
}

// ─── Burger-меню ─────────────────────────────────────────────────
class BurgerMenu {
  constructor(burger, nav) {
    this.burger = burger;
    this.nav = nav;
    this.init();
  }

  init() {
    this.burger.addEventListener("click", () => this.toggle());

    document.querySelectorAll(".header__nav-link").forEach((link) => {
      link.addEventListener("click", () => this.close());
    });
  }

  toggle() {
    this.burger.classList.toggle("open");
    this.nav.classList.toggle("open");
  }

  close() {
    this.burger.classList.remove("open");
    this.nav.classList.remove("open");
  }
}

// ─── Підстановка реальних (хешованих) шляхів до зображень ─────────
class ImageLoader {
  constructor(map) {
    this.map = map;
  }

  setImageSources() {
    document.querySelectorAll("img[data-src]").forEach((img) => {
      const key = img.dataset.src;
      if (this.map[key]) img.src = this.map[key];
    });
  }
}

// ─── Hero divider ───────────────────────────────────────────────
class HeroDivider {
  constructor() {
    this.title = document.querySelector(".hero__title");
    this.divider = document.querySelector(".hero__divider");
    this.init();
  }

  init() {
    if (!this.title || !this.divider) return;

    this.title.addEventListener("mouseenter", () => {
      this.divider.style.width = `${this.title.getBoundingClientRect().width}px`;
    });
    this.title.addEventListener("mouseleave", () => {
      this.divider.style.width = "48px";
    });
  }
}

// ─── Select floating label ──────────────────────────────────────
// Клас .has-value піднімає лейбл, коли вибрано значення
class SelectLabels {
  constructor() {
    this.selects = document.querySelectorAll(".contact__select");
    this.init();
  }

  init() {
    this.selects.forEach((select) => {
      this.update(select);
      select.addEventListener("change", () => this.update(select));
    });
  }

  update(select) {
    select.classList.toggle("has-value", select.value !== "");
  }
}

// ─── Головний клас застосунку ───────────────────────────────────
class App {
  constructor() {
    // Елементи, які мають бути в DOM одразу (шапка сайту)
    this.burger = document.getElementById("burger");
    this.nav = document.getElementById("nav");
    this.themeToggle = document.getElementById("theme-toggle");
    this.btnUA = document.getElementById("btn-ua");
    this.btnEN = document.getElementById("btn-en");

    this.imageMap = {
      "trainer_1.jpg": trainer1,
      "trainer_2.jpg": trainer2,
      "trainer_3.jpg": trainer3,
      "client_1.jpg": client1,
      "client_2.jpg": client2,
      "client_3.jpg": client3,
    };

    this.init();
  }

  init() {
    // Тема, мова, бургер — ініціалізуються одразу, як і в оригіналі
    new ThemeManager(this.themeToggle);
    new LanguageManager(this.btnUA, this.btnEN, translations);
    new BurgerMenu(this.burger, this.nav);

    this.imageLoader = new ImageLoader(this.imageMap);

    // Зображення, hero-divider, select-labels — після завантаження DOM
    document.addEventListener("DOMContentLoaded", () => {
      this.imageLoader.setImageSources();
      new HeroDivider();
      new SelectLabels();
    });
  }
}

new App();