import { useEffect, useState } from "react";
import { Mail, ArrowUpRight, ArrowUp, Download, Check } from "lucide-react";

import resume from "../../assets/DIGVIJAY-CV.pdf";

// Custom inline SVG for Github (replacing lucide version)
const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
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
    width="22"
    height="22"
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

const MARQUEE_ITEMS = [
  "AVAILABLE FOR INTERNSHIPS",
  "REACT",
  "NODE.JS",
  "MONGODB",
  "OPEN TO FREELANCE",
  "EXPRESS",
  "TAILWIND CSS",
  "LET'S BUILD TOGETHER",
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/DIGVIJAY-TRIPATHY",
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/digvijay-tripathy-194aa8314/",
    Icon: LinkedinIcon,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  // Track scroll progress of the whole page to drive the ring around
  // the "back to top" button — a small instrument, not just a button.
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPct(Math.min(100, Math.max(0, pct)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("tripathydigvijay7377@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — mailto link on the element still works.
    }
  };

  const RING_RADIUS = 20;
  const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 bg-black"
      id="contact"
    >
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .cta-ring-spin {
          animation: spin-slow 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track,
          .cta-ring-spin {
            animation: none !important;
          }
        }
      `}</style>

      {/* Ambient glow + faint grid texture */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-pink-500/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
      </div>

      {/* Signature marquee ticker */}
      <div className="relative border-b border-white/10 bg-white/[0.03] py-3">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-10 text-sm font-semibold tracking-[0.2em] text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #ec4899, #a855f7, #22d3ee)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-zinc-600" />
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="relative mb-20 overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
          {/* Rotating conic-gradient glow ring behind the CTA card */}
          <div
            className="cta-ring-spin pointer-events-none absolute -inset-[2px] -z-10 opacity-60"
            style={{
              background:
                "conic-gradient(from 0deg, #ec4899, #a855f7, #22d3ee, transparent 40%)",
            }}
          />
          <div className="absolute inset-[1px] -z-10 rounded-4xl bg-black" />

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
              className="group flex items-center gap-3 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:scale-105 hover:shadow-pink-500/40"
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

                <p className="text-zinc-400">Full Stack MERN Developer</p>
              </div>
            </div>

            <p className="max-w-md text-zinc-400">
              Building premium web experiences with React, Node.js, MongoDB and
              modern technologies.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
              </span>
              <span className="text-sm text-zinc-400">
                Available for internships & opportunities
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-semibold text-white">Navigation</h4>

            <div className="space-y-3">
              {[
                ["Home", "#home"],
                ["About", "#about"],
                ["Skills", "#skills"],
                ["Projects", "#projects"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="group relative block w-fit text-zinc-400 hover:text-pink-400"
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-linear-to-r from-pink-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-semibold text-white">Resources</h4>

            <div className="space-y-3">
              <a
                href={resume}
                download
                className="flex w-fit items-center gap-2 text-zinc-400 hover:text-pink-400"
              >
                <Download size={16} />
                Resume
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="flex w-fit items-center gap-2 text-left text-zinc-400 hover:text-pink-400"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail size={16} />
                    Email Me
                  </>
                )}
              </button>

              <span className="block text-zinc-400">Bhubaneswar, India</span>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-semibold text-white">Connect</h4>

            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group relative rounded-xl border border-white/10 bg-white/5 p-3 text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:text-pink-400 hover:shadow-lg hover:shadow-pink-500/20"
                >
                  <Icon />
                  <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/10 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                    {label}
                  </span>
                </a>
              ))}

              <a
                href="mailto:tripathydigvijay7377@gmail.com"
                aria-label="Email"
                className="group relative rounded-xl border border-white/10 bg-white/5 p-3 text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:text-pink-400 hover:shadow-lg hover:shadow-pink-500/20"
              >
                <Mail size={22} />
                <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/10 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                  Email
                </span>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "Node", "MongoDB", "Express", "Tailwind"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-zinc-500">
            © {year} Digvijay Tripathy. Crafted with React & Tailwind CSS.
          </p>

          {/* Back-to-top button with an SVG ring showing page scroll progress */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group relative flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
          >
            <svg
              viewBox="0 0 48 48"
              className="absolute inset-0 h-12 w-12 -rotate-90"
            >
              <circle
                cx="24"
                cy="24"
                r={RING_RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              <circle
                cx="24"
                cy="24"
                r={RING_RADIUS}
                fill="none"
                stroke="url(#ring-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={
                  RING_CIRCUMFERENCE - (scrollPct / 100) * RING_CIRCUMFERENCE
                }
                style={{ transition: "stroke-dashoffset 100ms linear" }}
              />
              <defs>
                <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-pink-500 group-hover:bg-pink-500">
              <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}