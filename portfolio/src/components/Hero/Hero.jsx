import { useEffect, useRef, useState } from "react";
import { Download, ArrowRight, ChevronDown, Code2 } from "lucide-react";
import { SiReact, SiMongodb, SiNodedotjs, SiGithub } from "react-icons/si";
import PROFILE_IMAGE from "../../assets/DIG.jpeg";
import RESUME_URL from "../../assets/DIGVIJAY-CV.pdf";

const NAME = "Digvijay Tripathy";
const ROLES = [
  "React Specialist",
  "MERN Stack Developer",
  "UI/UX Enthusiast",
  "Open-Source Contributor",
];
const BIO =
  "Passionate Full Stack Developer focused on building fast, scalable, and visually refined web applications with the MERN stack.";

const GITHUB_URL = "https://github.com/DIGVIJAY-TRIPATHY";

const SKILL_TICKER = [
  "React",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "Three.js",
  "Git",
];

const FLOATING_BADGES = [
  {
    key: "github",
    Icon: SiGithub,
    className: "-top-5 -left-6 sm:-left-8",
    depth: 24,
    color: "text-white",
    label: "GitHub",
    href: GITHUB_URL,
  },
  {
    key: "react",
    Icon: SiReact,
    className: "-top-6 right-6 sm:right-10",
    depth: 16,
    color: "text-cyan-400",
    label: "React",
  },
  {
    key: "mongo",
    Icon: SiMongodb,
    className: "bottom-10 -left-8 sm:-left-10",
    depth: 32,
    color: "text-emerald-400",
    label: "MongoDB",
  },
  {
    key: "node",
    Icon: SiNodedotjs,
    className: "-bottom-6 right-4 sm:right-8",
    depth: 20,
    color: "text-lime-400",
    label: "Node.js",
  },
  {
    key: "code",
    Icon: Code2,
    className: "top-1/3 -right-8 sm:-right-12",
    depth: 12,
    color: "text-purple-400",
    label: "Code",
  },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useTypewriter(words, reduced) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    let charIndex = 0;
    let wordIndex = 0;
    let deleting = false;
    let timeoutId;

    function tick() {
      const current = words[wordIndex];
      if (!deleting) {
        charIndex++;
        setText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1400);
          return;
        }
        timeoutId = setTimeout(tick, 65);
      } else {
        charIndex--;
        setText(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timeoutId = setTimeout(tick, 400);
          return;
        }
        timeoutId = setTimeout(tick, 32);
      }
    }

    timeoutId = setTimeout(tick, 65);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return text;
}

function magneticMove(e) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const relX = e.clientX - rect.left - rect.width / 2;
  const relY = e.clientY - rect.top - rect.height / 2;
  el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
}
function magneticLeave(e) {
  e.currentTarget.style.transform = "translate(0px, 0px)";
}

export default function Hero() {
  const [firstName, ...restName] = NAME.split(" ");
  const lastName = restName.join(" ");
  const reduced = useReducedMotion();
  const typed = useTypewriter(ROLES, reduced);
  const heroRef = useRef(null);
  const rafRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = heroRef.current;
    if (!el) return;

    function handleMove(e) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        el.style.setProperty("--spot-x", `${px}%`);
        el.style.setProperty("--spot-y", `${py}%`);
        el.style.setProperty("--mx", mx.toFixed(3));
        el.style.setProperty("--my", my.toFixed(3));
        rafRef.current = null;
      });
    }
    function handleLeave() {
      el.style.setProperty("--mx", 0);
      el.style.setProperty("--my", 0);
    }

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-black pb-16 pt-28 sm:pt-32"
    >
      <style>{`
      @import url('https://api.fontshare.com/v2/css?f[]=clash-display@700&display=swap');
        .spotlight {
          background: radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(34,211,238,0.10), transparent 45%);
          
        }
        .tilt-card {
          transform: perspective(1000px) rotateY(calc(var(--mx, 0) * 8deg)) rotateX(calc(var(--my, 0) * -8deg));
          transition: transform 150ms ease-out;
          transform-style: preserve-3d;
        }
        .badge-parallax {
          transform: translate(calc(var(--mx, 0) * var(--depth, 10px)), calc(var(--my, 0) * var(--depth, 10px)));
          transition: transform 150ms ease-out;
        }
        @keyframes hero-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .badge-bob {
          animation: hero-bob 3.4s ease-in-out infinite;
        }
        @keyframes hero-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: hero-marquee 22s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes hero-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink {
          animation: hero-blink 1s step-end infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .tilt-card, .badge-parallax { transform: none !important; transition: none !important; }
          .badge-bob, .marquee-track, .cursor-blink { animation: none !important; }
          .spotlight { display: none; }
        }
      `}</style>

      {/* ---------------- background layers ---------------- */}
      <div
        aria-hidden="true"
        className="spotlight pointer-events-none absolute inset-0"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-24 h-56 w-56 rounded-full bg-cyan-500/20 blur-[100px] sm:h-72 sm:w-72 sm:blur-[130px] motion-safe:animate-pulse" />
        <div className="absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-purple-600/20 blur-[120px] sm:h-96 sm:w-96 sm:blur-[160px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(127,119,221,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* ---------------- text column ---------------- */}
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300 backdrop-blur-xl">
            👋 Welcome to my portfolio
          </span>

          <p className="mt-7 text-sm font-medium uppercase tracking-[0.25em] text-slate-400 sm:text-base">
            Hi, I'm
          </p>

          <h1 className="mt-2 leading-[0.95] tracking-tight">
            <span className="block font-['Clash_Display'] text-4xl font-bold uppercase text-white sm:text-5xl md:text-6xl">
              {firstName}
            </span>
            <span className="block font-['Clash_Display'] text-4xl font-bold uppercase bg-linear-to-r from-[#7F77DD] via-[#cbb8c4] to-[#E0A458] bg-clip-text text-transparent sm:text-5xl md:text-6xl">
              {lastName}
            </span>
          </h1>

          <p className="mt-5 h-8 font-mono text-lg font-medium text-cyan-300 sm:text-xl">
            {typed}
            <span className="cursor-blink text-white">|</span>
          </p>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            {BIO}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#projects"
              onMouseMove={magneticMove}
              onMouseLeave={magneticLeave}
              className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-400 to-purple-500 px-6 py-3.5 text-sm font-semibold text-black shadow-[0_0_35px_rgba(34,211,238,0.25)] transition-transform duration-150 hover:shadow-[0_0_45px_rgba(34,211,238,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href={RESUME_URL}
              download
              onMouseMove={magneticMove}
              onMouseLeave={magneticLeave}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-colors duration-200 hover:border-cyan-400/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </div>
        </div>

        {/* ---------------- image column ---------------- */}
        <div className="order-1 flex justify-center lg:order-2">
          <div className="tilt-card relative w-[clamp(230px,68vw,360px)] aspect-[4/5]">
            {/* animated gradient border */}
            <div className="absolute -inset-1 rounded-[2rem] bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 opacity-70 blur-md motion-safe:animate-pulse" />

            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950">
              {!imgError ? (
                <img
                  src={PROFILE_IMAGE}
                  alt={NAME}
                  onError={() => setImgError(true)}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-800 to-slate-900">
                  <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-6xl font-black text-transparent">
                    DT
                  </span>
                </div>
              )}
              {/* glossy highlight sheen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,0.08), transparent 40%)",
                }}
              />
            </div>

            {/* availability pill */}
            <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-emerald-400/30 bg-slate-900/90 px-4 py-2 text-xs font-medium text-emerald-300 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
              Available for opportunities
            </div>

            {/* floating tech badges */}
            {FLOATING_BADGES.map(
              ({ key, Icon, className, depth, color, label, href }) => {
                const content = (
                  <div
                    role={href ? undefined : "img"}
                    aria-label={label}
                    className={`badge-bob rounded-2xl border border-white/10 bg-slate-900/80 p-2.5 backdrop-blur-xl transition duration-300 hover:scale-110 hover:border-cyan-400/40 sm:p-3 ${
                      href ? "cursor-pointer" : ""
                    }`}
                  >
                    <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${color}`} />
                  </div>
                );
                return (
                  <div
                    key={key}
                    className={`badge-parallax absolute ${className}`}
                    style={{ "--depth": `${depth}px` }}
                  >
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded-2xl"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>

      {/* ---------------- skills marquee ---------------- */}
      <div
        className="relative z-10 mt-16 overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap py-2 font-mono text-sm text-slate-500">
          {[...SKILL_TICKER, ...SKILL_TICKER].map((skill, i) => (
            <span key={i} className="flex items-center gap-10">
              {skill}
              <span className="text-cyan-400/50" aria-hidden="true">
                •
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------------- scroll cue ---------------- */}
      <div className="relative z-10 mt-10 hidden justify-center sm:flex">
        <div className="flex flex-col items-center gap-1 text-[11px] uppercase tracking-[0.3em] text-slate-500">
          Scroll
          <ChevronDown className="h-4 w-4 motion-safe:animate-bounce" />
        </div>
      </div>
    </section>
  );
}
