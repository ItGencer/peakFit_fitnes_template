import "./styles/style.scss";
import "./styles/hero.scss";
import "./styles/services.scss";
import "./styles/trainers.scss";
import "./styles/pricing.scss";
import "./styles/reviews.scss";

// ─── Елементи ─────────────────────────────────────────────────────
const header      = document.getElementById("header");
const burger      = document.getElementById("burger");
const nav         = document.getElementById("nav");
const themeToggle = document.getElementById("theme-toggle");
const btnUA       = document.getElementById("btn-ua");
const btnEN       = document.getElementById("btn-en");

// ─── Тема ─────────────────────────────────────────────────────────
// Зчитуємо збережену тему з localStorage (якщо є)
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next    = current === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);

  // Міняємо іконку
  themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
});

// ─── Мова ─────────────────────────────────────────────────────────
const savedLang = localStorage.getItem("lang") || "ua";
setActiveLang(savedLang);

btnUA.addEventListener("click", () => switchLang("ua"));
btnEN.addEventListener("click", () => switchLang("en"));


function initHeroDivider() {
  const title = document.querySelector('.hero__title');
  const divider = document.querySelector('.hero__divider');
 
  if (!title || !divider) return;
 
  title.addEventListener('mouseenter', () => {
    // getBoundingClientRect() повертає реальну ширину елемента в пікселях
    const titleWidth = title.getBoundingClientRect().width;
    divider.style.width = `${titleWidth}px`;
  });
 
  title.addEventListener('mouseleave', () => {
    divider.style.width = '48px';
  });
}

function switchLang(lang) {
  localStorage.setItem("lang", lang);
  setActiveLang(lang);
  // Тут пізніше підключиш логіку i18n
}

function setActiveLang(lang) {
  // Прибираємо active у всіх кнопок мови
  document.querySelectorAll(".header__lang-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  // Додаємо active до потрібної
  const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
  if (activeBtn) activeBtn.classList.add("active");
}

// ─── Бургер-меню ──────────────────────────────────────────────────
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  nav.classList.toggle("open");
});

// Закриваємо меню при кліку на посилання (мобільний UX)
document.querySelectorAll(".header__nav-link").forEach(link => {
  link.addEventListener("click", () => {
    burger.classList.remove("open");
    nav.classList.remove("open");
  });
});


document.addEventListener('DOMContentLoaded', () => {
  initHeroDivider();
});