import "./styles/style.scss";
import "./styles/hero.scss";
import "./styles/services.scss";
import "./styles/trainers.scss";
import "./styles/pricing.scss";
import "./styles/reviews.scss";
import "./styles/contact.scss";

// ─── Елементи ─────────────────────────────────────────────────────
const burger      = document.getElementById("burger");
const nav         = document.getElementById("nav");
const themeToggle = document.getElementById("theme-toggle");
const btnUA       = document.getElementById("btn-ua");
const btnEN       = document.getElementById("btn-en");

// ─── Тема ─────────────────────────────────────────────────────────
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next    = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
});

// ─── Мова ─────────────────────────────────────────────────────────
const savedLang = localStorage.getItem("lang") || "ua";
setActiveLang(savedLang);

btnUA.addEventListener("click", () => switchLang("ua"));
btnEN.addEventListener("click", () => switchLang("en"));

function switchLang(lang) {
  localStorage.setItem("lang", lang);
  setActiveLang(lang);
}

function setActiveLang(lang) {
  document.querySelectorAll(".header__lang-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
  if (activeBtn) activeBtn.classList.add("active");
}

// ─── Бургер-меню ──────────────────────────────────────────────────
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  nav.classList.toggle("open");
});

document.querySelectorAll(".header__nav-link").forEach(link => {
  link.addEventListener("click", () => {
    burger.classList.remove("open");
    nav.classList.remove("open");
  });
});

// ─── Ініціалізація після завантаження DOM ─────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHeroDivider();
  initSelectLabels();
});

// ─── Hero divider ─────────────────────────────────────────────────
function initHeroDivider() {
  const title   = document.querySelector('.hero__title');
  const divider = document.querySelector('.hero__divider');
  if (!title || !divider) return;

  title.addEventListener('mouseenter', () => {
    divider.style.width = `${title.getBoundingClientRect().width}px`;
  });
  title.addEventListener('mouseleave', () => {
    divider.style.width = '48px';
  });
}

// ─── Select floating label ────────────────────────────────────────
// Клас .has-value піднімає лейбл коли вибрано значення
function initSelectLabels() {
  document.querySelectorAll('.contact__select').forEach(select => {
    updateSelectLabel(select);
    select.addEventListener('change', () => updateSelectLabel(select));
  });
}

function updateSelectLabel(select) {
  select.classList.toggle('has-value', select.value !== '');
}