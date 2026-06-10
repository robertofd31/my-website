document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when clicking a link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
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
    "en": {
        "nav-exp": "Experience",
        "nav-projects": "Projects",
        "nav-education": "Education",
        "nav-skills": "Skills",
        "nav-about": "About me",
        "nav-contact": "Contact",
        "hero-badge": "<span class=\"status-dot\"></span>Available for work",
        "hero-title": "Hey, I'm <span class=\"gradient-text\">Roberto Fajardo</span>",
        "hero-lead": "5+ years of experience. <strong>Data & AI Engineer</strong> and <strong>Statistician</strong>. Specialized in building scalable cloud infrastructure, predictive models, and end-to-end data pipelines for complex financial and AI systems.",
        "role-sabadell": "Data Scientist & Data Hub Specialist",
        "role-orwee": "Co-Founder & Tech Advisor",
        "role-eagency": "Co-Founder / Marketing Specialist",
        "contact-btn": "Contact me",
        "section-exp": "Work Experience",
        "section-projects": "Projects",
        "section-edu": "Education",
        "section-skills": "Skills & Tech Stack",
        "section-about": "About me",
        "section-contact": "Contact",
        "exp-sabadell": "<strong>Model Optimization:</strong> Promoted to Data Scientist after leading the renewal of the internal manager scoring model, increasing portfolio allocation precision by 15%.<br><strong>Performance:</strong> Validated complex credit risk models and optimized SQL/SAS data workflows, reducing data processing latency by 30%.<br><strong>AI Automation:</strong> Developed custom AI agents to enhance credit model explainability, supporting risk analysts and significantly reducing query resolution latency.",
        "exp-orwee": "<strong>Infrastructure:</strong> Designed and deployed a full-stack cloud architecture (AWS) supporting a real-time ETL system that processes 50M+ on-chain data points.<br><strong>Product Innovation:</strong> Developed a custom dashboard for advanced opportunity discovery, enabling real-time monitoring of key on-chain data for 500+ active users.<br><strong>Advanced Analytics:</strong> Implemented Python-based ML algorithms to identify yield-optimization opportunities and funding-rate arbitrage across multiple chains.",
        "exp-chaintax": "<strong>On-Chain Tracking:</strong> Engineered an on-chain data methodology to track complex Liquidity Pools transactions, increasing fiscal reporting accuracy by 95%.<br><strong>AI Automation:</strong> Deployed a scalable cloud backend infrastructure integrated with an AI agent for regulatory queries, reducing manual review time by 60%.",
        "exp-plutus": "<strong>Quantitative Modeling:</strong> Designed comprehensive token longevity simulations (5+ year outlook) using Python to ensure protocol sustainability under extreme market volatility.<br><strong>Value Capture:</strong> Modeled economic incentives across user segments, increasing projected staking retention metrics by 20%.",
        "exp-albeit": "<strong>Process Automation:</strong> Automated 80% of recurring operational and reporting workflows via Python-based ETL pipelines, increasing team efficiency by 40%.<br><strong>Data Visualization:</strong> Architected interactive strategic dashboards (Power BI/Metabase) to track 10+ DeFi protocols, driving C-level investment decisions.",
        "proj-orwee-desc": "A comprehensive <strong>DeFi terminal</strong> for decentralized finance analytics. Features include a <strong>Liquidity Pools Explorer</strong>, portfolio tracking, and <strong>Funding Rate Arbitrage</strong>, processing over <strong>50M data points</strong> to deliver real-time institutional insights.",
        "proj-heroes-desc": "Developed a <strong>centralized dashboard</strong> to track KPIs and core metrics used during classes, providing students and instructors with a <strong>single source of truth</strong> for crypto market analysis.",
        "proj-vaults-desc": "<strong>Asset Management strategy</strong> for Liquidity Pools Vaults. Liquidity research and <strong>automated flows</strong> to optimize yield performance on on-chain positions.",
        "proj-gliquid-desc": "Design of an <strong>Automated Liquidity Manager (ALM)</strong> algorithm based on Bollinger Bands and Keltner Channels. Strategy <strong>simulation engine</strong> with on-chain subgraph data extraction and <strong>time-series analysis</strong>.",
        "proj-antipasivo-desc": "Development of <strong>custom Dashboards</strong> for crypto educational academies. <strong>Real-time analysis</strong> of market opportunities and <strong>on-chain tools</strong> for students and investors.",
        "exp-eagency": "<strong>System Automation:</strong> Developed custom web solutions and automated core workflows using CRM integrations to scale client business operations.<br><strong>Data Analytics:</strong> Implemented advanced web tracking (Google Analytics) and automated A/B testing infrastructure to optimize data-driven advertising campaigns.",
        "edu-master": "Big Data Master's Degree",
        "edu-master-uni": "European University",
        "edu-stat": "Statistics Bachelor's Degree",
        "edu-stat-uni": "Complutense University",
        "cert-title": "Certifications & Badges",
        "cert-sas-uni": "SAS & Complutense University",
        "about-p1": "My name is Roberto Fajardo. I am a statistician with a strong entrepreneurial drive and a passion for <strong>transforming raw, fragmented data into production-grade infrastructure and automated systems that scale</strong>.",
        "about-p2": "Throughout my career, I have bridged two worlds: validating complex credit risk models within traditional institutional banking (Banco Sabadell) and architecting cutting-edge data solutions for fast-paced fintech and decentralized environments. As a co-founder of Orwee, I have designed cloud architectures and real-time ETL pipelines from scratch to power robust analytics platforms.",
        "about-p3": "<strong>My goal is to solve high-stakes business problems by building resilient systems</strong>, ranging from real-time financial APIs and quantitative backtesting engines to deploying AI agents that simplify operational complexity.",
        "contact-cta": "Got a project in mind?",
        "contact-desc": "Tell me about your challenge. I will analyze your case and propose the most suitable solution for your company, from data architecture and backend development to predictive algorithms, advanced visualization, or AI agent integration.",
        "footer-top": "Back to top",
        "footer-built": "Built with dedication",
        "resume-btn": "Resume",
        "skills-software": "Software & Technologies",
        "skills-core": "Core Professional Attributes",
        "skill-lang-title": "Languages & Frameworks:",
        "skill-lang-desc": "Python (Pandas, NumPy, Scikit-Learn, TensorFlow, PyTorch), SQL, SAS, R.",
        "skill-cloud-title": "Data Engineering & Cloud:",
        "skill-cloud-desc": "AWS, Docker, dbt, Airflow, Snowflake, ETL Pipelines, CI/CD, n8n, FastAPI, REST APIs, GitHub.",
        "skill-ai-title": "AI & Automation:",
        "skill-ai-desc": "AI Agents & LLM Integration, LangChain, RAG, Workflow Automation, Machine Learning.",
        "skill-db-title": "Databases:",
        "skill-db-desc": "MySQL, NoSQL, Large-Scale Relational Databases.",
        "skill-bi-title": "BI & Visualization:",
        "skill-bi-desc": "Power BI, Tableau, Metabase.",
        "attr-quant": "Quantitative Problem-Solving & Capital Markets Knowledge.",
        "attr-risk": "Risk Management & Financial Compliance.",
        "attr-research": "Quantitative Research & Backtesting Engines.",
        "attr-entre": "Entrepreneurial Mindset & Autonomous Remote Work."
    },
    "es": {
        "nav-exp": "Experiencia",
        "nav-projects": "Proyectos",
        "nav-education": "Formación",
        "nav-skills": "Habilidades",
        "nav-about": "Sobre mí",
        "nav-contact": "Contacto",
        "hero-badge": "<span class=\"status-dot\"></span>Disponible para trabajar",
        "hero-title": "Hola, soy <span class=\"gradient-text\">Roberto Fajardo</span>",
        "hero-lead": "Más de 5 años de experiencia. <strong>Data & AI Engineer</strong> y <strong>Estadístico</strong>. Especializado en construir infraestructura cloud escalable, modelos predictivos y pipelines de datos de principio a fin para sistemas financieros y de IA complejos.",
        "role-sabadell": "Data Scientist & Data Hub Specialist",
        "role-orwee": "Co-Founder & Tech Advisor",
        "role-eagency": "Co-Founder / Marketing Specialist",
        "contact-btn": "Contáctame",
        "section-exp": "Experiencia Laboral",
        "section-projects": "Proyectos",
        "section-edu": "Formación",
        "section-skills": "Habilidades y Stack Tecnológico",
        "section-about": "Sobre mí",
        "section-contact": "Contacto",
        "exp-sabadell": "<strong>Optimización de Modelos:</strong> Ascendido a Data Scientist tras liderar la renovación del modelo interno de scoring de gestores, aumentando la precisión en la asignación de carteras en un 15%.<br><strong>Rendimiento:</strong> Validación de modelos complejos de riesgo de crédito y optimización de flujos de datos en SQL/SAS, reduciendo la latencia de procesamiento en un 30%.<br><strong>Automatización con IA:</strong> Desarrollo de agentes de IA personalizados para mejorar la explicabilidad de los modelos de crédito, apoyando a analistas de riesgo y reduciendo significativamente la latencia en la resolución de consultas.",
        "exp-orwee": "<strong>Infraestructura:</strong> Diseño y despliegue de arquitectura cloud full-stack (AWS) que soporta un sistema ETL en tiempo real, procesando más de 50M de datos on-chain.<br><strong>Innovación de Producto:</strong> Desarrollo de un dashboard personalizado para la búsqueda avanzada de oportunidades, permitiendo monitorizar en tiempo real datos clave on-chain para más de 500 usuarios activos.<br><strong>Analítica Avanzada:</strong> Implementación de algoritmos ML en Python para identificar oportunidades de yield y arbitraje de funding-rates en múltiples cadenas.",
        "exp-chaintax": "<strong>Seguimiento On-Chain:</strong> Diseño de una metodología de datos on-chain para rastrear transacciones complejas en Liquidity Pools, aumentando la precisión de los informes fiscales en un 95%.<br><strong>Automatización con IA:</strong> Despliegue de infraestructura backend escalable integrada con un agente de IA para consultas regulatorias, reduciendo el tiempo de revisión manual en un 60%.",
        "exp-plutus": "<strong>Modelado Cuantitativo:</strong> Diseño de simulaciones exhaustivas de longevidad de tokens (proyección a 5+ años) usando Python para garantizar la sostenibilidad del protocolo bajo volatilidad extrema del mercado.<br><strong>Captura de Valor:</strong> Modelado de incentivos económicos por segmentos de usuarios, aumentando las métricas de retención de staking proyectadas en un 20%.",
        "exp-albeit": "<strong>Automatización de Procesos:</strong> Automatización del 80% de los flujos operativos y de reporting recurrentes mediante pipelines ETL en Python, aumentando la eficiencia del equipo en un 40%.<br><strong>Visualización de Datos:</strong> Diseño de dashboards estratégicos interactivos (Power BI/Metabase) para hacer seguimiento de más de 10 protocolos DeFi, respaldando decisiones de inversión a nivel directivo.",
        "proj-orwee-desc": "Un <strong>terminal DeFi</strong> integral para el análisis de finanzas descentralizadas. Incluye un <strong>explorador de Liquidity Pools</strong>, seguimiento de cartera y <strong>arbitraje de Funding Rates</strong>, procesando más de <strong>50M de datos</strong> para ofrecer información de nivel institucional en tiempo real.",
        "proj-heroes-desc": "Desarrollo de un <strong>dashboard centralizado</strong> para monitorizar los KPIs y métricas principales utilizados en clase, proporcionando a estudiantes e instructores una <strong>única fuente de verdad</strong> para el análisis del mercado cripto.",
        "proj-vaults-desc": "<strong>Estrategia de gestión de activos</strong> para Liquidity Pools Vaults. Investigación de liquidez y <strong>flujos automatizados</strong> para optimizar el rendimiento del yield en posiciones on-chain.",
        "proj-gliquid-desc": "Diseño de un algoritmo de <strong>Automated Liquidity Manager (ALM)</strong> basado en Bandas de Bollinger y Canales de Keltner. Motor de <strong>simulación de estrategias</strong> con extracción de datos de subgrafos on-chain y <strong>análisis de series temporales</strong>.",
        "proj-antipasivo-desc": "Desarrollo de <strong>dashboards personalizados</strong> para academias de formación cripto. <strong>Análisis en tiempo real</strong> de oportunidades de mercado y <strong>herramientas on-chain</strong> para estudiantes e inversores.",
        "exp-eagency": "<strong>Automatización de Sistemas:</strong> Desarrollo de soluciones web a medida y automatización de flujos centrales usando integraciones CRM para escalar operaciones de clientes.<br><strong>Analítica de Datos:</strong> Implementación de rastreo web avanzado (Google Analytics) e infraestructura de A/B testing para optimizar campañas publicitarias basadas en datos.",
        "edu-master": "Máster en Big Data",
        "edu-master-uni": "Universidad Europea",
        "edu-stat": "Grado en Estadística",
        "edu-stat-uni": "Universidad Complutense",
        "cert-title": "Certificaciones y Logros",
        "cert-sas-uni": "SAS y Universidad Complutense",
        "about-p1": "Me llamo Roberto Fajardo. Soy estadístico, con una fuerte vocación emprendedora y pasión por <strong>transformar datos en bruto y fragmentados en infraestructura lista para producción y sistemas automatizados que escalan</strong>.",
        "about-p2": "A lo largo de mi carrera he conectado dos mundos: la validación de modelos complejos de riesgo de crédito en la banca institucional tradicional (Banco Sabadell) y el diseño de soluciones de datos de vanguardia para entornos fintech y descentralizados muy dinámicos. Como cofundador de Orwee, he diseñado desde cero arquitecturas cloud y pipelines ETL en tiempo real que impulsan plataformas analíticas robustas.",
        "about-p3": "<strong>Mi objetivo es resolver problemas de negocio de alto impacto construyendo sistemas resilientes</strong>, desde APIs financieras en tiempo real y motores de backtesting cuantitativo hasta el despliegue de agentes de IA que simplifican la complejidad operativa.",
"contact-cta": "¿Hablamos de tu proyecto?",
        "contact-desc": "Cuéntame a qué reto técnico te enfrentas. Analizaré tus necesidades para diseñar la solución que mejor se adapte a tu negocio, ya sea optimizando la arquitectura de datos y el backend, desarrollando algoritmos predictivos o integrando agentes de IA a medida.",
        "footer-top": "Volver arriba",
        "footer-built": "Hecho con dedicación",
        "resume-btn": "Currículum",
        "skills-software": "Software y Tecnologías",
        "skills-core": "Competencias Profesionales Clave",
        "skill-lang-title": "Lenguajes y Frameworks:",
        "skill-lang-desc": "Python (Pandas, NumPy, Scikit-Learn, TensorFlow, PyTorch), SQL, SAS, R.",
        "skill-cloud-title": "Ingeniería de Datos y Cloud:",
        "skill-cloud-desc": "AWS, Docker, dbt, Airflow, Snowflake, Pipelines ETL, CI/CD, n8n, FastAPI, REST APIs, GitHub.",
        "skill-ai-title": "IA y Automatización:",
        "skill-ai-desc": "Integración de Agentes de IA y LLMs, LangChain, RAG, Workflows, Machine Learning.",
        "skill-db-title": "Bases de Datos:",
        "skill-db-desc": "MySQL, NoSQL, Bases de Datos Relacionales a Gran Escala.",
        "skill-bi-title": "BI y Visualización:",
        "skill-bi-desc": "Power BI, Tableau, Metabase.",
        "attr-quant": "Resolución de Problemas Cuantitativos y Conocimiento de Mercados de Capitales.",
        "attr-risk": "Gestión de Riesgos y Cumplimiento Financiero.",
        "attr-research": "Investigación Cuantitativa y Motores de Backtesting.",
        "attr-entre": "Mentalidad Emprendedora y Autonomía en Trabajo Remoto."
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

    // Update resume download link
    const resumeLink = document.querySelector('[data-resume-en]');
    if (resumeLink) {
      resumeLink.href = resumeLink.dataset[`resume${lang === 'en' ? 'En' : 'Es'}`];
    }
  };

  // Load saved language or default to en
  const savedLang = localStorage.getItem('portfolio-lang') || 'en';
  applyLanguage(savedLang);

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang);
    });
  });

  // --- Footer Year ---
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

