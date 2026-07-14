import { FaGithub } from "react-icons/fa";
import { Atom, Database, Server, Code2, Cpu } from "lucide-react";

import { motion } from "framer-motion";

const icons = [
  { Icon: Atom, x: -170, y: -120 },
  { Icon: Database, x: 170, y: -90 },
  { Icon: Server, x: 170, y: 120 },
  { Icon: Code2, x: -180, y: 110 },
  { Icon: FaGithub, x: 0, y: -190 },
  { Icon: Cpu, x: 0, y: 190 },
];

export default function FloatingIcons() {
  return (
    <>
      {icons.map(({ Icon, x, y }, index) => (
        <motion.div
          key={index}
          animate={{
            y: [y, y - 15, y],
          }}
          transition={{
            duration: 3 + index,
            repeat: Infinity,
          }}
          style={{
            left: "50%",
            top: "50%",
            marginLeft: x,
            marginTop: y,
          }}
          className="absolute hidden lg:flex flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl"
        >
          <Icon className="h-8 w-8 text-pink-400" />
        </motion.div>
      ))}
    </>
  );
}
