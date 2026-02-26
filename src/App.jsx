import About from "./sections/About";
import Hero from "./sections/Hero";
import Contact from "./sections/contact";
import Footer from "./sections/Footer";
import Skills from "./sections/Skills";

function App() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Hero />
      <About />
      <Skills />
      <Contact />
      <Footer />

    </div>
  );
}

export default App;