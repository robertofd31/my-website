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
      "nav-education": "Education",
      "nav-skills": "Skills",
      "nav-about": "About me",
      "nav-contact": "Contact",
      "hero-badge": "<span class=\"status-dot\"></span>Available for work",
      "hero-title": "Hey, I'm <span class=\"gradient-text\">Roberto Fajardo</span>",
      "hero-lead": "+4 years of experience. <strong>Statistician</strong> and <strong>Data & ML Engineer</strong>. Specialized in building scalable cloud infrastructure, predictive algorithms, and end-to-end data pipelines for complex business problems.",
      "contact-btn": "Contact me",
      "section-exp": "Work Experience",
      "section-projects": "Projects",
      "section-edu": "Education",
      "section-skills": "Skills & Tech Stack",
      "section-about": "About me",
      "section-contact": "Contact",
      "exp-sabadell": "Validated performance and improved discrimination of <strong>complex credit risk models</strong>. Optimized data process workflows and developed analytical programs in <strong>SAS</strong>, enhancing overall results by <strong>50%</strong>. Managed large-scale financial databases using <strong>SQL</strong>.",
      "exp-orwee": "As the founder, I designed and implemented the <strong>end-to-end cloud architecture</strong> and built a robust <strong>ETL system</strong> coupled with a custom <strong>API</strong> that delivers real-time data to the platform, processing <strong>over 50M data points</strong>. Additionally, I integrated machine learning algorithms to provide advanced analytics for <strong>hundreds of monthly users</strong>, ensuring a scalable and data-driven user experience.",
      "exp-chaintax": "Engineered an on-chain methodology to track complex <strong>Liquidity Pools</strong> transactions, increasing tax reporting accuracy by <strong>95%</strong>. Additionally, I deployed a scalable backend infrastructure and an <strong>AI agent</strong> for regulatory queries, which reduced manual review time by <strong>60%</strong>.",
      "exp-plutus": "Designed comprehensive token longevity simulations with a <strong>3-year outlook</strong> to ensure protocol sustainability under extreme market volatility. Estimated intrinsic value capture across user segments, providing strategic modeling that increased projected staking retention by <strong>20%</strong>.",
      "exp-albeit": "Created interactive <strong>Power BI dashboards</strong> for strategic investment decisions. Developed <strong>Python-based ETL processes</strong>, successfully automating <strong>80% of visualization workflows</strong> and reporting, enhancing <strong>operational efficiency by 40%</strong>.",
      "proj-orwee-desc": "A comprehensive DeFi terminal for decentralized finance analytics. Features include a <strong>Liquidity Pools Explorer</strong>, portfolio tracking, and Funding Rate Arbitrage, processing over 50M data points to deliver real-time institutional insights.",
      "proj-heroes-desc": "Developed a centralized dashboard to track KPIs and core metrics used during classes, providing students and instructors with a single point of truth for crypto market analysis.",
      "proj-vaults-desc": "Asset Management strategy for Liquidity Pools Vaults. Liquidity research and automated flows to optimize yield performance on on-chain positions.",
      "proj-gliquid-desc": "Design of an Automated Liquidity Manager (ALM) algorithm based on Bollinger Bands and Keltner Channels. Strategy simulation engine with on-chain subgraph data extraction and time-series analysis.",
      "edu-master": "Big Data Master's Degree",
      "edu-stat": "Statistics Bachelor's Degree",
      "cert-title": "Certifications & Badges",
      "skill-ai": "AI & Machine Learning",
      "skill-etl": "ETL & Data Pipelines",
      "skill-workflow": "Workflow Automation",
      "skill-vis": "Data Visualization",
      "skill-problem": "Problem-Solving",
      "skill-mindset": "Entrepreneurial Mindset",
      "skill-remote": "Remote Work & Autonomy",
      "skill-time": "Time Management",
      "skill-finance": "Finance Knowledge",
      "about-p1": "My name is Roberto Fajardo. I am a data passionate with a background as a statistician and a strong entrepreneurial drive. I am deeply interested in <strong>transforming raw data into actionable insights and automated systems that scale</strong>.",
      "about-p2": "Throughout my career, I have transitioned from evaluating complex risk models in traditional banking (Bank Sabadell) to building <strong>cutting-edge technological solutions in fast-paced tech environments</strong>. As a founder of Orwee Solutions, I have designed <strong>cloud architectures and ETL pipelines from scratch that power robust analytical platforms</strong>.",
      "about-p3": "<strong>My goal is to solve complex problems by building resilient systems</strong>, from real-time APIs to backtesting algorithms and AI agents that automate and simplify complexity."
    },
    es: {
      "nav-exp": "Experiencia",
      "nav-projects": "Proyectos",
      "nav-education": "Formación",
      "nav-skills": "Habilidades",
      "nav-about": "Sobre mí",
      "nav-contact": "Contacto",
      "hero-badge": "<span class=\"status-dot\"></span>Disponible para trabajar",
      "hero-title": "Hola, soy <span class=\"gradient-text\">Roberto Fajardo</span>",
      "hero-lead": "+4 años de experiencia. <strong>Estadístico</strong> y <strong>Data & ML Engineer</strong>. Especializado en construir infraestructura cloud escalable, algoritmos predictivos y pipelines de datos de principio a fin para problemas de negocio complejos.",
      "contact-btn": "Contáctame",
      "section-exp": "Experiencia Laboral",
      "section-projects": "Proyectos",
      "section-edu": "Formación",
      "section-skills": "Habilidades y Stack Técnico",
      "section-about": "Sobre mí",
      "section-contact": "Contacto",
      "exp-sabadell": "Validé el rendimiento y mejoré la discriminación de <strong>modelos complejos de riesgo de crédito</strong>. Optimicé flujos de trabajo de datos y desarrollé programas analíticos en <strong>SAS</strong>, mejorando los resultados globales en un <strong>50%</strong>. Gestioné bases de datos financieras a gran escala usando <strong>SQL</strong>.",
      "exp-orwee": "Como fundador, diseñé e implementé la <strong>arquitectura cloud completa</strong> y construí un sistema <strong>ETL robusto</strong> junto con una <strong>API personalizada</strong> que entrega datos en tiempo real a la plataforma, procesando <strong>más de 50 millones de puntos de datos</strong>. Además, integré algoritmos de machine learning para proporcionar analíticas avanzadas a <strong>cientos de usuarios mensuales</strong>, asegurando una experiencia escalable y basada en datos.",
      "exp-chaintax": "Desarrollé una metodología on-chain para rastrear transacciones complejas de <strong>Liquidity Pools</strong>, logrando aumentar la precisión de los reportes fiscales en un <strong>95%</strong>. Complementariamente, desplegué infraestructura de backend escalable y un <strong>agente de IA</strong> para resolver consultas regulatorias, reduciendo el tiempo de revisión manual en un <strong>60%</strong>.",
      "exp-plutus": "Diseñé simulaciones completas de longevidad de tokens con una <strong>perspectiva de 3 años</strong> para asegurar la sostenibilidad del protocolo bajo volatilidad extrema del mercado. Estimé la captura de valor intrínseco a través de segmentos de usuarios, proporcionando modelado estratégico que aumentó la retención de staking proyectada en un <strong>20%</strong>.",
      "exp-albeit": "Creé <strong>dashboards interactivos en Power BI</strong> para decisiones estratégicas de inversión. Desarrollé <strong>procesos ETL basados en Python</strong>, automatizando con éxito el <strong>80% de los flujos de visualización</strong> y reportes, mejorando la <strong>eficiencia operativa en un 40%</strong>.",
      "proj-orwee-desc": "Una terminal DeFi integral para el análisis de finanzas descentralizadas. Incluye explorador de <strong>Liquidity Pools</strong>, seguimiento de portafolio y arbitraje de Funding Rates, procesando más de 50M de datos en tiempo real.",
      "proj-heroes-desc": "Desarrollé un dashboard centralizado para rastrear KPIs y métricas principales utilizadas en clase, proporcionando a estudiantes e instructores un único punto de verdad para el análisis del mercado cripto.",
      "proj-vaults-desc": "Estrategia de gestión de activos para Liquidity Pools Vaults. Investigación de liquidez y flujos automatizados para optimizar el rendimiento del yield en posiciones on-chain.",
      "proj-gliquid-desc": "Diseño de un algoritmo de Automated Liquidity Manager (ALM) basado en Bandas de Bollinger y Canales de Keltner. Motor de simulación de estrategias con extracción de datos de subgrafos on-chain y análisis de series temporales.",
      "edu-master": "Máster en Big Data",
      "edu-stat": "Grado en Estadística",
      "cert-title": "Certificaciones y Logros",
      "skill-ai": "IA y Machine Learning",
      "skill-etl": "ETL y Pipelines de Datos",
      "skill-workflow": "Automatización de Flujos",
      "skill-vis": "Visualización de Datos",
      "skill-problem": "Resolución de Problemas",
      "skill-mindset": "Mentalidad Emprendedora",
      "skill-remote": "Trabajo Remoto y Autonomía",
      "skill-time": "Gestión del Tiempo",
      "skill-finance": "Conocimientos Financieros",
      "about-p1": "Mi nombre es Roberto Fajardo. Soy un apasionado de los datos con formación como estadístico y un fuerte impulso emprendedor. Estoy profundamente interesado en <strong>transformar datos brutos en insights accionables y sistemas automatizados que escalen</strong>.",
      "about-p2": "A lo largo de mi carrera, he pasado de evaluar modelos complejos de riesgo en banca tradicional (Banco Sabadell) a construir <strong>soluciones tecnológicas de vanguardia en entornos tecnológicos de ritmo rápido</strong>. Como fundador de Orwee Solutions, he diseñado <strong>arquitecturas cloud y pipelines ETL desde cero que potencian plataformas analíticas robustas</strong>.",
      "about-p3": "<strong>Mi objetivo es resolver problemas complejos construyendo sistemas resilientes</strong>, desde APIs en tiempo real hasta algoritmos de backtesting y agentes de IA que automatizan y simplifican la complejidad."
    }
  };

  const applyLanguage = (lang) => {
    document.documentElement.lang = lang;
    localStorage.setItem('portfolio-lang', lang);
    
    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    const tElements = document.querySelectorAll('[data-t]');
    tElements.forEach(el => {
      const key = el.dataset.t;
      if (translations[lang][key]) {
        // Preserve SVG icons or dev-icons if present
        const svg = el.querySelector('svg');
        const devIcon = el.querySelector('.dev-icon');
        
        if (svg || devIcon) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = translations[lang][key];
          const textOnly = tempDiv.textContent || tempDiv.innerText;
          
          // Clear current content and restore icon + new text
          el.innerHTML = '';
          if (svg) el.appendChild(svg);
          if (devIcon) el.appendChild(devIcon);
          el.appendChild(document.createTextNode(' ' + textOnly.trim()));
        } else {
          el.innerHTML = translations[lang][key];
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
