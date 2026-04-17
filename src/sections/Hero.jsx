import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ThreeBackground from "../compornetns/ThreeBackground";

const Hero = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const scrollToSkills = () => {
        const section = document.getElementById("skills");
        section?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToContact = () => {
        const section = document.getElementById("contact");
        section?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Darker Vignette over ThreeBackground for focus */}
            <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
            
            <div className="absolute inset-0 z-0">
               <ThreeBackground />
            </div>

            {/* Cinematic Glows */}
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
                className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[200px] opacity-70 animate-pulse-glow"
            />
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
                className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[200px] opacity-70 animate-pulse-glow"
                transition={{ delay: 2 }}
            />

            {/* Content Container */}
            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 w-full max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-12"
            >
                {/* Text Side */}
                <div className="flex-1 text-left w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-blue-500" />
                        <span className="text-blue-400 uppercase tracking-[0.3em] text-xs font-bold">
                            Director · Editor · Photographer
                        </span>
                    </motion.div>

                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85]">
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="block text-white"
                        >
                            AYUSH
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="block text-[#1a1a1a] style-stroke relative"
                            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}
                        >
                            GUPTA
                            <motion.span 
                                className="absolute left-0 top-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400 bg-[length:200%_auto] animate-gradient-x"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 2 }}
                                style={{ WebkitTextStroke: "0px" }}
                            >
                                GUPTA
                            </motion.span>
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="mt-6 text-sm md:text-base uppercase tracking-[0.6em] text-zinc-500 font-medium"
                    >
                        Portraitwalagallery
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="mt-10 text-zinc-300 text-lg md:text-2xl leading-relaxed max-w-xl font-light"
                    >
                        Turning moments into cinematic masterpieces. Specializing in high-end video editing and emotive photography.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="mt-12 flex flex-col sm:flex-row gap-6"
                    >
                        <button
                            onClick={scrollToSkills}
                            className="group relative px-10 py-4 rounded-full bg-white text-black font-bold tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                        >
                            <span className="relative z-10 transition-colors group-hover:text-blue-600">Explore Portfolio</span>
                            <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/100 transition-colors duration-300" />
                        </button>
                        
                        <button
                            onClick={scrollToContact}
                            className="px-10 py-4 rounded-full glass text-white font-semibold tracking-wide hover:border-blue-500 transition-all duration-300 hover:scale-105"
                        >
                            Book a Session
                        </button>
                    </motion.div>
                </div>
                
                {/* Visual Side (Optional framing or abstract element, empty here for minimalism focus on text and bg) */}
                <div className="hidden lg:block lg:flex-1 h-full w-full relative">
                     {/* Can add a floating lens or reel graphic here later, but Three.js is already doing the job beautifully */}
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-6 flex items-center gap-4 origin-left -rotate-90 -translate-x-4"
            >
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Scroll Down</span>
                <div className="w-12 h-[1px] bg-gradient-to-r from-blue-500 to-transparent relative">
                    <motion.div 
                        animate={{ x: [0, 48, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    />
                </div>
            </motion.div>

            {/* Gradient Mask for Transition */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />
        </section>
    );
};

export default Hero;