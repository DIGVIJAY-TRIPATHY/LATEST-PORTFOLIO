import { motion } from "framer-motion";

import BackgroundEffects from "./BackgroundEffects";
import HeroImage from "./HeroImage";
import HeroContent from "./HeroContent";
import FloatingIcons from "./FloatingIcons";
import HeroStats from "./HeroStats";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-svh overflow-hidden bg-[#050505] text-white lg:min-h-screen"
    >
      <BackgroundEffects />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_65%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col-reverse items-center justify-center gap-16 px-6 pt-28 pb-16 sm:px-8 md:px-12 lg:flex-row lg:justify-between lg:gap-10 lg:px-20 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full text-center lg:w-1/2 lg:text-left"
        >
          <HeroContent />
          <HeroStats />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative flex w-full justify-center lg:w-1/2"
        >
          <HeroImage />
          <FloatingIcons />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
