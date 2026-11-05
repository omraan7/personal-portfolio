/**
 * Single source of truth for the 3D universe.
 * Everything here is lifted from the existing portfolio (Home / About / Portfolio / Layout)
 * and from the CV bundled in /assets. Nothing is invented.
 */
import hero from "../assets/hero_photo.jpeg";
import aboutPhoto from "../assets/about_photo.jpeg";
import cv from "../assets/Mohamed Omran CV.pdf";
import Clarity from "../assets/optimized/Clarity.webp";
import Nutriplan from "../assets/optimized/Nutriplan.webp";
import games from "../assets/optimized/games.webp";
import socialapp from "../assets/optimized/sapp.webp";
import jj from "../assets/optimized/jj.webp";
import ee from "../assets/optimized/ee.webp";
import portifolio from "../assets/optimized/portifolio.webp";
import Space from "../assets/optimized/space.webp";
import ux from "../assets/optimized/ux.webp";

export const PROFILE = {
  name: "Mohamed Omran",
  title: "Front-End Developer",
  intro: "Crafting responsive, performant web experiences where modern technology meets thoughtful design.",
  objective:
    "Front-End Developer seeking to join a professional team where I can contribute to building modern, high-quality web applications using React.js and Next.js, while continuously improving my skills and delivering impactful, user-focused solutions.",
  story:
    "From my first line of HTML to building full-scale React applications with server-side rendering in Next.js — every step has been driven by genuine curiosity and the thrill of bringing ideas to life on screen. I obsess over clean architecture, responsive design, and the kind of subtle details users feel but never notice.",
  traits: [
    { title: "Clean Code", desc: "Maintainable, readable, scalable architecture that stands the test of time." },
    { title: "Modern Stack", desc: "React, Next.js, TypeScript — always learning what's next in the ecosystem." },
    { title: "Detail Obsessed", desc: "Pixel-perfect UI, smooth animations, and polished user experiences." },
  ],
  stats: [
    { value: "9+", label: "Projects" },
    { value: "2+", label: "Years" },
  ],
  languages: "English (Good) · Arabic (Native)",
  heroPhoto: hero,
  aboutPhoto,
  cv,
};

export const SOCIALS = [
  { id: "github", label: "GitHub", icon: "fa-github", href: "https://github.com/omraan7" },
  { id: "linkedin", label: "LinkedIn", icon: "fa-linkedin-in", href: "https://www.linkedin.com/in/mohamed-omran-02800338a" },
  { id: "more", label: "Social Media", icon: "fa-link", href: "https://omraan7.github.io/Omran/", solid: true },
];

export const EMAIL = "Mohammedommran2000@gmail.com";

/** Same five groups as the existing Skills section (+ items that appear in the CV). */
export const SKILLS = [
  { id: "markup", label: "Markup", items: ["HTML", "CSS", "Sass"] },
  { id: "languages", label: "Languages", items: ["PHP", "JavaScript", "TypeScript"] },
  { id: "frameworks", label: "Frameworks", items: ["React.js", "Next.js", "Tailwind", "Bootstrap", "Node.js", "Express.js"] },
  { id: "tools", label: "Tools", items: ["Git", "GitHub", "Figma", "VS Code"] },
  { id: "concepts", label: "Concepts", items: ["REST APIs", "SSR", "Responsive", "CRUD", "Authentication", "Authorization", "State management"] },
];

/**
 * Projects: name / tag / image / links are from the existing Portfolio component.
 * `summary` + `stack` only exist where the CV states them; otherwise they are left out.
 */
export const PROJECTS = [
  {
    id: "e-commerce", name: "E-Commerce", tag: "React · Next.js", image: ee,
    live: "https://e-commerce-pied-psi-84.vercel.app", git: "https://github.com/omraan7/E-commerce",
    summary: "A full-featured e-commerce app built with Next.js (App Router): authentication and session management with NextAuth, cart, wishlist and checkout, dynamic routes for products, categories and brands, and external REST APIs for products and orders.",
    stack: ["Next.js", "React", "TypeScript", "Redux Toolkit", "NextAuth"],
  },
  {
    id: "movie-app", name: "Movie App", tag: "React · API", image: jj,
    live: "https://movie-app-lovat-two.vercel.app/", git: "https://github.com/omraan7/movie-app",
    summary: "A movie and TV explorer driven by an external API, with Home, Details, TV and Actors pages, reusable cards, carousel and layout components, and state handled with React Hooks.",
    stack: ["React", "REST API", "Hooks"],
  },
  {
    id: "social-app", name: "Social App", tag: "React · CRUD", image: socialapp,
    live: "https://social-app-nine-rho.vercel.app/", git: "https://github.com/omraan7/social-app",
    summary: "An interactive social platform: CRUD for posts and comments, login / register / change password, protected routes with custom guards, Context API state, modals, skeleton loading and follow suggestions.",
    stack: ["React", "Context API", "CRUD", "Authentication"],
  },
  {
    id: "nutriplan", name: "Nutriplan", tag: "React · Health", image: Nutriplan,
    live: "https://omraan7.github.io/Nutriplan/#/home", git: "https://github.com/omraan7/Nutriplan",
    summary: "Helps users track daily nutrition: 25 meals filterable by category or region, meal details with ingredients and nutrition values, a food log for protein, carbs, fats and calories, and a product scanner. Logs persist in LocalStorage.",
    stack: ["JavaScript", "HTML5", "CSS3", "LocalStorage", "REST APIs", "OOP"],
  },
  { id: "games-live", name: "Games Live", tag: "Vanilla JS", image: games, live: "https://omraan7.github.io/games-web/", git: "https://github.com/omraan7/games-web" },
  { id: "today-in-space", name: "Today in Space", tag: "API · NASA", image: Space, live: "https://omraan7.github.io/Api-Project/#", git: "https://github.com/omraan7/Api-Project/tree/main" },
  { id: "clarity", name: "Clarity", tag: "HTML · CSS", image: Clarity, live: "https://omraan7.github.io/-Clarity/", git: "https://github.com/omraan7/-Clarity" },
  { id: "ux-review", name: "UX Review", tag: "UI/UX · Design", image: ux, live: "https://omraan7.github.io/UX-Review/", git: "https://github.com/omraan7/UX-Review" },
  { id: "portfolio-dom", name: "Portfolio", tag: "Vanilla JS", image: portifolio, live: "https://omraan7.github.io/Dom-project/", git: "https://github.com/omraan7/Dom-project" },
];

/** From the CV. Training programs carry no dates in the CV, so none are shown. */
export const JOURNEY = [
  {
    id: "edu", kind: "Education", title: "Management Information Systems (MIS)", place: "Obour Institute", when: "2019 – 2023",
    detail: "Final project grade: Excellent · General grade: Good.",
  },
  {
    id: "depi", kind: "Training", title: "Front-End Development Track", place: "Digital Egypt Pioneers Initiative (DEPI)",
    detail: "HTML5, CSS3, JavaScript (ES6+), React.js fundamentals and advanced concepts, responsive design, REST APIs, Git & GitHub. Built multiple hands-on projects in diverse teams.",
  },
  {
    id: "route", kind: "Training", title: "Front-End Development", place: "Route Academy",
    detail: "Front-End track of the Full Stack Web Development course: HTML, CSS, JavaScript, React.js and Next.js, clean-code practices and practical projects.",
  },
];

/** Ordered stations of the universe. `planet` drives the 3D look (see universe/Scene). */
export const SECTIONS = [
  { id: "home", label: "Home", world: "Home Planet" },
  { id: "about", label: "About", world: "About Planet" },
  { id: "skills", label: "Skills", world: "Skills Galaxy" },
  { id: "projects", label: "Projects", world: "Projects Constellation" },
  { id: "journey", label: "Journey", world: "Experience Station" },
  { id: "contact", label: "Contact", world: "Contact Portal" },
];
