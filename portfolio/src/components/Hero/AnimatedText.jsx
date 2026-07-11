import { TypeAnimation } from "react-type-animation";

export default function AnimatedText() {
  return (
    <TypeAnimation
      sequence={[
        "Full Stack Developer",
        1800,

        "MERN Stack Developer",
        1800,

        "React Specialist",
        1800,

        "Backend Engineer",
        1800,

        "Problem Solver",
        1800,
      ]}
      wrapper="span"
      speed={45}
      repeat={Infinity}
      className="bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-xl sm:text-2xl md:text-3xl font-semibold text-transparent"
    />
  );
}