document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
    
    // Close menu when clicking a link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  // --- Theme Toggle ---
  const themeToggle = document.querySelector(".theme-toggle");
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");

  const applyTheme = (theme) => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
    
    if (sunIcon && moonIcon) {
      if (theme === 'light') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }
  };

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem("portfolio-theme") || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.body.getAttribute("data-theme");
      applyTheme(current === "light" ? "dark" : "light");
    });
  }

  // --- Scroll Animations (Intersection Observer) ---
  const reveals = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });

  // --- Header Blur Effect on Scroll ---
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // Trigger initial reveal for elements already in viewport
  setTimeout(() => {
    reveals.forEach(reveal => {
      const rect = reveal.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        reveal.classList.add('active');
      }
    });
  }, 100);

  // --- Language Switcher ---
  const langBtns = document.querySelectorAll('.lang-btn');
  const translations = {
    en: {
      "nav-exp": "Experience",
      "nav-projects": "Projects",
      "nav-edu": "Education",
      "nav-skills": "Skills",
      "nav-about": "About me",
      "nav-contact": "Contact",
      "hero-badge": "Available for work",
      "hero-title": "Hey, I'm ",
      "hero-desc": "+4 years of experience. <strong>Statistician</strong> and <strong>Data & ML Engineer</strong>. Specialized in building scalable cloud infrastructure, predictive algorithms, and end-to-end data pipelines for complex business problems.",
      "contact-btn": "Contact me",
      "section-exp": "Work Experience",
      "section-projects": "Projects",
      "section-edu": "Education",
      "section-skills": "Skills & Tech Stack",
      "section-about": "About me",
      "section-contact": "Contact"
    },
    es: {
      "nav-exp": "Experiencia",
      "nav-projects": "Proyectos",
      "nav-edu": "Educación",
      "nav-skills": "Habilidades",
      "nav-about": "Sobre mí",
      "nav-contact": "Contacto",
      "hero-badge": "Disponible para trabajar",
      "hero-title": "Hola, soy ",
      "hero-desc": "+4 años de experiencia. <strong>Estadístico</strong> y <strong>Data & ML Engineer</strong>. Especializado en construir infraestructura cloud escalable, algoritmos predictivos y pipelines de datos de principio a fin para problemas de negocio complejos.",
      "contact-btn": "Contáctame",
      "section-exp": "Experiencia Laboral",
      "section-projects": "Proyectos",
      "section-edu": "Educación",
      "section-skills": "Habilidades y Stack Técnico",
      "section-about": "Sobre mí",
      "section-contact": "Contacto"
    }
  };

  const applyLanguage = (lang) => {
    document.documentElement.lang = lang;
    localStorage.setItem('portfolio-lang', lang);
    
    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update main UI elements
    const elements = {
      ".nav-link[href='#experience']": "nav-exp",
      ".nav-link[href='#projects']": "nav-projects",
      ".nav-link[href='#education']": "nav-edu",
      ".nav-link[href='#skills']": "nav-skills",
      ".nav-link[href='#about']": "nav-about",
      ".nav-link[href='#contact']": "nav-contact",
      ".status-badge": "hero-badge",
      ".hero-title": "hero-title",
      ".lead": "hero-desc",
      "#experience .section-title": "section-exp",
      "#projects .section-title": "section-projects",
      "#education .section-title": "section-edu",
      "#skills .section-title": "section-skills",
      "#about .section-title": "section-about",
      "#contact .section-title": "section-contact",
      ".contact-btn": "contact-btn"
    };

    Object.entries(elements).forEach(([selector, key]) => {
      const el = document.querySelector(selector);
      if (el) {
        if (key === "hero-title") {
          // Special handling for title with gradient
          const gradientText = el.querySelector('.gradient-text');
          const name = gradientText ? gradientText.textContent : 'Roberto Fajardo';
          el.innerHTML = translations[lang][key] + `<span class="gradient-text">${name}</span>`;
        } else if (key === "hero-desc" || key === "hero-badge") {
          el.innerHTML = translations[lang][key];
        } else {
          // Preserve SVG if present
          const svg = el.querySelector('svg');
          if (svg) {
            el.innerHTML = '';
            el.appendChild(svg);
            el.appendChild(document.createTextNode(' ' + translations[lang][key]));
          } else {
            el.textContent = translations[lang][key];
          }
        }
      }
    });
  };

  // Load saved language or default to en
  const savedLang = localStorage.getItem('portfolio-lang') || 'en';
  applyLanguage(savedLang);

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang);
    });
  });
});
