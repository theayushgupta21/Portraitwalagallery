import { motion, useMotionValue, useSpring } from "framer-motion";
import About from "./sections/About";
import Hero from "./sections/Hero";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Blog from "./sections/Blog";
import { useEffect } from "react";

function App() {
  // Cursor position lives in motion values, not React state, so moving the mouse
  // does not re-render the whole page (important for the Skills wall and the Hero).
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const ringX = useSpring(mx, { damping: 30, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(my, { damping: 30, stiffness: 200, mass: 0.5 });
  const dotX = useSpring(mx, { damping: 20, stiffness: 300, mass: 0.2 });
  const dotY = useSpring(my, { damping: 20, stiffness: 300, mass: 0.2 });

  useEffect(() => {
    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="bg-[#0a0a0b] text-[#f2efe9] overflow-x-hidden selection:bg-[#ff4b3e]/30">
      {/* Cinematic Grain */}
      <div className="grain-overlay" />

      {/* Custom Cursor (ring + dot), recoloured to the site's red accent */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-[#ff4b3e] pointer-events-none z-[10000] hidden md:block"
        style={{ x: ringX, y: ringY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-[#f2efe9] rounded-full pointer-events-none z-[10000] hidden md:block"
        style={{ x: dotX, y: dotY }}
      />

      <Hero />
      <About />
      <Experience />
      <Blog />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;