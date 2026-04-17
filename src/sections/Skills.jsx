import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
// ✅ Correct media imports (relative paths)
import banaras from "../media/banaras.jpg";
import reel1 from "../media/reel1.mp4";
import colorGrading from "../media/color-grading.jpg";
import diwali from "../media/diwali.jpg";
import nalayak from "../media/Nalayak_7.mp4";
import eventImg from "../media/event.jpg";
import nature from "../media/nature.mp4";
import travel from "../media/travel.mp4";

const skills = [
    { name: "Photography", level: "Visual Storytelling", type: "image", src: banaras, span: "col-span-1 md:col-span-2 row-span-2" },
    { name: "Cinematic Video Editing", level: "Reels • Films • Events", type: "video", src: reel1, span: "col-span-1" },
    { name: "Color Grading", level: "Mood & Tone Control", type: "image", src: colorGrading, span: "col-span-1" },
    { name: "Cultural Moments", level: "Timeless Traditions", type: "image", src: diwali, span: "col-span-1 md:col-span-2" },
    { name: "Advanced Post-Production", level: "Seamless Workflows", type: "video", src: nalayak, span: "col-span-1" },
    { name: "Event Coverage", level: "Emotion Driven Visuals", type: "image", src: eventImg, span: "col-span-1 md:col-span-2" },
    { name: "Nature & Wildlife", level: "Pure Perspective", type: "video", src: nature, span: "col-span-1 md:col-span-1" },
    { name: "Travel Narratives", level: "Global Adventures", type: "video", src: travel, span: "col-span-1 md:col-span-3 row-span-2" },
    { name: "YouTube Content", level: "Story • Cuts • Flow", type: "youtube", src: "https://www.youtube.com/embed/bR300XyvfJE", span: "col-span-1 md:col-span-3 h-[60vh]" }
];

const Skills = () => {
    const containerRef = useRef(null);
    return (
        <section id="skills" ref={containerRef} className="relative py-32 px-6 bg-[#050505] overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[200px] -z-10 pointer-events-none" />

            <div className="relative z-10 max-w-[1400px] mx-auto">
                {/* Heading */}
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <div className="h-[1px] w-12 bg-blue-500" />
                            <span className="text-blue-400 uppercase tracking-[0.3em] text-xs font-bold">
                                Selected Works
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
                        >
                            Creative
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">
                                Portfolio
                            </span>
                        </motion.h2>
                    </div>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-400 max-w-sm font-light text-lg"
                    >
                        A showcase of technical precision and artistic vision across multiple mediums, blending visual storytelling with motion logic.
                    </motion.p>
                </div>

                {/* Cinematic Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px]">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "100px" }}
                            transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                            className={`group relative rounded-2xl overflow-hidden glass-card border-none ${skill.span}`}
                        >
                            {/* MEDIA CONTAINER */}
                            <div className="relative w-full h-full">
                                {skill.type === "image" && (
                                    <motion.img
                                        src={skill.src}
                                        alt={skill.name}
                                        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                        loading="lazy"
                                    />
                                )}

                                {skill.type === "video" && (
                                    <video
                                        src={skill.src}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                    />
                                )}

                                {skill.type === "youtube" && (
                                    <iframe
                                        src={skill.src}
                                        title={skill.name}
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                )}

                                {/* Overlay Gradient */}
                                {skill.type !== "youtube" && (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                                        
                                        {/* Floating Badge */}
                                        <div className="absolute top-6 left-6 glass px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-y-2 group-hover:translate-y-0 backdrop-blur-md">
                                            {skill.type}
                                        </div>

                                        {/* TEXT CONTENT */}
                                        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            <h3 className="text-3xl font-black mb-2 text-white style-stroke z-10 relative">
                                                {skill.name}
                                            </h3>
                                            <p className="text-blue-400 text-sm font-medium tracking-[0.2em] relative z-10 uppercase">
                                                {skill.level}
                                            </p>

                                            {/* Aesthetic Line */}
                                            <div className="mt-6 h-[1px] w-0 bg-zinc-400 group-hover:w-full transition-all duration-700 delay-100 ease-in-out" />
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Transition */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
        </section>
    );
};

export default Skills;