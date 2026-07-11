import heroImg from "../../assets/DIG.jpeg";
import { motion } from "framer-motion";

export default function HeroImage() {
  return (
    <div className="relative flex items-center justify-center">

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[420px] lg:w-[420px] rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 blur-xl opacity-60"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-[350px] lg:w-[350px] rounded-full border border-white/10"
      />

      <motion.div
        animate={{
          y: [0, -18, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div className="rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 p-[5px] shadow-[0_0_120px_rgba(236,72,153,.4)]">

          <div className="rounded-full bg-[#050505] p-2">

            <img
              src={heroImg}
              alt="Digvijay"
              className="h-56 w-56 rounded-full object-cover sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-[320px] xl:w-[320px]"
            />

          </div>

        </div>
      </motion.div>

    </div>
  );
}