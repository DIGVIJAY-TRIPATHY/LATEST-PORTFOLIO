import { useEffect, useRef, useState } from "react";
import portfolio_img from "../../assets/portfolio.png";
import taskFlow_img from "../../assets/taskflow.png";

// ---------------------------------------------------------------------------
// Data: dummy builds. `status` and `category` both carry real information —
// status maps to a deploy-state pill, category maps to an accent color that
// doubles as a "branch" indicator in the terminal-style chrome. Nothing here
// is decorative numbering; the counts in the header are computed from this
// array, not hard-coded.
// ---------------------------------------------------------------------------
const PROJECTS = [
    {
        slug: "taskflow",
        title: "TaskFlow",
        category: "fullstack",
        status: "beta",
        description:
            "A MERN task management app with secure JWT auth, priority-based task organization, search/filtering, and a real-time analytics dashboard.",
        stack: ["React", "Zustand", "Node.js", "Express", "MongoDB"],
        featured: false,
        liveUrl: "https://taskflow.example.com",
        sourceUrl: "https://github.com/DIGVIJAY-TRIPATHY/TaskFlow",
        image: taskFlow_img,
    },
    {
        slug: "streamvault",
        title: "StreamVault",
        category: "fullstack",
        status: "beta",
        description:
            "A full-stack video sharing platform with JWT auth (silent token refresh), Cloudinary uploads, and a complete creator studio dashboard.",
        stack: ["React", "Node.js", "MongoDB", "TanStack Query", "Cloudinary"],
        featured: false,
        liveUrl: "https://streamvault.example.com",
        sourceUrl: "https://github.com/DIGVIJAY-TRIPATHY/STREAMVAULT",
    },

    {
        slug: "portfolio",
        title: "Personal Portfolio",
        category: "frontend",
        status: "live",
        description:
            "My personal developer portfolio featuring 3D scenes and interactive animations, built with React Three Fiber, GSAP, and Framer Motion for a polished, immersive experience.",
        stack: [
            "React",
            "Three.js",
            "React Three Fiber",
            "GSAP",
            "Framer Motion",
            "Tailwind CSS",
        ],
        featured: true,
        liveUrl: "https://yourportfolio.example.com",
        sourceUrl: "https://github.com/DIGVIJAY-TRIPATHY/LATEST-PORTFOLIO",
        image: portfolio_img,
    },
];

const CATEGORY_META = {
    frontend: { color: "#8B7FE8", label: "Frontend" },
    backend: { color: "#2BB0C7", label: "Backend" },
    tools: { color: "#5B8DEF", label: "Tooling" },
};

const STATUS_META = {
    live: { color: "#3FD48B", label: "Live" },
    beta: { color: "#F5A623", label: "Beta" },
    archived: { color: "#8B8FA3", label: "Archived" },
};

const pad = (n) => String(n).padStart(2, "0");

// ---- shared card markup, used by both the desktop grid and the mobile carousel ----
function ProjectCard({ project, variant, innerRef, onTilt, onTiltReset }) {
    const meta = CATEGORY_META[project.category] || CATEGORY_META.tools;
    const status = STATUS_META[project.status] || STATUS_META.archived;
    const isFeatured = Boolean(project.featured);

    return (
        <article
            ref={innerRef}
            data-index={project.__index}
            role="listitem"
            onMouseMove={variant === "grid" ? onTilt : undefined}
            onMouseLeave={variant === "grid" ? onTiltReset : undefined}
            className={`project-card group relative flex flex-col overflow-hidden rounded-2xl
        border border-white/10 bg-white/3 backdrop-blur-sm
        ${variant === "carousel" ? "w-[82%] min-[480px]:w-[62%] sm:w-[46%] shrink-0 snap-center" : "w-full"}
      `}
            style={{ "--accent": meta.color }}
        >
            {/* preview: real screenshot when provided, otherwise shimmer skeleton */}
            <div
                className={`relative overflow-hidden border-b border-white/10 bg-black/30 ${
                    isFeatured ? "h-40 sm:h-48" : "h-28"
                }`}
            >
                {project.image ? (
                    <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        className="absolute inset-0 h-full w-full object-contain" //it is the reason for fitting of image (object-cover)
                        loading="lazy"
                    />
                ) : (
                    <>
                        <div className="skeleton-shimmer absolute inset-0" />
                        <div className="absolute inset-0 flex flex-col justify-end gap-2 p-4">
                            <div className="h-2 w-2/3 rounded-full bg-white/10" />
                            <div className="h-2 w-1/3 rounded-full bg-white/10" />
                        </div>
                    </>
                )}
                <div
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-25 blur-2xl"
                    style={{ background: meta.color }}
                />
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                {/* terminal chrome: file path + blinking cursor + status pill */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2 font-mono text-[11px] text-white/45">
                        <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{
                                background: meta.color,
                                boxShadow: `0 0 6px ${meta.color}`,
                            }}
                        />
                        <span className="truncate">
                            ~/projects/{project.slug}
                        </span>
                        <span
                            className="cursor-blink"
                            style={{ color: meta.color }}
                        >
                            _
                        </span>
                    </div>
                    <span
                        className="shrink-0 whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                        style={{
                            color: status.color,
                            borderColor: `color-mix(in srgb, ${status.color} 45%, transparent)`,
                            background: `color-mix(in srgb, ${status.color} 14%, transparent)`,
                        }}
                    >
                        {status.label}
                    </span>
                </div>

                <h3
                    className={`font-display font-bold text-white ${
                        isFeatured ? "text-2xl sm:text-[28px]" : "text-xl"
                    }`}
                >
                    {project.title}
                </h3>

                <p className="flex-1 text-sm leading-relaxed text-white/60">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.stack.map((tech) => (
                        <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/4 px-2.5 py-1 font-mono text-[10.5px] text-white/55"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="mt-2 flex items-center gap-5 border-t border-white/[0.07] pt-4 font-mono text-xs">
                    {project.status === "live" && project.liveUrl && (  //here the change made for the only live status will show the open live option
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tag-link flex items-center gap-1.5 text-white/70 transition-colors hover:text-white"
                            style={{ "--accent": meta.color }}
                        >
                            <span className="text-white/30">$</span> open --live
                            <span aria-hidden="true">↗</span>
                        </a>
                    )}
                    {project.sourceUrl && (
                        <a
                            href={project.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tag-link flex items-center gap-1.5 text-white/70 transition-colors hover:text-white"
                            style={{ "--accent": meta.color }}
                        >
                            <span className="text-white/30">$</span> view
                            --source
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export default function Projects() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const cardRefs = useRef([]);
    const [revealed, setRevealed] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const indexed = PROJECTS.map((p, i) => ({ ...p, __index: i }));
    const featuredFirst = [...indexed].sort(
        (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
    );
    const counts = PROJECTS.reduce((acc, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
    }, {});

    // ---- section reveal on scroll ----
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reduceMotion) {
            setRevealed(true);
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setRevealed(true);
                    io.disconnect();
                }
            },
            { threshold: 0.15 },
        );
        io.observe(section);
        return () => io.disconnect();
    }, []);

    // ---- track which carousel card is dominant, for dots + build-log line ----
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                        const idx = Number(entry.target.dataset.carouselIndex);
                        if (!Number.isNaN(idx)) setActiveIndex(idx);
                    }
                });
            },
            { root: track, threshold: [0.6] },
        );
        cardRefs.current.forEach((el) => el && io.observe(el));
        return () => io.disconnect();
    }, []);

    function goTo(i) {
        const clamped = Math.max(0, Math.min(featuredFirst.length - 1, i));
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        cardRefs.current[clamped]?.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            inline: "center",
            block: "nearest",
        });
    }

    function handleTilt(e) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
        card.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    }
    function handleTiltReset(e) {
        e.currentTarget.style.setProperty("--rx", "0deg");
        e.currentTarget.style.setProperty("--ry", "0deg");
    }

    const active = featuredFirst[activeIndex] || featuredFirst[0];

    return (
        <section
            ref={sectionRef}
            id="projects"
            className={`projects-section relative px-5 py-16 transition-all duration-700 ease-out sm:px-8 sm:py-24 ${
                revealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
            }`}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .projects-section {
          background-image: radial-gradient(circle, rgba(139,127,232,0.10) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .projects-section, .projects-section * { font-family: 'Inter', sans-serif; }
        .projects-section .font-mono, .projects-section .font-mono * { font-family: 'JetBrains Mono', monospace; }

        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        .project-card {
          transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
          transition: transform 150ms ease, border-color 200ms ease, box-shadow 200ms ease;
        }
        .project-card:hover {
          border-color: color-mix(in srgb, var(--accent) 55%, transparent);
          box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent) 25%, transparent),
            0 20px 40px -20px color-mix(in srgb, var(--accent) 45%, transparent);
        }

        .skeleton-shimmer {
          background: linear-gradient(
            100deg,
            rgba(255,255,255,0.02) 30%,
            rgba(255,255,255,0.07) 45%,
            rgba(255,255,255,0.02) 60%
          );
          background-size: 200% 100%;
          animation: shimmer 2.8s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 160% 0; }
          100% { background-position: -60% 0; }
        }

        .cursor-blink { animation: blink 1.1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        .tag-link { position: relative; }
        .tag-link:hover { color: var(--accent) !important; }

        .carousel-arrow:disabled { opacity: 0.25; cursor: default; }
        .carousel-arrow:not(:disabled):hover {
          border-color: rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.06);
        }

        .dot { transition: width 200ms ease, background 200ms ease; }

        @media (prefers-reduced-motion: reduce) {
          .project-card, .projects-section { transition: none !important; }
          .skeleton-shimmer, .cursor-blink { animation: none !important; }
        }
      `}</style>

            <div className="mx-auto max-w-6xl">
                <div className="mb-10 max-w-xl sm:mb-14">
                    <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-[#8B7FE8]">
                        — selected builds
                    </p>
                    <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-[40px]">
                        Projects &amp; Builds
                    </h2>
                    <p className="mt-4 font-mono text-xs text-white/40">
                        {PROJECTS.length} builds · {counts.live || 0} live ·{" "}
                        {counts.beta || 0} in beta · {counts.archived || 0}{" "}
                        archived
                    </p>
                </div>

                {/* ---- desktop / tablet: asymmetric grid, featured build leads ---- */}
                <div
                    role="list"
                    className="hidden gap-5 md:grid md:grid-cols-3"
                >
                    {featuredFirst.map((project, i) => (
                        <div
                            key={project.slug}
                            className={project.featured ? "md:col-span-2" : ""}
                            style={{
                                transitionDelay: revealed
                                    ? `${i * 70}ms`
                                    : "0ms",
                            }}
                        >
                            <ProjectCard
                                project={project}
                                variant="grid"
                                onTilt={handleTilt}
                                onTiltReset={handleTiltReset}
                            />
                        </div>
                    ))}
                </div>

                {/* ---- mobile: swipeable carousel ---- */}
                <div className="md:hidden">
                    <div
                        ref={trackRef}
                        role="list"
                        tabIndex={0}
                        aria-label="Project carousel, swipe or use the arrow buttons to browse"
                        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2"
                    >
                        {featuredFirst.map((project, i) => (
                            <ProjectCard
                                key={project.slug}
                                project={{ ...project, __index: i }}
                                variant="carousel"
                                innerRef={(el) => {
                                    cardRefs.current[i] = el;
                                    if (el) el.dataset.carouselIndex = i;
                                }}
                            />
                        ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4">
                        <button
                            type="button"
                            aria-label="Previous project"
                            disabled={activeIndex === 0}
                            onClick={() => goTo(activeIndex - 1)}
                            className="carousel-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors"
                        >
                            ←
                        </button>

                        <div className="flex items-center gap-1.5">
                            {featuredFirst.map((project, i) => (
                                <button
                                    key={project.slug}
                                    type="button"
                                    aria-label={`Go to ${project.title}`}
                                    onClick={() => goTo(i)}
                                    className="dot h-1.5 rounded-full bg-white/20"
                                    style={{
                                        width:
                                            i === activeIndex ? "20px" : "6px",
                                        background:
                                            i === activeIndex
                                                ? CATEGORY_META[
                                                      project.category
                                                  ]?.color
                                                : undefined,
                                    }}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            aria-label="Next project"
                            disabled={activeIndex === featuredFirst.length - 1}
                            onClick={() => goTo(activeIndex + 1)}
                            className="carousel-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors"
                        >
                            →
                        </button>
                    </div>

                    {active && (
                        <p className="mt-4 text-center font-mono text-[11px] text-white/35">
                            [ {pad(activeIndex + 1)} /{" "}
                            {pad(featuredFirst.length)} ] {active.slug} —{" "}
                            {STATUS_META[active.status].label.toLowerCase()}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
