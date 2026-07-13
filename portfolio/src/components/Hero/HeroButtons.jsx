import resume from "../../assets/DIGVIJAY-CV.pdf";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroButtons() {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:justify-center lg:justify-start">

      <motion.a
        href="#projects"
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-full sm:w-auto overflow-hidden rounded-2xl bg-linear-to-r from-pink-500 via-violet-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-[0_15px_60px_rgba(168,85,247,0.45)] transition-all"
      >
        <span className="relative z-10 flex items-center gap-3">
          View Projects
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
        </span>

        <span className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-500 group-hover:translate-y-0" />
      </motion.a>

      <motion.a
        href={resume}
        download
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="group flex w-full sm:w-auto items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all hover:border-violet-400/50 hover:bg-white/10"
      >
        <Download className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
        Resume
      </motion.a>

    </div>
  );
}