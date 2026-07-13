import {
  Mail,
  ArrowUpRight,
  ArrowUp,
  Download,
} from "lucide-react";

import resume from "../../assets/DIGVIJAY-CV.pdf";

// Custom inline SVG for Github (replacing lucide version)
const GithubIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Custom inline SVG for Linkedin (replacing lucide version)
const LinkedinIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black" id="contact">
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-pink-500/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="mb-20 overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-pink-400">
                Available For Opportunities
              </p>

              <h2 className="max-w-2xl text-4xl font-black leading-tight text-white md:text-6xl">
                Let's Build Something
                <span className="bg-linear-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  {" "}
                  Amazing
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-zinc-400">
                MERN Stack Developer focused on creating scalable,
                high-performance digital experiences.
              </p>
            </div>

            <a
              href="mailto:tripathydigvijay7377@gmail.com"
              className="group flex items-center gap-3 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105"
            >
              Let's Talk
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-pink-500 to-purple-500 font-bold text-white">
                DT
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  Digvijay Tripathy
                </h3>

                <p className="text-zinc-400">
                  Full Stack MERN Developer
                </p>
              </div>
            </div>

            <p className="max-w-md text-zinc-400">
              Building premium web experiences with React, Node.js,
              MongoDB and modern technologies.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-zinc-400">
                Available for internships & opportunities
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-semibold text-white">
              Navigation
            </h4>

            <div className="space-y-3">
              <a href="#home" className="block text-zinc-400 hover:text-pink-400">
                Home
              </a>
              <a href="#about" className="block text-zinc-400 hover:text-pink-400">
                About
              </a>
              <a href="#skills" className="block text-zinc-400 hover:text-pink-400">
                Skills
              </a>
              <a href="#projects" className="block text-zinc-400 hover:text-pink-400">
                Projects
              </a>
              <a href="#contact" className="block text-zinc-400 hover:text-pink-400">
                Contact
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-semibold text-white">
              Resources
            </h4>

            <div className="space-y-3">
              <a
                href={resume}
                download
                className="flex items-center gap-2 text-zinc-400 hover:text-pink-400"
              >
                <Download size={16} />
                Resume
              </a>

              <a
                href="mailto:tripathydigvijay7377@gmail.com"
                className="block text-zinc-400 hover:text-pink-400"
              >
                Email Me
              </a>

              <span className="block text-zinc-400">
                Bhubaneswar, India
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-semibold text-white">
              Connect
            </h4>

            <div className="flex gap-4">
              <a
                href="https://github.com/DIGVIJAY-TRIPATHY"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-zinc-300 transition-all hover:border-pink-500 hover:text-pink-400"
              >
                <GithubIcon />
              </a>

              <a
                href="https://www.linkedin.com/in/digvijay-tripathy-194aa8314/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-zinc-300 transition-all hover:border-pink-500 hover:text-pink-400"
              >
                <LinkedinIcon />
              </a>

              <a
                href="mailto:tripathydigvijay7377@gmail.com"
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-zinc-300 transition-all hover:border-pink-500 hover:text-pink-400"
              >
                <Mail />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "React",
                "Node",
                "MongoDB",
                "Express",
                "Tailwind",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-zinc-500">
            © {year} Digvijay Tripathy. Crafted with React & Tailwind CSS.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-pink-500 hover:bg-pink-500"
          >
            <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}