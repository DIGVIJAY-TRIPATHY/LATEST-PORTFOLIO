import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -60, 80, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-52 top-0 h-72 w-72 sm:h-80 sm:w-80 lg:h-[500px] lg:w-[500px] rounded-full bg-pink-600/25 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -100, 80, 0],
          y: [0, 100, -60, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-40 h-72 w-72 sm:h-80 sm:w-80 lg:h-[450px] lg:w-[450px] rounded-full bg-violet-600/20 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, 70, -70, 0],
          y: [0, -70, 70, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 left-1/2 h-64 w-64 sm:h-72 sm:w-72 lg:h-[380px] lg:w-[380px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[140px]"
      />

      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <h1
        className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        hidden xl:block text-[14rem]
        font-black
        tracking-tight
        text-white/[0.03]
        select-none
        whitespace-nowrap
      "
      >
        DEVELOPER
      </h1>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
    </>
  );
}
