import TerminalPanel from "./Terminal.jsx";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { SiReact, SiMongodb, SiExpress, SiNodedotjs } from "react-icons/si";

const About = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 1;
      });
    }, 15);

    return () => clearInterval(timer);
  }, []);
  return (
    <section id="about" className="relative overflow-hidden bg-black py-28">
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
                Great products aren't defined by code alone—they're shaped by
                <span className="font-semibold text-cyan-300">
                  {" "}
                  meaningful experiences
                </span>
                .
              </p>

              <p className="mt-8 text-lg leading-9 text-slate-400">
                I'm <span className="font-bold text-white">Digvijay</span>, a
                MERN Stack Developer passionate about building fast, scalable,
                and visually refined web applications with React, Node.js,
                Express, and MongoDB.
              </p>

              <p className="mt-8 text-lg leading-9 text-slate-400">
                I believe clean architecture, thoughtful design, and performance
                should work together to create products that people genuinely
                enjoy using.
              </p>
            </div>

            <div className="relative flex items-center justify-center">
              {/* Glow */}
              <div className="absolute h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />

              <div className="relative h-60 w-60">
                {/* Rotating Ring */}
                <div
                  className="absolute inset-0 animate-[spin_25s_linear_infinite]"
                  style={{
                    background:
                      "conic-gradient(#22d3ee 0deg 90deg,#8b5cf6 90deg 180deg,#3b82f6 180deg 270deg,#14b8a6 270deg 360deg)",
                    borderRadius: "9999px",
                    WebkitMask:
                      "radial-gradient(farthest-side,transparent calc(100% - 16px),#000 calc(100% - 15px))",
                    mask: "radial-gradient(farthest-side,transparent calc(100% - 16px),#000 calc(100% - 15px))",
                  }}
                />

                {/* Inner Glass Circle */}

                <div className="absolute inset-4.5 rounded-full border border-white/10 bg-slate-900/80 backdrop-blur-xl flex flex-col items-center justify-center">
                  <h2 className="text-5xl font-black text-white">
                    {progress}%
                  </h2>

                  <p className="mt-2 text-xs tracking-[0.4em] uppercase text-cyan-300">
                    MERN CORE
                  </p>
                </div>

                {/* React */}

                <div className="group absolute left-1/2 top-0 -translate-x-1/2">
                  <div className="rounded-full border border-cyan-400/30 bg-slate-900/70 p-3 transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_#22d3ee]">
                    <SiReact className="text-2xl text-cyan-400" />
                  </div>
                </div>

                {/* Mongo */}

                <div className="group absolute left-0 top-1/2 -translate-y-1/2">
                  <div className="rounded-full border border-emerald-400/30 bg-slate-900/70 p-3 transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_#22c55e]">
                    <SiMongodb className="text-2xl text-emerald-400" />
                  </div>
                </div>

                {/* Node */}

                <div className="group absolute right-0 top-1/2 -translate-y-1/2">
                  <div className="rounded-full border border-lime-400/30 bg-slate-900/70 p-3 transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_#84cc16]">
                    <SiNodedotjs className="text-2xl text-lime-400" />
                  </div>
                </div>

                {/* Express */}

                <div className="group absolute bottom-0 left-1/2 -translate-x-1/2">
                  <div className="rounded-full border border-purple-400/30 bg-slate-900/70 p-3 transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_#a855f7]">
                    <SiExpress className="text-2xl text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            {/* Terminal */}
            <TerminalPanel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
