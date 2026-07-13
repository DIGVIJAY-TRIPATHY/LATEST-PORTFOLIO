import { motion } from "framer-motion";

const stats = [
  {
    value: "15+",
    label: "Projects",
  },
  {
    value: "10+",
    label: "Technologies",
  },
  {
    value: "100%",
    label: "Responsive",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 lg:mt-16">

      {stats.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8 + index * 0.2,
          }}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="rounded-3xl border border-white/10 bg-white/5 p-5 lg:p-6 backdrop-blur-xl transition-all"
        >
          <h2 className="bg-linear-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-2xl lg:text-3xl font-black text-transparent">
            {item.value}
          </h2>

          <p className="mt-2 text-gray-400">
            {item.label}
          </p>
        </motion.div>
      ))}

    </div>
  );
}