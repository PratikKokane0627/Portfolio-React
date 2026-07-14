import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const navLinks = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["education", "Education"],
  ["certifications", "Certifications"],
  ["contact", "Contact"],
];

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const skills = [
  { name: "HTML5", icon: "fa-brands fa-html5", color: "#ff6b00" },
  { name: "CSS3", icon: "fa-brands fa-css3-alt", color: "#2f80ff" },
  { name: "JavaScript", icon: "fa-brands fa-js", color: "#f7c600" },
  { name: "React", icon: "fa-brands fa-react", color: "#18d7ff" },
  { name: "Node.js", icon: "fa-brands fa-node-js", color: "#00d66f" },
  { name: "Express.js", label: "ex", color: "#f8fafc" },
  { name: "MongoDB", icon: "fa-solid fa-leaf", color: "#00db6f" },
  { name: "MySQL", label: "MySQL", color: "#00a8ff" },
  { name: "Tailwind", icon: "fa-solid fa-wind", color: "#13c8e8" },
  { name: "Bootstrap", icon: "fa-brands fa-bootstrap", color: "#b546ff" },
  { name: "Git", icon: "fa-brands fa-git-alt", color: "#ff5a1f" },
  { name: "GitHub", icon: "fa-brands fa-github", color: "#f8fafc" },
  { name: "Postman", icon: "fa-solid fa-paper-plane", color: "#ff6b00" },
  { name: "Render", icon: "fa-solid fa-cloud", color: "#7c83ff" },
];

const projects = [
  {
    title: "HireNest",
    image: assetPath("assets/HireNest.jpg"),
    description:
      "Full-stack Job Portal connecting students, job seekers and recruiters with authentication, dashboards and job management.",
    tags: ["MongoDB", "Express", "React", "Node", "JWT"],
    github: "https://github.com/PratikKokane0627/hirenest-job-portal.git",
    live: "https://hirenestjobs.vercel.app/",
  },
  {
    title: "Student Management System",
    image: assetPath("assets/project6.png"),
    description:
      "Full-stack CRUD application with secure login, session authentication, MVC architecture and MongoDB integration.",
    tags: ["Node.js", "Express", "MongoDB", "EJS"],
    github: "https://github.com/PratikKokane0627/student-management-system-crud",
    live: "https://student-management-system-crud-fzl2.onrender.com",
  },
  {
    title: "AI Text Generator",
    image: assetPath("assets/project2.png"),
    description: "AI-powered application that generates text using GPT-2, PyTorch and Hugging Face.",
    tags: ["Python", "PyTorch", "GPT-2"],
  },
  {
    title: "Metro Fitness Center",
    image: assetPath("assets/project1.jpg"),
    description: "Fitness management web application built using ASP.NET and C#.",
    tags: ["C#", "ASP.NET"],
  },
  {
    title: "Ice World",
    image: assetPath("assets/project4.png"),
    description: "Responsive website for an Ice Cream Shop.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Advanto",
    image: assetPath("assets/project5.png"),
    description: "Modern travel agency website with responsive UI.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
];

const education = [
  {
    date: "July 2025 - Present",
    title: "Master of Science (Information Technology)",
    place: "KBP College, Islampur",
    university: "Shivaji University, Kolhapur",
    badge: "Pursuing",
    badgeClass: "bg-green-600",
  },
  {
    date: "June 2022 - April 2025",
    title: "Bachelor of Science (Information Technology)",
    place: "Willingdon College, Sangli",
    university: "Shivaji University, Kolhapur",
    badge: "CGPA : 9.03",
    badgeClass: "bg-indigo-600",
  },
  {
    date: "2021 - 2022",
    title: "Higher Secondary Certificate",
    place: "Maharashtra State Board",
    badge: "50%",
    badgeClass: "bg-indigo-600",
  },
  {
    date: "2019 - 2020",
    title: "Secondary School Certificate",
    place: "Maharashtra State Board",
    badge: "70.20%",
    badgeClass: "bg-indigo-600",
  },
];

const certifications = [
  ["React Frontend Development", "Grade A (84%)"],
  ["Java Spring Boot REST API", "Grade A (80%)"],
  ["Responsive Web Design", "freeCodeCamp"],
  ["Python Using AI", "AI For Techies"],
  ["AI Tools & ChatGPT", "be10x"],
  ["SQL Using AI", "AI For Techies"],
];

const contactEmail = "pratikkokane0627@gmail.com";

const buildMailtoLink = (data) => {
  const name = data.get("name")?.trim();
  const email = data.get("email")?.trim();
  const subject = data.get("subject")?.trim();
  const message = data.get("message")?.trim();
  const body = [
    message,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
  ].join("\n");

  return `mailto:${contactEmail}?subject=${encodeURIComponent(
    `Portfolio Contact: ${subject}`
  )}&body=${encodeURIComponent(body)}`;
};

function useTypedText(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const atFullWord = text === word;
    const atEmptyWord = text === "";
    const delay = atFullWord && !deleting ? 1300 : deleting ? 45 : 80;

    const timer = window.setTimeout(() => {
      if (!deleting && atFullWord) {
        setDeleting(true);
        return;
      }

      if (deleting && atEmptyWord) {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
        return;
      }

      setText((current) =>
        deleting ? word.slice(0, current.length - 1) : word.slice(0, current.length + 1)
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, text, wordIndex, words]);

  return text;
}

function useScrollState() {
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 80);
      setShowTop(scrollY > 400);
      setProgress(total > 0 ? (scrollY / total) * 100 : 0);

      const current = navLinks
        .map(([id]) => document.getElementById(id))
        .filter(Boolean)
        .findLast((section) => scrollY >= section.offsetTop - 140);

      if (current) setActive(current.id);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return { scrolled, showTop, progress, active };
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("portfolio-theme") || "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}

function Header({ active, scrolled, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full border-b border-gray-800 backdrop-blur-lg transition ${
          scrolled ? "bg-[#050505] shadow-2xl shadow-black/40" : "bg-black/50"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="#home" className="text-2xl font-bold tracking-wide md:text-3xl">
            <span>Pratik</span>
            <span className="text-indigo-500">Kokane</span>
          </a>

          <nav className="hidden gap-10 text-gray-300 lg:flex">
            {navLinks.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link transition hover:text-indigo-400 ${
                  active === id ? "text-indigo-500" : ""
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`} />
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>

            <button
              className="text-2xl lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label="Toggle navigation menu"
            >
              <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`} />
            </button>
          </div>
        </div>
      </header>

      <aside className={`mobile-menu ${open ? "active" : ""}`}>
        {navLinks.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </aside>
    </>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="section-title mb-16 text-center text-5xl font-bold" data-reveal>
      {children}
    </h2>
  );
}

function Hero() {
  const typed = useTypedText(
    useMemo(
      () => ["MERN Stack Developer", "Frontend Developer", "Backend Developer", "web Developer"],
      []
    )
  );

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute -left-40 -top-52 h-[600px] w-[600px] rounded-full bg-indigo-600 opacity-20 blur-[180px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-700 opacity-20 blur-[180px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 pt-20 lg:grid-cols-2 lg:px-8">
        <div className="hero-copy reveal" data-reveal>
          <p className="hero-kicker mb-3 uppercase tracking-[5px] text-indigo-400" data-reveal data-delay="80">Welcome to my portfolio</p>
          <h1 className="hero-title text-6xl font-black leading-tight lg:text-7xl" data-reveal data-delay="170">
            Hi, I'm <span className="text-indigo-500">Pratik Kokane</span>
          </h1>
          <h2 className="hero-role mt-6 text-3xl font-semibold text-indigo-300" data-reveal data-delay="260">
            {typed}
            <span className="typed-cursor">|</span>
          </h2>
          <p className="hero-summary mt-8 max-w-2xl text-lg leading-8 text-gray-400" data-reveal data-delay="350">
            I build modern, scalable full-stack web applications using the MERN stack,
            delivering seamless user experiences and efficient backend solutions. Focused on
            creating responsive interfaces and robust APIs that solve real-world problems with
            clean, reliable code.
          </p>

          <div className="hero-actions mt-10 flex flex-wrap gap-5" data-reveal data-delay="440">
            <a className="btn-primary" href="#projects">
              View Projects
            </a>
            <a className="btn-outline" href={assetPath("assets/Resume.pdf")} target="_blank" rel="noreferrer">
              Download Resume
            </a>
          </div>

          <div data-reveal data-delay="520">
            <SocialLinks className="mt-12 text-3xl" />
          </div>
        </div>

        <div className="hero-visual flex justify-center reveal" data-reveal data-delay="300">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-indigo-600 opacity-30 blur-3xl" />
            <img
              src={assetPath("assets/profile2.jpg")}
              alt="Pratik Kokane"
              className="hero-photo relative w-[420px] rounded-full border-4 border-indigo-500 shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLinks({ className = "" }) {
  return (
    <div className={`flex gap-6 ${className}`}>
      <a href="https://github.com/PratikKokane0627" target="_blank" rel="noreferrer" aria-label="GitHub">
        <i className="fab fa-github" />
      </a>
      <a href="https://linkedin.com/in/kokane-pratik" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <i className="fab fa-linkedin" />
      </a>
      <a href="mailto:pratikkokane0627@gmail.com" aria-label="Email">
        <i className="fas fa-envelope" />
      </a>
      <a href="#" aria-label="Instagram">
        <i className="fab fa-instagram" />
      </a>
    </div>
  );
}

function About() {
  const stats = [
    ["fa-graduation-cap", "9.03", "CGPA"],
    ["fa-code", "6+", "Projects"],
    ["fa-award", "6+", "Certifications"],
  ];

  return (
    <section id="about" className="bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle>About Me</SectionTitle>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="reveal" data-reveal>
            <img
              src={assetPath("assets/about.jpeg")}
              className="about-photo rounded-3xl border border-gray-700 shadow-2xl"
              alt="Pratik Kokane in formal attire"
            />
          </div>
          <div className="reveal" data-reveal>
            <h3 className="mb-6 text-3xl font-bold">MERN Stack Developer</h3>
            <p className="mb-6 leading-8 text-gray-400">
              I'm a React & MERN Stack Developer passionate about building responsive,
              scalable and user-focused web applications.
            </p>
            <p className="mb-6 leading-8 text-gray-400">
              I specialize in React.js, JavaScript (ES6+), HTML5 and CSS3 to build
              interactive interfaces with clean, maintainable code and modern UI principles.
            </p>
            <p className="leading-8 text-gray-400">
              Beyond frontend development, I work with MongoDB, Express.js and Node.js to
              build secure backend applications and REST APIs.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {stats.map(([icon, value, label]) => (
            <article className="portfolio-card p-8 text-center" data-reveal key={label}>
              <i className={`fa-solid ${icon} mb-4 text-4xl text-indigo-500`} />
              <h3 className="text-5xl font-bold">{value}</h3>
              <p className="mt-3 text-gray-400">{label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="bg-black">
      <div className="skills-shell">
        <div className="skills-heading" data-reveal>
          <h2>
            My <span>Skills</span>
          </h2>
          <p>Technologies and tools I use to build modern web applications.</p>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <article
              className="skill-icon-card"
              data-reveal
              data-delay={String((index % 7) * 70)}
              data-skill={skill.name}
              key={skill.name}
            >
              <div className="skill-icon" style={{ color: skill.color }}>
                {skill.label ? <span>{skill.label}</span> : <i className={skill.icon} />}
              </div>
              <h3>{skill.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle>Featured Projects</SectionTitle>
        <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article className="project-card" data-reveal key={project.title}>
              <div className="project-image">
                <img src={project.image} alt={`${project.title} screenshot`} />
              </div>
              <div className="p-7">
                <h3 className="mb-3 text-2xl font-bold">{project.title}</h3>
                <p className="mb-5 leading-7 text-gray-400">{project.description}</p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span className="rounded-full bg-indigo-600 px-3 py-1 text-sm" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                {(project.github || project.live) && (
                  <div className="flex gap-3">
                    {project.github && (
                      <a className="project-action" href={project.github} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-github" />
                        GitHub
                      </a>
                    )}
                    {project.live && (
                      <a className="project-action" href={project.live} target="_blank" rel="noreferrer">
                        <i className="fa-solid fa-arrow-up-right-from-square" />
                        Live
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle>Education</SectionTitle>
        <div className="relative ml-6 border-l-2 border-indigo-600">
          {education.map((item) => (
            <article className="timeline-item reveal" data-reveal key={`${item.date}-${item.title}`}>
              <div className="absolute -left-[54px] top-2 h-6 w-6 rounded-full border-4 border-black bg-indigo-600" />
              <div className="portfolio-card p-8">
                <span className="font-semibold text-indigo-400">{item.date}</span>
                <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>
                <p className="mt-2 text-gray-400">{item.place}</p>
                {item.university && <p className="mt-2 text-gray-500">{item.university}</p>}
                <span className={`mt-4 inline-block rounded-full px-5 py-2 ${item.badgeClass}`}>
                  {item.badge}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle>Certifications</SectionTitle>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map(([title, detail]) => (
            <article className="portfolio-card cert-card p-8" data-reveal key={title}>
              <i className="fa-solid fa-award mb-5 text-5xl text-indigo-500" />
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="mt-4 text-gray-400">{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateContactForm = (data) => {
    const nextErrors = {};
    const email = data.get("email")?.trim() || "";
    const messageText = data.get("message")?.trim() || "";

    ["name", "email", "subject", "message"].forEach((field) => {
      if (!data.get(field)?.trim()) nextErrors[field] = "Required";
    });

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email";
    }

    if (messageText && messageText.length < 12) {
      nextErrors.message = "Write at least 12 characters";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setStatus("idle");
    setErrors({});
    const data = new FormData(event.currentTarget);
    const nextErrors = validateContactForm(data);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      return;
    }

    const fallbackEmailLink = buildMailtoLink(data);

    data.append("_subject", `Portfolio Contact: ${data.get("subject")}`);
    data.append("_template", "table");
    data.append("_captcha", "false");

    setSubmitting(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Email service failed");
      }

      setStatus("success");
      setMessage("Thank you! Your message has been sent.");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("Email service is not available right now. Opening your email app with this message ready to send.");
      window.location.href = fallbackEmailLink;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle>Contact Me</SectionTitle>
        <div className="contact-grid">
          <div className="contact-panel reveal" data-reveal>
            <h3 className="mb-6 text-3xl font-bold">Let's Build Something Amazing</h3>
            <p className="mb-10 leading-8 text-gray-400">
              I'm always interested in new opportunities, freelance work and exciting projects.
              Feel free to contact me anytime.
            </p>
            <div className="contact-list">
              <ContactItem icon="fa-envelope" label="Email" value={contactEmail} href={`mailto:${contactEmail}`} />
              <ContactItem icon="fa-phone" label="Phone" value="+91 9370396371" href="tel:+919370396371" />
              <ContactItem icon="fa-location-dot" label="Location" value="Sangli, Maharashtra, India" />
            </div>
            <SocialLinks className="mt-10 text-3xl" />
          </div>

          <form className="portfolio-card contact-form reveal" data-reveal onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <FormField label="Name" error={errors.name}>
                <input
                  aria-invalid={Boolean(errors.name)}
                  autoComplete="name"
                  name="name"
                  placeholder="Your name"
                  required
                  type="text"
                />
              </FormField>
              <FormField label="Email" error={errors.email}>
                <input
                  aria-invalid={Boolean(errors.email)}
                  autoComplete="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </FormField>
            </div>
            <FormField label="Subject" error={errors.subject}>
              <input
                aria-invalid={Boolean(errors.subject)}
                name="subject"
                placeholder="Project, opportunity, or question"
                required
                type="text"
              />
            </FormField>
            <FormField label="Message" error={errors.message}>
              <textarea
                aria-invalid={Boolean(errors.message)}
                name="message"
                placeholder="Tell me what you want to build"
                required
                rows="6"
              />
            </FormField>
            {message && <p className={`contact-status ${status}`}>{message}</p>}
            <button className="contact-submit" type="submit" disabled={submitting}>
              {submitting && <span className="submit-spinner" aria-hidden="true" />}
              <span>{submitting ? "Sending..." : "Send Message"}</span>
            </button>
            <p className="contact-note">Messages are delivered to {contactEmail}.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, error, children }) {
  return (
    <label className={`form-field ${error ? "has-error" : ""}`}>
      <span>
        {label}
        {error && <small>{error}</small>}
      </span>
      {children}
    </label>
  );
}

function ContactItem({ icon, label, value, href }) {
  const content = href ? (
    <a href={href} className="contact-value hover:text-indigo-400">
      {value}
    </a>
  ) : (
    <h4 className="contact-value">{value}</h4>
  );

  return (
    <div className="contact-item">
      <div className="contact-item-icon">
        <i className={`fa-solid ${icon} text-xl`} />
      </div>
      <div>
        <p className="text-gray-400">{label}</p>
        {content}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <a href="#home" className="text-3xl font-extrabold tracking-wide">
              <span>Pratik</span>
              <span className="text-indigo-500">.</span>
            </a>
            <p className="mt-5 leading-8 text-gray-400">
              MERN Stack Developer passionate about building modern, scalable, responsive,
              and user-friendly web applications with clean code and intuitive user experiences.
            </p>
            <SocialLinks className="mt-8 text-2xl" />
          </div>

          <div>
            <h3 className="mb-6 text-2xl font-semibold">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-y-4 text-gray-400">
              {navLinks.map(([id, label]) => (
                <li key={id}>
                  <a className="transition hover:text-indigo-500" href={`#${id}`}>
                    {label === "Certifications" ? "Certificates" : label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-2xl font-semibold">Get In Touch</h3>
            <div className="space-y-5 text-gray-400">
              <p className="flex items-center gap-4">
                <i className="fa-solid fa-envelope text-xl text-indigo-500" />
                pratikkokane0627@gmail.com
              </p>
              <p className="flex items-center gap-4">
                <i className="fa-solid fa-location-dot text-xl text-indigo-500" />
                Sangli, Maharashtra, India
              </p>
              <p className="flex items-center gap-4">
                <i className="fa-solid fa-code text-xl text-indigo-500" />
                Open to MERN Stack Opportunities
              </p>
            </div>
          </div>
        </div>

        <hr className="my-10 border-gray-800" />
        <div className="text-center text-sm text-gray-500">
          © 2026 <span className="font-semibold text-white">Pratik Kokane</span>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

function RevealObserver() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = entry.target.dataset.delay || "0";
          entry.target.style.setProperty("--reveal-delay", `${delay}ms`);
          entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}

function MouseGlow() {
  const [position, setPosition] = useState({ x: -300, y: -300 });

  useEffect(() => {
    const move = (event) => setPosition({ x: event.clientX - 110, y: event.clientY - 110 });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div className="mouse-glow" style={{ transform: `translate(${position.x}px, ${position.y}px)` }} />;
}

function App() {
  const { scrolled, showTop, progress, active } = useScrollState();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <RevealObserver />
      <MouseGlow />
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <Header active={active} scrolled={scrolled} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <button
        className={`top-btn ${showTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <i className="fa-solid fa-arrow-up" />
      </button>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
