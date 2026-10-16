import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Video, Camera, Award } from "lucide-react";

/* Same fonts as the Hero and About (add once in index.html <head>):
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

   CONCEPT: every role is a film slate (clapperboard). When it scrolls into view the clapper arm snaps shut
   with a spring, then the slate fills in: Roll = period, Prod. = company, Scene = number. It tilts in 3D
   on hover. The clap is the one memorable moment; everything else stays quiet. */

const DISPLAY = { fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' };
const MONO = { fontFamily: '"IBM Plex Mono", ui-monospace, monospace' };
const BODY = { fontFamily: "system-ui, sans-serif" };
const RED = "#ff4b3e";

const experiences = [
    {
        title: "Lead Video Editor & Storyteller",
        company: "Freelance / Independent",
        period: "2022 - Present",
        icon: Video,
        description: "Executing end-to-end video production, from narrative construction to advanced color grading. Specialized in cinematic travel vlogs, brand storytelling, and high-retention YouTube content. Utilizing Premiere Pro and After Effects to bring flow and emotion to every cut.",
    },
    {
        title: "Professional Photographer",
        company: "Portraitwalagallery",
        period: "2018 - Present",
        icon: Camera,
        description: "Over 6 years of expertise in visual discovery. Specializing in portrait, street, event, and wildlife photography. Captured stories across India from the spiritual ghats of Banaras to vibrant festive moments. Mastery in capturing raw, authentic emotion through the lens.",
    },
    {
        title: "Visual Director",
        company: "Creative Collaborations",
        period: "2020 - 2023",
        icon: Briefcase,
        description: "Directed visual campaigns for local brands and artists, coordinating shoots and post-production to match specific brand aesthetics and tonal requirements. Managed teams of assistants and handled on-set styling and lighting setups.",
    },
    {
        title: "Awarded Content Creator",
        company: "Various Platforms",
        period: "2019 - Present",
        icon: Award,
        description: "Recognized for unique storytelling and aesthetic. Grew 'Portraitwalagallery' into a recognized brand for high-end cinematic visuals. Continuously learning and pushing the boundaries of digital content creation.",
    },
];

// diagonal clapper stripes
const stripes = { background: "repeating-linear-gradient(115deg, #f2efe9 0 28px, #0a0a0b 28px 56px)" };

const Cell = ({ label, children, className = "" }) => (
    <div className={`p-4 border-white/20 ${className}`}>
        <p className="text-[11px] text-white/50 mb-1" style={MONO}>{label}</p>
        {children}
    </div>
);

const Slate = ({ exp, i, total }) => {
    const reduce = useReducedMotion();
    const Icon = exp.icon;
    const n = String(i + 1).padStart(2, "0");
    return (
        <motion.article
            whileHover={reduce ? {} : { rotateX: 5, rotateY: i % 2 ? 4 : -4 }}
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
            style={{ transformPerspective: 1100 }}
            className="relative"
        >
            {/* clapper arm: hinged at the left, snaps shut when scrolled into view */}
            <motion.div
                initial={reduce ? false : { rotate: -22 }}
                whileInView={{ rotate: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ type: "spring", stiffness: 380, damping: 11, delay: 0.15 }}
                style={{ ...stripes, transformOrigin: "0% 100%" }}
                className="h-9 border border-white/30"
                aria-hidden
            />
            <div className="h-9 border-x border-b border-white/30 -mt-px" style={{ ...stripes, backgroundPosition: "28px 0" }} aria-hidden />

            {/* slate body */}
            <motion.div
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="bg-[#141416] border border-white/30 -mt-px"
            >
                <div className="grid grid-cols-3 border-b border-white/20">
                    <Cell label="Roll" className="border-r"><p className="text-sm sm:text-base" style={MONO}>{exp.period}</p></Cell>
                    <Cell label="Prod." className="border-r"><p className="text-sm sm:text-base leading-snug">{exp.company}</p></Cell>
                    <Cell label="Scene"><p className="text-sm sm:text-base" style={MONO}><span style={{ color: RED }}>{n}</span> / {String(total).padStart(2, "0")}</p></Cell>
                </div>
                <div className="p-6 sm:p-8 grid sm:grid-cols-[auto_1fr] gap-5 sm:gap-8">
                    <Icon className="w-10 h-10 text-white/80" aria-hidden />
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] leading-tight">{exp.title}</h3>
                        <p className="mt-3 text-white/65 leading-relaxed max-w-2xl" style={BODY}>{exp.description}</p>
                    </div>
                </div>
            </motion.div>
        </motion.article>
    );
};

const Experience = () => (
    <section id="experience" className="relative bg-[#0a0a0b] text-[#f2efe9] px-6 sm:px-12 py-28" style={DISPLAY}>
        <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <p className="text-xs text-white/60 mb-2" style={MONO}>Production log</p>
                <h2 className="text-5xl sm:text-7xl font-extrabold tracking-[-0.03em] leading-[0.95]">Professional journey</h2>
                <p className="mt-5 max-w-xl text-white/65 leading-relaxed" style={BODY}>
                    Years of dedication at the intersection of light, shadow and narrative. Every role, one scene at a time.
                </p>
            </motion.div>

            <div className="mt-16 space-y-16" style={{ perspective: 1400 }}>
                {experiences.map((exp, i) => <Slate key={exp.title} exp={exp} i={i} total={experiences.length} />)}
            </div>
        </div>
    </section>
);

export default Experience;