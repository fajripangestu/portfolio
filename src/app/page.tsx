"use client";

import { useState, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const themeChangeEvent = "portfolio-theme-change";

function getThemeSnapshot(): Theme {
  return window.localStorage.getItem("portfolio-theme") === "dark" ? "dark" : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(themeChangeEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(themeChangeEvent, callback);
  };
}

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Skill", href: "#skill" },
  { label: "Projects", href: "#projects" },
  { label: "Certificate", href: "#certificate" },
  { label: "Contact", href: "#contact" },
];

const skillGroups = [
  { category: "Programming languages", items: ["JavaScript", "TypeScript"] },
  { category: "Frontend", items: ["Next.js", "React.js", "Tailwind CSS"] },
  { category: "Backend", items: ["NestJS", "Node.js"] },
  { category: "Database & ORM", items: ["PostgreSQL", "Prisma"] },
  { category: "Cloud & infrastructure", items: ["Railway", "Netlify", "Supabase"] },
  { category: "Development tools", items: ["Git", "VS Code", "Postman", "pgAdmin", "Copilot", "Claude"] },
];

const projects = [
  {
    number: "01",
    category: "RevoU Final Project · Aug — Nov 2026",
    title: "Manutics",
    description:
      "Integrated manufacturing platform connecting customer orders with internal workflows for order validation, production planning, raw materials, production execution, quality control, and warehouse operations. Includes management analytics and Super Admin configuration.",
    tags: ["Next.js", "React.js", "Tailwind CSS", "NestJS", "Node.js", "Prisma", "PostgreSQL"],
    color: "mint",
    link: "https://manutics.netlify.app/",
  },
];

const experiences = [
  {
    icon: "✳",
    date: "Sep 2024 — Mar 2026",
    title: "QA Engineer",
    company: "PT. Tata Metal Lestari",
    bullets: [
      "Developed and maintained Excel VBA Macro-based applications to automate data management, quality analysis, and reporting processes, improving efficiency and data accuracy.",
      "Performed daily product quality monitoring and evaluated hold/release decisions through data analysis and direct product assessments.",
      "Conducted root cause analysis of customer complaints and drove corrective and preventive actions to improve customer satisfaction.",
      "Initiated and executed continuous improvement programs to enhance process capability, product quality, operational efficiency, and defect prevention.",
      "Supported ISO/IEC 17025 accreditation activities, including quality documentation, audit preparation, compliance monitoring, and laboratory quality management system implementation.",
    ],
    tags: ["Quality Assurance", "Root Cause Analysis", "ISO/IEC 17025"],
  },
  {
    icon: "↗",
    date: "Oct 2020 — Sep 2024",
    title: "Foreman Metallurgy",
    company: "PT. Serinding Sumber Makmur",
    bullets: [
      "Developed and maintained Excel VBA Macro applications for data entry, process automation, analysis, and reporting, improving efficiency and data accuracy.",
      "Prepared accurate and comprehensive reports to support management decision-making and operational reviews.",
      "Conducted performance evaluations and data analysis to support continuous improvement initiatives.",
      "Identified, analyzed, and resolved operational and technical issues through effective problem-solving and root cause analysis.",
      "Monitored daily operations and ensured processes were executed efficiently and in compliance with established standards.",
    ],
    tags: ["Metallurgy", "Operations", "Process Improvement"],
  },
  {
    icon: "✦",
    date: "Aug 2019 — Jan 2020",
    title: "Management Trainee",
    company: "PT. Indonesia Guang Ching Nickel and Stainless Steel Industry",
    bullets: [
      "Developed a comprehensive understanding of the ferronickel production process, from raw ore processing and material preparation to the smelting stage that produces molten ferronickel.",
      "Actively participated in field operations, particularly within the Furnace Department, to gain hands-on experience, identify operational challenges, and support continuous process improvement initiatives.",
      "Collaborated with engineers, supervisors, and production personnel to analyze operational performance, troubleshoot process issues, and improve overall production efficiency and reliability.",
    ],
    tags: ["Ferronickel", "Furnace Operations", "Process Improvement"],
  },
  {
    icon: "✳",
    date: "Jan 2019 — Mar 2019",
    title: "Construction Project Engineer",
    company: "MASARO Project · Cilegon",
    bullets: [
      "Ensured the availability of equipment, materials, and resources required for the installation of incinerator and pyrolysis systems to support project execution according to schedule.",
      "Supervised and monitored the installation process of incinerator and pyrolysis equipment to ensure compliance with approved engineering designs, technical specifications, quality standards, and safety requirements.",
      "Coordinated with clients, project teams, and other stakeholders to ensure project activities were carried out smoothly, efficiently, and effectively while meeting project objectives and timelines.",
    ],
    tags: ["Project Engineering", "Installation", "Coordination"],
  },
  {
    icon: "↗",
    date: "Apr 2018 — Oct 2018",
    title: "Engineer",
    company: "PT. Tata Metal Lestari",
    bullets: [
      "Conducted technical evaluations and comparisons of laboratory equipment, including Universal Testing Machines (UTM) and Optical Emission Spectrometers (OES), from multiple vendors to support management decision-making and procurement processes.",
      "Performed technical assessments and comparisons of Wastewater Treatment Plant (WWTP) and Water Treatment Plant (WTP) packages from various vendors to identify the most suitable solutions based on project requirements, technical specifications, and cost considerations.",
      "Coordinated with the selected vendor throughout the WWTP construction process to ensure compliance with project specifications, quality standards, budget requirements, and project schedules.",
      "Designed a resin circulation system between the coater and supply tank by optimizing the existing plant conditions, process requirements, and operational constraints.",
    ],
    tags: ["Technical Evaluation", "Water Treatment", "Process Design"],
  },
  {
    icon: "✦",
    date: "Dec 2017 — Apr 2018",
    title: "Project Engineer",
    company: "MASARO Project · Indramayu",
    bullets: [
      "Ensured the smooth and effective operation of waste treatment processes for organic waste, plastic waste, and other waste materials, in compliance with applicable operational and environmental standards.",
      "Oversaw the end-to-end production process of liquid organic fertilizer, including equipment setup, raw material preparation, production operations, and product marketing.",
      "Maintained effective communication and collaboration with project owners, sponsoring organizations, project stakeholders, and local communities to support the successful execution and long-term sustainability of projects.",
    ],
    tags: ["Waste Treatment", "Production", "Stakeholder Management"],
  },
];

const certificates = [
  { date: "Oct 2026", title: "Full Stack Software Engineer", issuer: "RevoU" },
  { date: "Nov 2023", title: "Belajar Dasar Pemrograman JavaScript", issuer: "Dicoding" },
  { date: "Oct 2020", title: "Belajar Dasar Pemrograman Web", issuer: "Dicoding" },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={diagonal ? "arrow-diagonal" : ""}
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    window.localStorage.setItem("portfolio-theme", nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <div className="site-shell" data-theme={theme}>
      <header className="site-header">
        <a
          className="brand"
          href="#home"
          aria-label="Fajri Pangestu, kembali ke beranda"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-mark">f</span>
          <span className="brand-name">fajri<span>p.</span></span>
        </a>

        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Navigasi utama">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Aktifkan mode ${theme === "light" ? "gelap" : "terang"}`}
            title={`Mode ${theme === "light" ? "gelap" : "terang"}`}
          >
            {theme === "light" ? (
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            )}
          </button>
          <a className="header-cta" href="#contact">
            Let&apos;s talk <ArrowIcon diagonal />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Tutup navigasi" : "Buka navigasi"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability">
              <span className="availability-dot" /> SOFTWARE ENGINEER · FULL-STACK WEB DEVELOPER· BACKEND DEVELOPER
            </div>
            <p className="hero-greeting">Hello, I'm Fajri Pangestu <span>✳</span></p>
            <h1>
              Making people's
              <br />
              work <span className="text-gradient">better</span>
              <br />
              through
              <br/>
              the <span className="text-gradient">web </span><span className="accent-dot">.</span>
            </h1>
            <p className="hero-description">
              Engineering graduate transitioning into software engineering, building
              full-stack web applications with <strong>JavaScript, Next.js, NestJS,
              and PostgreSQL</strong>.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                See my projects <ArrowIcon />
              </a>
              <a className="text-link" href="#about">
                About Me <span>↓</span>
              </a>
            </div>
            <div className="hero-meta">
              <span><i className="meta-star">✳</i>West Java, Indonesia</span>
              <span className="meta-divider" />
              <span>Full-stack · Backend · Web</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Ilustrasi profil Fajri Pangestu">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-glow" />
            <div className="visual-card">
              <span className="visual-card-label">FUNCTIONAL & INTEGRATED</span>
              <div className="portrait">
                <img
                  src="/fajri-profile.jpeg"
                  alt="Fajri Pangestu"
                  className="portrait-image"
                />
                <div className="portrait-spark spark-one">✳</div>
                <div className="portrait-spark spark-two">✦</div>
              </div>
              <div className="visual-card-footer">
                <span>Fajri Pangestu</span>
                <span className="online-indicator" />
              </div>
              <span className="visual-role">FULL-STACK WEB DEVELOPER</span>
            </div>
            <div className="floating-note note-top">
              <span className="note-icon">✳</span>
              <span><strong>Clean code</strong><small>built with care</small></span>
            </div>
            <div className="floating-note note-bottom">
              <span className="note-swatch" />
              <span><strong>Good design</strong><small>feels effortless</small></span>
            </div>
            <span className="visual-cross cross-one">+</span>
            <span className="visual-cross cross-two">+</span>
          </div>

          <a href="#about" className="scroll-cue">
            <span className="scroll-line" /> SCROLL TO EXPLORE
          </a>
          <div className="hero-index">01 — 08</div>
        </section>

        <section className="about section-wrap section-block" id="about">
          <div className="section-heading">
            <p className="eyebrow"><span>01</span> About Me </p>
            <h2>Building great things,<br /><span>for others</span> goodness.</h2>
          </div>
          <div className="about-content">
            <div className="about-main">
              <p className="about-lead">
                I believe the best technology is the one that feels simple to use.
              </p>
              <p>
                I am an Engineering graduate with professional experience since 2016,
                transitioning into Software Engineering in 2026. My career has
                strengthened my analytical, problem-solving, and technical skills.
              </p>
              <p>
                Through the RevoU Software Engineering Bootcamp, I have gained
                hands-on experience building web applications with JavaScript,
                Next.js, and React.js on the frontend, and NestJS, Prisma, and
                PostgreSQL on the backend.
              </p>
              <p>
                I continue to grow through practical projects and ongoing learning.
                My goal is to build scalable, efficient software that improves
                business processes and delivers long-term value.
              </p>
              <a className="text-link about-link" href="#contact">
                Share Your Idea <ArrowIcon />
              </a>
            </div>
            <div className="about-facts">
              <div className="fact-card">
                <span className="fact-number">10<span>+</span></span>
                <span className="fact-label">Years of professional experience</span>
              </div>
              <div className="fact-card">
                <span className="fact-number">01</span>
                <span className="fact-label">Featured software project</span>
              </div>
              <div className="fact-card fact-wide">
                <span className="fact-icon">✳</span>
                <span className="fact-label">Engineering experience. Software-minded solutions.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap section-block" id="education">
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow"><span>02</span> LEARNING JOURNEY</p>
              <h2>Education<span className="accent-dot">.</span></h2>
            </div>
            <p className="heading-note">The foundation I continue to develop.</p>
          </div>
          <div className="timeline-card">
            <div className="timeline-marker"><span /></div>
            <div className="timeline-body">
              <div className="timeline-topline">
                <span className="timeline-date">Feb 2026 — Sep 2026</span>
                <span className="status-tag">Bootcamp</span>
              </div>
              <h3>RevoU</h3>
              <p className="timeline-subtitle">Full Stack Software Engineer Bootcamp</p>
              <p className="timeline-description">
                Focused on full-stack web development with JavaScript through hands-on projects in frontend and backend development, software fundamentals, database management, API development, and system design.
              </p>
              <a className="timeline-project-link" href="https://manutics.netlify.app/" target="_blank" rel="noreferrer">
                Final project: Manutics (Manufacturing & Analytics) <ArrowIcon diagonal />
              </a>
            </div>
            <span className="timeline-index">02</span>
          </div>
          <div className="timeline-card">
            <div className="timeline-marker"><span /></div>
            <div className="timeline-body">
              <div className="timeline-topline">
                <span className="timeline-date">Jul 2012 — Oct 2016</span>
                <span className="status-tag">Education</span>
              </div>
              <h3>Institut Teknologi Bandung</h3>
              <p className="timeline-subtitle">Metallurgical Engineering · GPA 3.06</p>
              <p className="timeline-description">
                Thesis: “Effect of Germanium and Zirconium Addition on the Cyclic Oxidation Resistance of Ni-9.6Cr-5.6Al-2.4Ti Superalloys at 900°C, 1000°C and 1100°C.” Researched mass change, oxide scale formation, and protective-layer stability during thermal cycling.
              </p>
            </div>
            <span className="timeline-index">01</span>
          </div>
        </section>

        <section className="experience section-block" id="experience">
          <div className="section-wrap">
            <div className="section-heading section-heading-row">
              <div>
                <p className="eyebrow"><span>03</span> Work Experience</p>
                <h2>Experience<span className="accent-dot">.</span></h2>
              </div>
              <p className="heading-note">Engaging in the process, collaborating, growing.</p>
            </div>
            <div className="experience-grid">
              {experiences.map((experience, index) => (
                <article className="experience-card" key={experience.title}>
                  <div className={`experience-icon${index % 2 ? " icon-blue" : ""}`}>
                    {experience.icon}
                  </div>
                  <div className="experience-details">
                    <div className="timeline-topline">
                      <span className="timeline-date">{experience.date}</span>
                      <span className="status-tag">EXPERIENCE</span>
                    </div>
                    <h3>{experience.title}</h3>
                    <p className="timeline-subtitle">{experience.company}</p>
                    <ul className="experience-bullets">
                      {experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                    <div className="tag-list">
                      {experience.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap section-block" id="skill">
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow"><span>04</span> WHAT I DO</p>
              <h2>Skills & tools<span className="accent-dot">.</span></h2>
            </div>
            <p className="heading-note">Technologies I use to<br />turn ideas into reality.</p>
          </div>
          <div className="skills-layout">
            <div className="skills-list">
              {skillGroups.map((group) => (
                <div className="skill-group" key={group.category}>
                  <span className="skill-name">{group.category}</span>
                  <div className="tag-list">
                    {group.items.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="tools-panel">
              <p className="tools-title">SOFT SKILLS</p>
              <div className="soft-skills-list">
                <span>Problem solving</span>
                <span>Analytical skills</span>
                <span>Teamwork</span>
                <span>Client-centric approach</span>
              </div>
              <p className="tools-footnote">Combining engineering experience with software development.</p>
            </div>
          </div>
        </section>

        <section className="projects section-block" id="projects">
          <div className="section-wrap">
            <div className="section-heading section-heading-row">
              <div>
                <p className="eyebrow"><span>05</span> BEST PORTFOLIO</p>
                <h2>Featured projects<span className="accent-dot">.</span></h2>
              </div>
              <a className="text-link" href="#contact">Have a similar idea? <ArrowIcon /></a>
            </div>
            <div className="projects-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.number}>
                  <div className={`project-art art-${project.color}`}>
                    <span className="project-number">
                      {project.number} / {String(projects.length).padStart(2, "0")}
                    </span>
                    <div className="art-window">
                      <div className="window-top"><i /><i /><i /><span>{project.title.toLowerCase().replaceAll(" ", "-")}.app</span></div>
                      <div className="window-content">
                        <div className="window-sidebar"><b /><i /><i /><i /></div>
                        <div className="window-main">
                          <span className="window-line line-short" />
                          <span className="window-line line-long" />
                          <div className="window-charts"><span /><span /><span /></div>
                          <div className="window-bottom"><i /><i /><i /></div>
                        </div>
                      </div>
                    </div>
                    <span className="art-spark">✳</span>
                  </div>
                  <div className="project-content">
                    <p className="project-category">{project.category}</p>
                    <div className="project-title-row">
                      <h3>
                        <a href={project.link} target="_blank" rel="noreferrer">{project.title}</a>
                      </h3>
                      <a className="project-arrow" href={project.link} target="_blank" rel="noreferrer" aria-label={`View ${project.title}`}>
                        <ArrowIcon diagonal />
                      </a>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="tag-list">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap section-block" id="certificate">
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow"><span>06</span> ACHIEVEMENTS</p>
              <h2>Certificates<span className="accent-dot">.</span></h2>
            </div>
            <p className="heading-note">Learning is a journey<br />that never truly ends.</p>
          </div>
          <div className="certificate-grid">
            {certificates.map((certificate, index) => (
              <article className="certificate-card" key={certificate.title}>
                <div className={`certificate-icon${index % 2 ? " cert-blue" : ""}`}>
                  {index % 2 ? "✦" : "✳"}
                </div>
                <div className="certificate-copy">
                  <span className="certificate-year">{certificate.date} · CERTIFICATE</span>
                  <h3>{certificate.title}</h3>
                  <p>Issued by {certificate.issuer}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section-block" id="contact">
          <div className="section-wrap contact-wrap">
            <div className="contact-topline">
              <p className="eyebrow"><span>07</span> GOT ANY INTERESTING IDEAS?</p>
              <span className="contact-decoration">✳</span>
            </div>
            <h2>Let's create something impactful<br /><span>together.</span></h2>
            <p className="contact-description">
              Have a project, idea, or just want to say hello? I'd love to hear from you!
              Share your story. Let's start the conversation.
            </p>
            <a className="button button-contact" href="mailto:fajripangestu62@gmail.com">
              Contact Me <ArrowIcon diagonal />
            </a>
            <div className="contact-bottom">
              <a className="contact-email" href="mailto:fajripangestu62@gmail.com">fajripangestu62@gmail.com</a>
              <span>Cirebon, West Java, Indonesia</span>
              <span className="contact-socials">
                <a href="https://wa.me/6285324055024" target="_blank" rel="noreferrer">WhatsApp · +62 853-2405-5024 ↗</a>
                <a href="https://www.linkedin.com/in/fajripangestu/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href="https://manutics.netlify.app/" target="_blank" rel="noreferrer">Portfolio ↗</a>
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home"><span className="brand-mark">f</span></a>
        <span>© Fajri Pangestu</span>
      </footer>
    </div>
  );
}
