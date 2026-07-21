<div align="center">

# ✨ Digvijay Tripathy — Portfolio ✨

### A modern, immersive personal portfolio built with React, Three.js & Framer Motion

<p>
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Three.js-0.185-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Framer%20Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

[Live Demo](https://digvijay-tripathy.netlify.app/)

</div>

---

## 🌌 Overview

This repository hosts the source code for my personal **developer portfolio** — a fast, animated, and interactive single-page site that showcases who I am, what I build, and how to reach me. It blends **3D visuals**, **smooth motion design**, and a **clean component-driven architecture** to deliver a memorable first impression.

Built entirely on the **Vite + React 19** stack for instant HMR and blazing-fast production builds, styled with **Tailwind CSS v4**, and brought to life using **React Three Fiber**, **GSAP**, and **Framer Motion**.

---

## 🚀 Features

| | |
|---|---|
| 🎨 **Modern UI/UX** | Clean, minimal, and responsive design across all devices |
| 🌐 **3D Interactive Elements** | Powered by `@react-three/fiber`, `@react-three/drei`, and `@react-three/postprocessing` |
| 🎬 **Smooth Animations** | Scroll-based and micro-interactions via `Framer Motion` & `GSAP` |
| ⌨️ **Typing Effect** | Dynamic role/typing animation in the Hero section (`react-type-animation`) |
| 🃏 **3D Tilt Cards** | Interactive tilt-on-hover effect using `vanilla-tilt` |
| ⚡ **Lightning Fast** | Powered by Vite for near-instant dev server startup and optimized builds |
| 📱 **Fully Responsive** | Mobile-first layout that adapts seamlessly to any screen size |
| 🧩 **Component-Based** | Cleanly separated, reusable components for easy maintenance |
| 🔍 **Linted & Consistent** | ESLint configured for code quality and consistency |

---

## 🛠️ Tech Stack

**Core**
- [React 19](https://react.dev/) — UI library
- [Vite 8](https://vitejs.dev/) — Build tool & dev server
- [Tailwind CSS 4](https://tailwindcss.com/) — Utility-first styling

**3D & Animation**
- [Three.js](https://threejs.org/) — 3D rendering engine
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — React renderer for Three.js
- [React Three Drei](https://github.com/pmndrs/drei) — Useful helpers for R3F
- [React Three Postprocessing](https://github.com/pmndrs/react-postprocessing) — Visual effects/shaders
- [GSAP](https://gsap.com/) — High-performance animation library
- [Framer Motion](https://www.framer.com/motion/) — Declarative animations & transitions
- [Vanilla Tilt](https://micku7zu.github.io/vanilla-tilt.js/) — 3D tilt hover effect

**UI & Icons**
- [Lucide React](https://lucide.dev/) — Icon set
- [React Icons](https://react-icons.github.io/react-icons/) — Icon library
- [React Type Animation](https://www.npmjs.com/package/react-type-animation) — Typing text effect

**Tooling**
- ESLint (with React Hooks & React Refresh plugins)
- Vite Tailwind plugin

---

## 📂 Project Structure

```
digvijay-tripathy-latest-portfolio/
├── README.md
├── LICENSE
└── portfolio/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx              # Root component
        ├── App.css               # Global app styles
        ├── index.css             # Tailwind base styles
        ├── main.jsx              # App entry point
        └── components/
            ├── Navbar/           # Site navigation
            │   └── Navbar.jsx
            ├── Hero/             # Landing/intro section
            │   ├── Hero.jsx
            │   └── index.js
            ├── About/            # About-me section
            │   └── About.jsx
            ├── Skills/           # Tech stack / skills showcase
            │   └── Skills.jsx
            ├── Project/          # Projects showcase
            │   └── Projects.jsx
            └── Footer/           # Footer & contact links
                └── Footer.jsx
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `v18+`
- npm / yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/digvijay-tripathy-latest-portfolio.git

# 2. Move into the project directory
cd digvijay-tripathy-latest-portfolio/portfolio

# 3. Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` 🎉

### Other Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Create an optimized production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks across the project |
| `npm run host` | Run dev server exposed on your local network |

---

## 🧭 Roadmap

- [ ] Add dark/light theme toggle
- [ ] Add project filtering by tech stack
- [ ] Add blog/writing section
- [ ] Integrate contact form with email service
- [ ] Add SEO metadata & Open Graph tags
- [ ] Deploy with CI/CD pipeline

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 📬 Contact

**Digvijay Tripathy**

- Portfolio: [portfolio](https://digvijay-tripathy.netlify.app/)
- GitHub: [@digvijay-tripathy](https://github.com/DIGVIJAY-TRIPATHY)
- LinkedIn: [Digvijay Tripathy](https://www.linkedin.com/in/digvijay-tripathy-194aa8314/)


---

<div align="center">

### ⭐ If you like this project, consider giving it a star!

*Built with ❤️, React, and a healthy amount of chai.*

</div>