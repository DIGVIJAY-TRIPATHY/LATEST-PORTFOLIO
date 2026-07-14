import {
  Terminal,
  Activity,
  Cpu,
  Database,
  Server,
  Atom,
} from "lucide-react";

const status = [
  { label: "Developer", value: "Digvijay" },
  { label: "Role", value: "MERN Stack Developer" },
  { label: "Focus", value: "Scalable Web Applications" },
  { label: "Experience", value: "Frontend • Backend • UI/UX" },
  { label: "Status", value: "OPEN TO WORK" },
];

const metrics = [
  {
    icon: Atom,
    title: "React",
    value: "Interface Engine",
    color: "text-cyan-400",
  },
  {
    icon: Server,
    title: "Express",
    value: "API Layer",
    color: "text-orange-400",
  },
  {
    icon: Database,
    title: "MongoDB",
    value: "Data Cluster",
    color: "text-emerald-400",
  },
  {
    icon: Cpu,
    title: "Node.js",
    value: "Runtime Core",
    color: "text-lime-400",
  },
];

const TerminalPanel = () => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-black/60 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_45px_rgba(34,211,238,0.18)]">
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-purple-500/5" />

      <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <Terminal className="h-5 w-5 text-cyan-400" />

          <span className="font-semibold tracking-wide text-white">
            SYSTEM TERMINAL
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 animate-pulse text-emerald-400" />
          <span className="text-xs font-medium text-emerald-400">
            ONLINE
          </span>
        </div>
      </div>

      <div className="relative space-y-5 p-6 font-mono text-sm">
        {status.map((item) => (
          <div
            key={item.label}
            className="flex gap-4 transition-all duration-300 hover:translate-x-1"
          >
            <span className="text-cyan-400">&gt;</span>

            <div>
              <p className="text-slate-500">{item.label}</p>

              <p className="font-medium text-white">{item.value}</p>
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-slate-500">
            Runtime Modules
          </p>

          <div className="grid grid-cols-2 gap-4">
            {metrics.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/10 bg-white/3 p-3 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/6"
                >
                  <Icon className={`mb-2 h-5 w-5 ${item.color}`} />

                  <h4 className="text-sm font-semibold text-white">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-xs text-slate-400">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-white/10 pt-5">
          <span className="text-cyan-400">$</span>

          <span className="text-white">
            Engineering premium digital experiences...
          </span>

          <span className="h-5 w-0.5 animate-pulse bg-cyan-400" />
        </div>
      </div>
    </div>
  );
};

export default TerminalPanel;
