// ✅ Correct media imports (relative paths)
import banaras from "../media/banaras.jpg";
import reel1 from "../media/reel1.mp4";
import colorGrading from "../media/color-grading.jpg"; // or rename to color-grading.jpg
import diwali from "../media/diwali.jpg";
import nalayak from "../media/Nalayak_7.mp4";
import eventImg from "../media/event.jpg";
import nature from "../media/nature.mp4";
import travel from "../media/travel.mp4";

const skills = [
    {
        name: "Photography",
        level: "Visual Storytelling",
        type: "image",
        src: banaras,
    },
    {
        name: "Cinematic Video Editing",
        level: "Reels • Films • Events",
        type: "video",
        src: reel1,
    },
    {
        name: "Color Grading",
        level: "Mood & Tone Control",
        type: "image",
        src: colorGrading,
    },
    {
        name: "Color Grading",
        level: "Mood & Tone Control",
        type: "image",
        src: diwali,
    },
    {
        name: "Adobe Premiere Pro",
        level: "Advanced Workflow",
        type: "video",
        src: nalayak,
    },
    {
        name: "YouTube Content",
        level: "Story • Cuts • Flow",
        type: "youtube",
        src: "https://www.youtube.com/embed/bR300XyvfJE",
    },
    {
        name: "Event Coverage",
        level: "Emotion Driven Visuals",
        type: "image",
        src: eventImg,
    },
    {
        name: "Adobe Premiere Pro",
        level: "Advanced Workflow",
        type: "video",
        src: nature,
    },
    {
        name: "Adobe Premiere Pro",
        level: "Advanced Workflow",
        type: "video",
        src: travel,
    },
];

const Skills = () => {
    return (
        <section
            id="skills"
            className="relative py-32 px-6 bg-black overflow-hidden"
        >
            {/* Glow */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[180px]" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
                    Creative
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        {" "}Capabilities
                    </span>
                </h2>

                <p className="text-center text-zinc-400 text-lg max-w-3xl mx-auto mb-20">
                    Skills backed by real visuals — photography, reels, edits, and cinematic storytelling.
                </p>

                {/* Media Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 backdrop-blur hover:border-blue-500/60 transition"
                        >
                            {/* MEDIA */}
                            <div className="relative aspect-video overflow-hidden">
                                {skill.type === "image" && (
                                    <img
                                        src={skill.src}
                                        alt={skill.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                )}

                                {skill.type === "video" && (
                                    <video
                                        src={skill.src}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
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

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>

                            {/* TEXT */}
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-1">
                                    {skill.name}
                                </h3>
                                <p className="text-zinc-400 text-sm">
                                    {skill.level}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
        </section>
    );
};

export default Skills;