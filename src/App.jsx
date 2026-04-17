import { motion } from "framer-motion";
import About from "./sections/About";
import Hero from "./sections/Hero";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import { useEffect, useState } from "react";

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden selection:bg-blue-500/30">
      {/* Cinematic Grain */}
      <div className="grain-overlay" />

      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-500 pointer-events-none z-[10000] hidden md:block"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] hidden md:block"
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.2 }}
      />

      <Hero />
      <About />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;