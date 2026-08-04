/* ===== Portfolio interactions ===== */

document.addEventListener("DOMContentLoaded", () => {
  initTypedRoles();
  initNavigation();
  initHeaderScroll();
  initRevealOnScroll();
  initActiveSection();
  initBackToTop();
  initContactForm();
  initYear();
  staggerReveals();
});

/* Typing effect for hero roles */
function initTypedRoles() {
  const el = document.getElementById("typed-text");
  if (!el) return;

  const roles = [
    "Frontend Developer",
    "Problem Solver",
    "UI/UX Enthusiast",
    "Computer Science Engineering Student",
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    el.textContent = roles[0];
    return;
  }

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex += 1;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
      setTimeout(tick, 70);
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex -= 1;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 40);
    }
  }

  tick();
}

/* Mobile nav toggle + smooth close on link click */
function initNavigation() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  const links = menu.querySelectorAll(".nav__link");

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
}

/* Frosted header on scroll */
function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  const update = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* Scroll reveal + skill bars */
function initRevealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const skillCards = document.querySelectorAll(".skills__card");

  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("visible"));
    skillCards.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  skillCards.forEach((el) => skillObserver.observe(el));
}

function staggerReveals() {
  const groups = [
    ".skills__grid .reveal",
    ".projects__grid .reveal",
    ".achievements__grid .reveal",
    ".certs__grid .reveal",
  ];

  groups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      const delay = (i % 3) + 1;
      el.classList.add(`delay-${delay}`);
    });
  });
}

/* Highlight current nav link */
function initActiveSection() {
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".nav__link");
  if (!sections.length || !links.length) return;

  const map = new Map();
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) map.set(href.slice(1), link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((l) => l.classList.remove("active"));
        const active = map.get(id);
        if (active) active.classList.add("active");
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* Back to top button */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  const update = () => {
    btn.classList.toggle("visible", window.scrollY > 500);
  };

  window.addEventListener("scroll", update, { passive: true });
  update();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* Contact form validation (client-side demo) */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name;
    const email = form.email;
    const message = form.message;
    let valid = true;

    [name, email, message].forEach((field) => field.classList.remove("error"));
    status.textContent = "";
    status.className = "form-status";

    if (!name.value.trim()) {
      name.classList.add("error");
      valid = false;
    }

    const emailValue = email.value.trim();
    if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      email.classList.add("error");
      valid = false;
    }

    if (!message.value.trim()) {
      message.classList.add("error");
      valid = false;
    }

    if (!valid) {
      status.textContent = "Please fill in all fields with a valid email.";
      status.classList.add("error");
      return;
    }

    status.textContent = "Thanks! Your message has been prepared locally.";
    status.classList.add("success");
    form.reset();
  });
}

function initYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}
