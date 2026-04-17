import { motion } from "framer-motion";
import { useRef } from "react";
// ✅ Cleaned media imports
import banaras from "../media/banaras.jpg";
import reel1 from "../media/reel1.mp4";
import colorGrading from "../media/color-grading.jpg";
import diwali from "../media/diwali.jpg";
import nalayak from "../media/Nalayak_7.mp4";
import eventImg from "../media/event.jpg";
import nature from "../media/nature.mp4";
import travel from "../media/travel.mp4";
import alone from "../media/alone.mp4";
import vrindhavan from "../media/vrindhavan.mp4";
import darshan from "../media/darshan.jpg";
import darshan2 from "../media/darshan2.jpg";
import darshan3 from "../media/darshan3.JPG";

const skills = [
    { name: "Spiritual Frames", level: "Banaras • Spirits • Ghats", type: "image", src: banaras, span: "md:col-span-2 md:row-span-2" },
    { name: "Deep Solitude", level: "Short Film • Narrative", type: "video", src: alone, span: "md:col-span-1 md:row-span-1" },
    { name: "Darshan Raval", level: "Live Performance • On Stage", type: "image", src: darshan, span: "md:col-span-1 md:row-span-2" },
    { name: "Vrindavan Vibes", level: "Cinematic Reel", type: "video", src: vrindhavan, span: "md:col-span-1 md:row-span-2" },
    { name: "Color Science", level: "Post Production Mastery", type: "image", src: colorGrading, span: "md:col-span-1 md:row-span-1" },
    { name: "Art in Motion", level: "Darshan Raval • Studio", type: "image", src: darshan2, span: "md:col-span-2 md:row-span-1" },
    { name: "Cultural Soul", level: "Timeless Traditions", type: "image", src: diwali, span: "md:col-span-1 md:row-span-1" },
    { name: "Wild Spirit", level: "Documentary Short", type: "video", src: nature, span: "md:col-span-1 md:row-span-2" },
    { name: "Acoustic Serenity", level: "Darshan Raval • Candid", type: "image", src: darshan3, span: "md:col-span-1 md:row-span-1" },
    { name: "The Lost Files", level: "Advanced Editing", type: "video", src: nalayak, span: "md:col-span-2 md:row-span-1" },
    { name: "Event Legacy", level: "Emotion Driven", type: "image", src: eventImg, span: "md:col-span-1 md:row-span-1" },
    { name: "Travel Flow", level: "Global Adventures", type: "video", src: travel, span: "md:col-span-2 md:row-span-1" },
];

const Skills = () => {
    const containerRef = useRef(null);

    return (
        <section id="skills" ref={containerRef} className="relative py-32 px-6 bg-[#050505] overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[200px] -z-10 pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[200px] -z-10 pointer-events-none" />

            <div className="relative z-10 max-w-[1500px] mx-auto">
                {/* Header Information */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-blue-500" />
                        <span className="text-blue-400 uppercase tracking-[0.4em] text-xs font-bold">
                            Visual Chronicles
                        </span>
                    </motion.div>
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
                        >
                            Selected
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600">
                                Portfolio
                            </span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="max-w-md pb-4"
                        >
                            <p className="text-zinc-500 font-light text-xl leading-relaxed">
                                A meticulously curated selection of projects where <span className="text-white">light meets narrative</span>. Each frame is a testament to technical precision and evocative storytelling.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* The Modern Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "50px" }}
                            transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            className={`group relative rounded-[2.5rem] overflow-hidden glass-modern glass-modern-hover ${skill.span}`}
                        >
                            {/* Media Background */}
                            <div className="absolute inset-0 z-0">
                                {skill.type === "image" ? (
                                    <img
                                        src={skill.src}
                                        alt={skill.name}
                                        className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110"
                                        loading="lazy"
                                    />
                                ) : (
                                    <video
                                        src={skill.src}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110"
                                    />
                                )}
                                {/* Overlay Shadow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
                            </div>

                            {/* Content Overlays */}
                            <div className="relative h-full w-full z-10 p-8 flex flex-col justify-end">
                                {/* Top Badge */}
                                <div className="absolute top-8 left-8">
                                    <div className="glass px-4 py-1.5 rounded-full border-none backdrop-blur-xl">
                                        <p className="text-[9px] uppercase font-black tracking-[0.25em] text-white/90">
                                            {skill.type}
                                        </p>
                                    </div>
                                </div>

                                {/* Text Info */}
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                                    <p className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {skill.level}
                                    </p>
                                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                                        {skill.name}
                                    </h3>
                                </div>

                                {/* Interactive Hover Border */}
                                <div className="absolute inset-0 border-2 border-blue-500/0 group-hover:border-blue-500/20 rounded-[2.5rem] transition-all duration-700" />
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                {/* Global Showreel CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center"
                >
                    <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent w-full max-w-2xl mb-12" />
                    <p className="text-zinc-600 text-sm uppercase tracking-[0.5em] font-bold">
                        End of Portfolio • New Works Coming Soon
                    </p>
                </motion.div>
            </div>
            
            {/* Bottom Blur Transition */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
        </section>
    );
};

export default Skills;
