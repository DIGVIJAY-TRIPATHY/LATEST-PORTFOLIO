import AnimatedText from "./AnimatedText";
import HeroButtons from "./HeroButtons";

export default function HeroContent() {
  return (
    <div>
      <p className="mb-6 inline-flex rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-2 text-xs sm:px-5 sm:text-sm font-medium tracking-wider text-pink-300 backdrop-blur-xl">
        👋 Welcome to my Portfolio
      </p>

      <h1 className="text-4xl font-black leading-none tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        Hi,
        <br />
        I'm
        <span className="block bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent p-1.5 sm:pb-3.5">
          Digvijay
        </span>
        <span className="block">Tripathy</span>
      </h1>

      <div className="mt-6 lg:mt-8">
        <AnimatedText />
      </div>

      <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg lg:mx-0 lg:mt-8 lg:text-xl">
        Passionate Full Stack Developer focused on building beautiful
        interfaces, scalable backend systems and premium digital experiences
        using the MERN stack.
      </p>

      <HeroButtons />
    </div>
  );
}
