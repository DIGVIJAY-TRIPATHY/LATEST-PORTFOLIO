import { motion } from "framer-motion";
import { Mouse, ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div
      animate={{
        y: [0, 12, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
      }}
      className="absolute bottom-10 left-1/2   lg:flex flex -translate-x-1/2 flex-col items-center"
    >
      <Mouse className="h-8 w-8 text-white/60" />

      <ChevronDown className="mt-2 h-5 w-5 text-pink-400" />

      <span className="mt-2 text-xs uppercase tracking-[0.35em] text-white/40">
        Scroll
      </span>
    </motion.div>
  );
}
