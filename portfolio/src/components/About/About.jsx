import TerminalPanel from "./Terminal.jsx";
import {
  Sparkles,
  ArrowUpRight,
} from "lucide-react";



const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-950 py-28"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-[140px] animate-pulse" />

        <div
          className="absolute right-0 bottom-10 h-96 w-96 rounded-full bg-purple-600/20 blur-[160px]"
          style={{
            animation: "spin 25s linear infinite",
          }}
        />

        <div className="absolute inset-0 bg-[radial-linear(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size[34px_34px]" />

        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="mb-20 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            About Me
          </span>

          <h2 className="mt-8 text-5xl font-black leading-none tracking-tight text-white md:text-7xl">
            Architecting
            <br />
            <span className="bg-linear-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text text-transparent">
              Digital Ecosystems
            </span>
            <br />
            Beyond Interfaces.
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1.25fr_0.75fr]">
          {/* LEFT */}
          <div className="space-y-10">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,255,0.05)] transition-all duration-500 hover:border-cyan-400/40">
              <p className="text-lg leading-9 text-slate-300">
                Every great digital product begins with a question—not just
                <span className="font-semibold text-white">
                  {" "}
                  "How do we build it?"
                </span>
                , but
                <span className="font-semibold text-cyan-300">
                  {" "}
                  "How should people experience it?"
                </span>
              </p>

              <p className="mt-8 text-lg leading-9 text-slate-400">
                I'm <span className="font-bold text-white">Digvijay</span>, a
                MERN Stack Developer focused on engineering modern web
                applications that balance elegant design with scalable
                architecture. From crafting immersive React interfaces to
                building secure APIs with Express and Node.js, every project is
                driven by performance, maintainability, and purposeful user
                experience.
              </p>

              <p className="mt-8 text-lg leading-9 text-slate-400">
                What began as curiosity for writing code has evolved into a
                relentless pursuit of building premium digital systems where
                clean architecture, intuitive interactions, and pixel-perfect
                execution exist as one cohesive experience.
              </p>
            </div>

            {/* Philosophy */}
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-linear-to-br from-cyan-500/10 via-white/5 to-purple-500/10 p-8 backdrop-blur-xl">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                Philosophy
              </h3>

              <p className="mt-6 text-2xl font-semibold leading-relaxed text-white">
                "Great software isn't measured by the amount of code written.
                It's remembered by how naturally technology disappears behind
                exceptional user experiences."
              </p>
            </div>

            {/* CTA */}
            <button className="group relative inline-flex overflow-hidden rounded-full border border-cyan-400/30 px-8 py-4 text-sm font-bold uppercase tracking-[0.25em] text-white transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(34,211,238,0.45)]">
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-cyan-500 via-sky-500 to-purple-500 transition-transform duration-500 group-hover:translate-x-0" />

              <span className="relative flex items-center gap-3">
                Initiate Transmission
                <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </button>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            {/* Terminal */}
           <TerminalPanel />

            {/* Tech Matrix */}
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;