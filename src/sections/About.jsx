import { Camera, Video, Film, MapPin, Feather } from "lucide-react";
import { motion } from "framer-motion";
import ThreeBackground from "../compornetns/ThreeBackground";

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <section className="relative py-32 px-6 bg-[#050505] overflow-hidden">
            <div className="absolute inset-0 z-0">
               <ThreeBackground />
            </div>

            {/* Glow */}
            <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[200px] pointer-events-none" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-10 max-w-6xl mx-auto"
            >
                {/* Heading */}
                <motion.div variants={itemVariants} className="text-center mb-8">
                    <p className="text-blue-500 uppercase tracking-[0.4em] text-xs font-bold mb-4">Behind the Lens</p>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter lead-none">
                        The Visual
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-gradient-x mt-[-10px]">
                            Architect
                        </span>
                    </h2>
                </motion.div>

                {/* Intro */}
                <motion.p variants={itemVariants} className="text-center text-zinc-400 text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed mb-24 font-light border-l-2 border-blue-500 pl-6 md:border-none md:pl-0">
                    I am <span className="text-white font-semibold uppercase tracking-wider">Ayush Gupta</span> — the creative force behind <span className="text-blue-400 font-semibold uppercase tracking-[0.2em]">Portraitwala</span>. 
                    With a profound obsession for cinematic aesthetics, I mold light, color, and narrative to craft visuals that don't just speak, but echo.
                </motion.p>

                {/* Experience Cards */}
                <div className="grid sm:grid-cols-2 gap-8 mb-32">
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        className="group relative p-10 md:p-12 rounded-3xl glass-card overflow-hidden"
                    >
                        <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
                            <Camera className="w-[300px] h-[300px] text-white" />
                        </div>
                        <Camera className="w-12 h-12 text-blue-500 mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:text-white" />
                        <h3 className="text-4xl font-black mb-2 text-white style-stroke">Photography</h3>
                        <p className="text-blue-400 font-medium mb-6 uppercase tracking-widest text-xs">
                            6+ Years of Visual Discovery
                        </p>
                        <p className="text-zinc-400 leading-relaxed font-light text-lg">
                            Mastering the stillness of a moment. From the raw energy of street photography in Banaras to timeless portraiture and evocative wildlife shots.
                        </p>
                        <div className="mt-8 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-700 ease-in-out" />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        className="group relative p-10 md:p-12 rounded-3xl glass-card overflow-hidden"
                    >
                        <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
                            <Video className="w-[300px] h-[300px] text-white" />
                        </div>
                        <Video className="w-12 h-12 text-purple-500 mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:text-white" />
                        <h3 className="text-4xl font-black mb-2 text-white style-stroke">Video Editing</h3>
                        <p className="text-purple-400 font-medium mb-6 uppercase tracking-widest text-xs">
                            Master of the Timeline
                        </p>
                        <p className="text-zinc-400 leading-relaxed font-light text-lg">
                            Weaving narratives through deliberate cuts and advanced color grading. Expertise in Premiere Pro & After Effects to create high-retention cinematic experiences.
                        </p>
                        <div className="mt-8 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-700 ease-in-out" />
                    </motion.div>
                </div>

                {/* Specializations */}
                <div className="max-w-5xl mx-auto">
                    <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-16">
                         <div className="h-[1px] w-12 bg-zinc-700" />
                         <span className="text-sm font-medium text-zinc-500 uppercase tracking-[0.4em]">
                             Core Expertise
                         </span>
                         <div className="h-[1px] w-12 bg-zinc-700" />
                    </motion.div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            { icon: Film, text: "Cinematic Flow", color: "text-blue-500", desc: "Rhythm & pacing mastery" },
                            { icon: MapPin, text: "Travel Logs", color: "text-purple-500", desc: "Global storytelling" },
                            { icon: Feather, text: "Color Grading", color: "text-emerald-500", desc: "Advanced tonal control" }
                        ].map((spec, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                className="p-8 rounded-2xl glass border-zinc-800/50 hover:border-blue-500/30 flex flex-col items-center text-center gap-4 group transition-all duration-300"
                            >
                                <spec.icon className={`w-10 h-10 ${spec.color} group-hover:scale-110 transition-transform duration-300`} />
                                <div>
                                    <h4 className="text-white font-bold tracking-wide text-lg mb-1">{spec.text}</h4>
                                    <p className="text-zinc-500 text-sm font-light">{spec.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Transition Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />
        </section>
    );
};

export default About;