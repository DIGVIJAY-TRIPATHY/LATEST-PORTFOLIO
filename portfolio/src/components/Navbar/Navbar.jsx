import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight, Download } from "lucide-react";
import resume from "../../assets/DIGVIJAY-CV.pdf";
const GithubIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width={16}
    height={16}
    fill="currentColor"
    {...props}
  >
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width={16}
    height={16}
    fill="currentColor"
    {...props}
  >
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [emberStyle, setEmberStyle] = useState({ opacity: 0 });

  const linkRefs = useRef({});
  const railRef = useRef(null);

  // shrink + glass the bar once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // track which section is on screen (works if sections share these ids).
  // Guarded so "Home" always wins near the top of the page, even if the
  // "about" section sits just below the fold and technically intersects first.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: "-20% 0px -35% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // move the glowing ember to whichever link is hovered, falling back to active
  useEffect(() => {
    const key = hovered ?? active;
    const el = linkRefs.current[key];
    const rail = railRef.current;
    if (!el || !rail) return;
    const railBox = rail.getBoundingClientRect();
    const elBox = el.getBoundingClientRect();
    setEmberStyle({
      opacity: 1,
      width: elBox.width,
      transform: `translateX(${elBox.left - railBox.left}px)`,
    });
  }, [hovered, active]);

  // lock body scroll when the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (id) => {
    setMobileOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        .nav-font-display { font-family: 'Space Grotesk', sans-serif; }
        .nav-font-body { font-family: 'Inter', sans-serif; }

        @keyframes navFadeDown {
          from { opacity: 0; transform: translate(-50%, -16px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes ringSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes emberPulse {
          0%, 100% { filter: blur(10px) brightness(1); }
          50%      { filter: blur(14px) brightness(1.25); }
        }
        @keyframes drawerIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes linkIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .logo-ring::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 9999px;
          padding: 2px;
          background: conic-gradient(from 0deg, #ec4899, #a855f7, #3b82f6, #ec4899);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: ringSpin 6s linear infinite;
        }

        .ember-glow {
          background: linear-gradient(90deg, rgba(236,72,153,0.9), rgba(168,85,247,0.9), rgba(59,130,246,0.9));
          animation: emberPulse 2.4s ease-in-out infinite;
        }

        .nav-underline {
          background: linear-gradient(90deg, #ec4899, #a855f7, #3b82f6);
        }

        @media (prefers-reduced-motion: reduce) {
          .logo-ring::before, .ember-glow { animation: none; }
        }

        /* Bulletproof floating/centering: written as plain CSS with !important
           so the pill still floats correctly even if a parent element has a
           transform/filter (which would otherwise hijack position:fixed), or
           if a global stylesheet resets header/nav width and margin. */
        .godnav-wrap {
          position: fixed !important;
          top: 16px !important;
          left: 50% !important;
          right: auto !important;
          bottom: auto !important;
          transform: translateX(-50%) !important;
          margin: 0 !important;
          z-index: 999 !important;
          width: 94% !important;
          max-width: 760px !important;
        }
        @media (min-width: 640px) {
          .godnav-wrap { top: 24px !important; width: max-content !important; }
        }
      `}</style>

      <header
        style={{
          animation: "navFadeDown 0.6s cubic-bezier(0.16,1,0.3,1) both",
        }}
        className="godnav-wrap"
      >
        <nav
          className={[
            "relative flex items-center justify-between gap-3 sm:gap-6",
            "rounded-full border transition-all duration-500 ease-out",
            "nav-font-body",
            scrolled
              ? "px-3 py-2 sm:px-4 sm:py-2.5 bg-black/70 border-white/15 shadow-[0_8px_32px_-8px_rgba(168,85,247,0.45)] backdrop-blur-xl"
              : "px-3 py-2.5 sm:px-5 sm:py-3 bg-black/50 border-white/12 shadow-[0_8px_40px_-12px_rgba(168,85,247,0.4)] backdrop-blur-lg",
          ].join(" ")}
        >
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="relative flex items-center gap-2 shrink-0 group"
            aria-label="Go to home"
          >
            <span className="relative logo-ring inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black">
              <span className="nav-font-display text-[11px] sm:text-xs font-bold bg-linear-to-br from-pink-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                DT
              </span>
            </span>
            <span className="hidden sm:inline nav-font-display text-sm font-semibold text-white/90 tracking-tight group-hover:text-white transition-colors">
              Digvijay
            </span>
          </button>

          {/* Desktop links */}
          <div
            ref={railRef}
            onMouseLeave={() => setHovered(null)}
            className="relative hidden md:flex items-center gap-1 rounded-full"
          >
            {/* the ember — signature glow that glides beneath the active/hovered link */}
            <span
              aria-hidden="true"
              className="ember-glow absolute top-1/2 left-0 h-8 -translate-y-1/2 rounded-full opacity-70 transition-[transform,width,opacity] duration-300 ease-out pointer-events-none"
              style={emberStyle}
            />
            {LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  ref={(el) => (linkRefs.current[link.id] = el)}
                  onMouseEnter={() => setHovered(link.id)}
                  onClick={() => handleNavClick(link.id)}
                  className={[
                    "relative z-10 px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200",
                    isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white/90",
                  ].join(" ")}
                >
                  {link.label}
                  <span
                    className={[
                      "nav-underline absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full origin-left transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>

          {/* Right side: socials + CTA (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://github.com/DIGVIJAY-TRIPATHY"
              aria-label="GitHub"
              target="_blank"
              className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/digvijay-tripathy-194aa8314/"
              aria-label="LinkedIn"
              target="_blank"
              className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <LinkedinIcon />
            </a>
            <a
              className="group relative inline-flex items-center gap-1.5 ml-1 px-4 py-2 rounded-full text-sm font-semibold text-white overflow-hidden"
              target="_blank"
              href={resume}
              download
            >
              <span className="absolute inset-0 bg-linear-to-r from-pink-500 via-fuchsia-500 to-blue-500 transition-transform duration-300 group-hover:scale-105" />
              <span className="relative">Resume</span>
              <Download size={14} className="relative" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden relative z-10 flex items-center justify-center h-9 w-9 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            style={{
              animation: "drawerIn 0.25s cubic-bezier(0.16,1,0.3,1) both",
            }}
            className="md:hidden mt-3 rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(168,85,247,0.45)] overflow-hidden"
          >
            <div className="flex flex-col p-2">
              {LINKS.map((link, i) => {
                const isActive = active === link.id;
                return (
                  <button
                    key={link.id}
                    style={{ animation: `linkIn 0.35s ease ${i * 0.05}s both` }}
                    onClick={() => handleNavClick(link.id)}
                    className={[
                      "flex items-center justify-between px-4 py-3 rounded-2xl text-left nav-font-body text-[15px] font-medium transition-colors",
                      isActive
                        ? "text-white bg-linear-to-r from-pink-500/15 via-fuchsia-500/15 to-blue-500/15"
                        : "text-white/70 hover:text-white hover:bg-white/5",
                    ].join(" ")}
                  >
                    {link.label}
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-linear-to-r from-pink-400 to-blue-400" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-white/10">
              <div className="flex items-center gap-1">
                <a
                  href="https://github.com/DIGVIJAY-TRIPATHY"
                  aria-label="GitHub"
                  target="_blank"
                  className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <GithubIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/digvijay-tripathy-194aa8314/"
                  aria-label="LinkedIn"
                  target="_blank"
                  className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <LinkedinIcon />
                </a>
              </div>
              <a
                target="_blank"
                href={resume}
                download
                className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white overflow-hidden"
              >
                <span className="absolute inset-0 bg-linear-to-r from-pink-500 via-fuchsia-500 to-blue-500" />
                <span className="relative">Resume</span>
                <ArrowUpRight size={14} className="relative" />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
