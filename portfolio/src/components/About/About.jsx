import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Edit this content freely — the terminal is just a renderer for it.
// ---------------------------------------------------------------------------
const PROFILE = {
  name: "DIGVIJAY TRIPATHY",
  role: "Frontend Developer · MERN Stack",
  bio: "I'm a passionate Frontend Developer focused on building minimal yet interactive user experiences. I enjoy turning ideas into digital products using React, CSS magic, and modern UI trends.",
};

const EDUCATION = [
  { period: "2023 - Present", current: true, title: "B.Tech — NIT Bhubaneswar", subtitle: "Computer Science & Engineering" },
  { period: "2021 - 2023", title: "Anandapur College", subtitle: "12th completed with Science specialization" },
  { period: "2021", title: "High School", subtitle: "10th" },
];

// TODO: replace with your real work history.
const EXPERIENCE = [
  {
    period: "2025 - Present",
    current: true,
    title: "Freelance Full Stack Developer",
    bullets: [
      "Design and build MERN stack web apps end-to-end, from UI to deployment.",
      "Own the whole pipeline: React front ends, Node/Express APIs, MongoDB data layer.",
    ],
  },
  {
    period: "2024",
    title: "Frontend Development Intern — add company",
    bullets: [
      "Add a bullet about a feature or component you shipped.",
      "Add a bullet about the tools or stack you used day to day.",
    ],
  },
];

const SKILLS = ["React", "JavaScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Three.js", "Git"];

// TODO: replace with your real links.
const CONTACT = [
  { label: "Email", value: "your.email@example.com", href: "mailto:your.email@example.com" },
  { label: "GitHub", value: "github.com/yourusername", href: "https://github.com/yourusername" },
  { label: "LinkedIn", value: "linkedin.com/in/yourusername", href: "https://linkedin.com/in/yourusername" },
];

// ---------------------------------------------------------------------------
// Command definitions — each returns an array of styled output lines.
// ---------------------------------------------------------------------------
let uid = 0;
const nextId = () => `l${uid++}`;

const line = (text, variant = "plain") => ({ id: nextId(), text, variant });
const blank = () => line("", "plain");

const COMMANDS = {
  whoami: {
    desc: "who I am",
    run: () => [line(PROFILE.name, "accent"), line(PROFILE.role, "muted"), line(PROFILE.bio, "plain")],
  },
  about: {
    desc: "my quick bio",
    run: () => [line(PROFILE.bio, "plain")],
  },
  education: {
    desc: "my academic timeline",
    run: () => {
      const out = [line("Education Journey", "heading"), blank()];
      EDUCATION.forEach((e) => {
        out.push(line(`[${e.period}]${e.current ? " (current)" : ""}`, "key"));
        out.push(line(`  ${e.title}`, "plain"));
        out.push(line(`  ${e.subtitle}`, "muted"));
        out.push(blank());
      });
      return out.slice(0, -1);
    },
  },
  experience: {
    desc: "my work history",
    run: () => {
      const out = [line("Professional Experience", "heading"), blank()];
      EXPERIENCE.forEach((e) => {
        out.push(line(`[${e.period}]${e.current ? " (current)" : ""}`, "key"));
        out.push(line(`  ${e.title}`, "plain"));
        e.bullets.forEach((b) => out.push(line(`  - ${b}`, "muted")));
        out.push(blank());
      });
      return out.slice(0, -1);
    },
  },
  skills: {
    desc: "tools I work with",
    run: () => [line(SKILLS.join("  ·  "), "accent")],
  },
  contact: {
    desc: "ways to reach me",
    run: () =>
      CONTACT.map((c) => ({
        id: nextId(),
        text: `${c.label}: ${c.value}`,
        variant: "link",
        href: c.href,
      })),
  },
  ls: {
    desc: "list available sections",
    run: () => [
      line("about  education  experience  skills  contact", "plain"),
      line("(type a name above, or 'help' for commands)", "muted"),
    ],
  },
  help: {
    desc: "show this list",
    run: () => [
      line("Available commands:", "heading"),
      ...Object.entries(COMMANDS).map(([k, v]) => line(`  ${k.padEnd(11, " ")} → ${v.desc}`, "muted")),
      line("  clear        → clear the terminal", "muted"),
    ],
  },
};

const WELCOME = [
  line("portfolio-os v1.0.0 booting...", "muted"),
  line("loading profile module... done", "muted"),
  line("loading experience module... done", "muted"),
  blank(),
  line(`Hi, I'm ${PROFILE.name}. Welcome to my terminal.`, "accent"),
  line("Type 'help' to see what I can do, or try 'whoami'.", "muted"),
];

function parseCommand(raw) {
  let cmd = raw.trim().toLowerCase();
  if (cmd === "sudo hire me" || cmd === "sudo hire-me") return "EASTER_HIRE";
  cmd = cmd.replace(/^(cat|run|open|view|show)\s+/, "").replace(/^\.\//, "").trim();
  cmd = cmd.replace(/\s+(--list|-la|-l)$/, "").trim();
  return cmd;
}

function OutputLine({ l }) {
  if (l.variant === "link") {
    return (
      <div className="term-line">
        <a
          href={l.href}
          className="term-link"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {l.text}
        </a>
      </div>
    );
  }
  return <div className={`term-line term-${l.variant}`}>{l.text || "\u00A0"}</div>;
}

export default function About() {
  const [history, setHistory] = useState(() =>
    WELCOME.map((l, i) => ({ id: `boot-${i}`, kind: "output", lines: [l] }))
  );
  const [value, setValue] = useState("");
  const [cmdLog, setCmdLog] = useState([]);
  const [cmdPointer, setCmdPointer] = useState(-1);
  const [reduceMotion, setReduceMotion] = useState(false);

  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("in-view");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("in-view");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  function pushBlock(kind, lines) {
    setHistory((h) => [...h, { id: nextId(), kind, lines }]);
  }

  function runCommand(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    pushBlock("input", [{ id: nextId(), text: raw, variant: "plain" }]);
    setCmdLog((log) => [...log, raw]);
    setCmdPointer(-1);

    const key = parseCommand(raw);

    if (key === "clear") {
      setHistory([]);
      return;
    }
    if (key === "EASTER_HIRE") {
      pushBlock("output", [
        line("Permission granted. ✅", "accent"),
        line("Let's build something great together.", "plain"),
        { id: nextId(), text: `Email: ${CONTACT[0].value}`, variant: "link", href: CONTACT[0].href },
      ]);
      return;
    }
    if (COMMANDS[key]) {
      pushBlock("output", COMMANDS[key].run());
      return;
    }
    pushBlock("output", [
      line(`command not found: ${raw}`, "muted"),
      line("try 'help' for a list of commands", "muted"),
    ]);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      runCommand(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdLog.length === 0) return;
      const nextPointer = cmdPointer < 0 ? cmdLog.length - 1 : Math.max(0, cmdPointer - 1);
      setCmdPointer(nextPointer);
      setValue(cmdLog[nextPointer]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdPointer < 0) return;
      const nextPointer = cmdPointer + 1;
      if (nextPointer >= cmdLog.length) {
        setCmdPointer(-1);
        setValue("");
      } else {
        setCmdPointer(nextPointer);
        setValue(cmdLog[nextPointer]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find((k) => k.startsWith(value.toLowerCase()) && value.length > 0);
      if (match) setValue(match);
    } else if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  }

  function focusInput() {
    inputRef.current?.focus();
  }

  const quickCommands = ["whoami", "education", "experience", "skills", "contact", "help"];

  return (
    <section className="about-section" ref={sectionRef} id="about">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .about-section {
          position: relative;
          background: #0a0b10;
          background-image: radial-gradient(circle, rgba(127,119,221,0.12) 1px, transparent 1px);
          background-size: 32px 32px;
          padding: clamp(56px, 10vw, 100px) clamp(16px, 6vw, 96px);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 700ms ease, transform 700ms ease;
        }

        .about-section.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        .about-section * {
          box-sizing: border-box;
        }

        .about-label {
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          color: #7F77DD;
          font-size: 12px;
          letter-spacing: 0.15em;
          font-weight: 500;
          margin: 0 0 16px 0;
        }

        .about-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(30px, 6vw, 44px);
          color: #ffffff;
          margin: 0 0 clamp(28px, 5vw, 40px) 0;
          text-align: center;
        }

        /* ---------------- terminal window ---------------- */
        .terminal {
          width: 100%;
          max-width: 720px;
          background: #0d0e14;
          border: 1px solid rgba(127,119,221,0.3);
          border-radius: 14px;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4), 0 30px 80px -20px rgba(127,119,221,0.25);
          overflow: hidden;
        }

        .terminal-titlebar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: #14151d;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .titlebar-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }

        .titlebar-dot.red { background: #ff5f56; }
        .titlebar-dot.yellow { background: #ffbd2e; }
        .titlebar-dot.green { background: #27c93f; }

        .titlebar-label {
          flex: 1;
          text-align: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          margin-right: 40px;
        }

        .terminal-body {
          height: clamp(360px, 55vw, 440px);
          overflow-y: auto;
          padding: 18px 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(12.5px, 2.4vw, 14px);
          line-height: 1.7;
          cursor: text;
          scrollbar-width: thin;
          scrollbar-color: rgba(127,119,221,0.4) transparent;
        }

        .terminal-body::-webkit-scrollbar {
          width: 8px;
        }
        .terminal-body::-webkit-scrollbar-thumb {
          background: rgba(127,119,221,0.35);
          border-radius: 8px;
        }

        .term-block {
          animation: termIn 380ms ease;
        }

        @keyframes termIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .term-block { animation: none; }
        }

        .term-line {
          white-space: pre-wrap;
          word-break: break-word;
          color: rgba(255,255,255,0.78);
        }

        .term-plain { color: rgba(255,255,255,0.78); }
        .term-muted { color: rgba(255,255,255,0.42); }
        .term-accent { color: #b98cf2; font-weight: 600; }
        .term-key { color: #ec4899; font-weight: 600; margin-top: 6px; }
        .term-heading { color: #ec4899; font-weight: 700; }

        .term-link {
          color: #ec4899;
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
        }
        .term-link:hover { color: #ffffff; }

        .term-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
        }

        .term-prompt {
          flex-shrink: 0;
          white-space: nowrap;
        }
        .term-prompt .user { color: #7F77DD; font-weight: 600; }
        .term-prompt .at { color: rgba(255,255,255,0.35); }
        .term-prompt .path { color: #ec4899; font-weight: 600; }
        .term-prompt .sym { color: rgba(255,255,255,0.6); margin-left: 2px; }

        .term-input {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(12.5px, 2.4vw, 14px);
          caret-color: #ec4899;
        }

        /* ---------------- quick command chips ---------------- */
        .quick-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
          max-width: 720px;
        }

        .quick-chip {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          background: rgba(127,119,221,0.08);
          border: 1px solid rgba(127,119,221,0.3);
          border-radius: 100px;
          padding: 7px 16px;
          cursor: pointer;
          transition: color 180ms ease, border-color 180ms ease, transform 150ms ease, background 180ms ease;
        }

        .quick-chip:hover {
          color: #ffffff;
          border-color: #ec4899;
          background: rgba(236,72,153,0.1);
          transform: translateY(-2px);
        }

        .quick-chip:active {
          transform: scale(0.96);
        }

        .quick-chip:focus-visible {
          outline: 2px solid #ec4899;
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .quick-chip:hover { transform: none; }
        }

        /* visually hidden but accessible/crawlable fallback content */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>

      <p className="about-label">— get to know me</p>
      <h2 className="about-heading">About Me</h2>

      <div className="terminal" onClick={focusInput}>
        <div className="terminal-titlebar">
          <span className="titlebar-dot red" />
          <span className="titlebar-dot yellow" />
          <span className="titlebar-dot green" />
          <span className="titlebar-label">digvijay@portfolio: ~</span>
        </div>

        <div
          className="terminal-body"
          ref={bodyRef}
          role="log"
          aria-live="polite"
          aria-label="Interactive terminal — type a command to learn about Digvijay"
        >
          {history.map((block) => (
            <div className="term-block" key={block.id}>
              {block.kind === "input" ? (
                <div className="term-line">
                  <span className="term-prompt">
                    <span className="user">digvijay</span>
                    <span className="at">@portfolio</span>
                    <span className="path"> ~</span>
                    <span className="sym">$</span>
                  </span>{" "}
                  {block.lines[0].text}
                </div>
              ) : (
                block.lines.map((l) => <OutputLine l={l} key={l.id} />)
              )}
            </div>
          ))}

          <div className="term-input-row">
            <span className="term-prompt">
              <span className="user">digvijay</span>
              <span className="at">@portfolio</span>
              <span className="path"> ~</span>
              <span className="sym">$</span>
            </span>
            <input
              ref={inputRef}
              className="term-input"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Terminal command input"
              placeholder="type 'help'"
            />
          </div>
        </div>
      </div>

      <div className="quick-row">
        {quickCommands.map((c) => (
          <button
            key={c}
            type="button"
            className="quick-chip"
            onClick={() => {
              runCommand(c);
              focusInput();
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Same content, plain text — for screen readers/crawlers that don't
          fully track a live-updating log, and for SEO. */}
      <div className="sr-only">
        <h3>{PROFILE.name}</h3>
        <p>{PROFILE.bio}</p>
        <h4>Education</h4>
        <ul>
          {EDUCATION.map((e) => (
            <li key={e.title}>
              {e.period}: {e.title} — {e.subtitle}
            </li>
          ))}
        </ul>
        <h4>Experience</h4>
        <ul>
          {EXPERIENCE.map((e) => (
            <li key={e.title}>
              {e.period}: {e.title}
            </li>
          ))}
        </ul>
        <h4>Skills</h4>
        <p>{SKILLS.join(", ")}</p>
        <h4>Contact</h4>
        <ul>
          {CONTACT.map((c) => (
            <li key={c.label}>
              {c.label}: <a href={c.href}>{c.value}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}