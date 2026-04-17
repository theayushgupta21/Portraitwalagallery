import { motion } from "framer-motion";
import { Briefcase, Video, Camera, Award } from "lucide-react";

const experiences = [
    {
        title: "Lead Video Editor & Storyteller",
        company: "Freelance / Independent",
        period: "2022 - Present",
        icon: Video,
        description: "Executing end-to-end video production, from narrative construction to advanced color grading. Specialized in cinematic travel vlogs, brand storytelling, and high-retention YouTube content. Utilizing Premiere Pro and After Effects to bring flow and emotion to every cut.",
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/30"
    },
    {
        title: "Professional Photographer",
        company: "Portraitwalagallery",
        period: "2018 - Present",
        icon: Camera,
        description: "Over 6 years of expertise in visual discovery. Specializing in portrait, street, event, and wildlife photography. Captured stories across India from the spiritual ghats of Banaras to vibrant festive moments. Mastery in capturing raw, authentic emotion through the lens.",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30"
    },
    {
        title: "Visual Director",
        company: "Creative Collaborations",
        period: "2020 - 2023",
        icon: Briefcase,
        description: "Directed visual campaigns for local brands and artists, coordinating shoots and post-production to match specific brand aesthetics and tonal requirements. Managed teams of assistants and handled on-set styling and lighting setups.",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/30"
    },
    {
        title: "Awarded Content Creator",
        company: "Various Platforms",
        period: "2019 - Present",
        icon: Award,
        description: "Recognized for unique storytelling and aesthetic. Grew 'Portraitwalagallery' into a recognized brand for high-end cinematic visuals. Continuously learning and pushing the boundaries of digital content creation.",
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/30"
    }
];

const Experience = () => {
    return (
        <section id="experience" className="relative py-32 px-6 bg-[#050505] overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] -z-10" />
            <div className="absolute bottom-1/4 -left-64 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px] -z-10" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
                    >
                        Professional
                        <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent mt-2">
                            Journey
                        </span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mt-6 text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto"
                    >
                        Years of dedication tracking the intersection of light, shadow, and narrative.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Center Timeline Line for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent -translate-x-1/2" />

                    <div className="space-y-12 md:space-y-24">
                        {experiences.map((exp, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                    className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}`}
                                >
                                    {/* Timeline dot */}
                                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                        <div className={`w-4 h-4 rounded-full ${exp.bgColor.replace('/10', '')}`} />
                                    </div>

                                    {/* Content Card */}
                                    <div className={`w-full md:w-1/2 p-4 md:p-8 ${isEven ? "md:pl-16" : "md:pr-16"}`}>
                                        <div className={`glass-card p-8 rounded-3xl border ${exp.borderColor} hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden`}>
                                            {/* Subtle dynamic glow */}
                                            <div className={`absolute top-0 right-0 w-32 h-32 ${exp.bgColor} rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                                            
                                            <div className="relative z-10">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className={`p-4 rounded-2xl ${exp.bgColor} ${exp.color} shadow-inner`}>
                                                        <exp.icon className="w-8 h-8" />
                                                    </div>
                                                    <div>
                                                        <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">{exp.period}</span>
                                                        <h3 className="text-2xl font-bold text-white mt-1">{exp.title}</h3>
                                                    </div>
                                                </div>
                                                <h4 className={`text-lg font-medium ${exp.color} mb-4 uppercase tracking-wider text-sm`}>{exp.company}</h4>
                                                <p className="text-zinc-400 font-light leading-relaxed">
                                                    {exp.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
            
            {/* Transition Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
};

export default Experience;
