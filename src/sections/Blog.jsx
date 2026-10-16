import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
// Your own photographs (same files as the portfolio)
import banaras from "../media/banaras.jpg";
import diwali from "../media/diwali.jpg";
import darshan from "../media/darshan.jpg";
import darshan3 from "../media/darshan3.JPG";
import colorGrading from "../media/color-grading.jpg";
import eventImg from "../media/event.jpg";

/* Same fonts as the rest (add once in index.html <head>):
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

   CONCEPT: the darkroom. Each story is a print pinned to a line. As it scrolls into view the print DEVELOPS
   (dark, blurred and red-lit under the safelight, then slowly turning into the real photograph). Click a print
   to read the story behind it: your perspective, how it was shot, and one note to self.

   !! The stories, dates and camera details below are placeholders written to match your work. Replace them with
   your own words and real gear. Add a story by copying one object in STORIES. */

const DISPLAY = { fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' };
const MONO = { fontFamily: '"IBM Plex Mono", ui-monospace, monospace' };
const READ = { fontFamily: 'Georgia, "Times New Roman", serif' };
const RED = "#ff4b3e";

const STORIES = [
    {
        id: "ghats", tag: "Street", min: 5, date: "Jan 2026", img: banaras, title: "What the ghats taught me about waiting",
        place: "Banaras", cam: "Sony A7 III", lens: "35mm", set: "f/4 · 1/250 · ISO 200",
        excerpt: "I came for the sunrise and stayed for the ten minutes after it.",
        body: [
            "I arrived at the ghats before the light did, and for the first hour I took nothing worth keeping. Everyone shoots the sunrise. The better frames came later, when the crowd thinned and people went back to their ordinary mornings.",
            "Banaras does not perform for a camera. A man washing his hands, a priest folding cloth: nobody is posing. My job is to stand still long enough that I become part of the scenery and the moment forgets I am there.",
        ],
        quote: "The sunrise is for everyone. The ten minutes after it are for the patient.",
        note: "Stay one hour longer than feels reasonable. The frame you came for is rarely the frame you leave with.",
    },
    {
        id: "diwali", tag: "Culture", min: 4, date: "Nov 2025", img: diwali, title: "Light in the festival of light",
        place: "Home town", cam: "Sony A7 III", lens: "50mm", set: "f/1.8 · 1/125 · ISO 800",
        excerpt: "When every diya is a light source, the real subject is the dark between them.",
        body: [
            "Festival nights tempt you to expose for the brightest thing in the frame. I do the opposite: I protect the shadows, let the flames burn a little hot, and keep the faces warm and readable.",
            "A photograph of Diwali should feel like standing there, not like a postcard. That means grain, warmth and some blur, because that is how the night actually looks to me.",
        ],
        quote: "Do not photograph the light. Photograph what the light touches.",
        note: "Underexpose by a stop on festival nights. You can lift shadows, but you cannot rescue burnt flames.",
    },
    {
        id: "stage", tag: "Live", min: 6, date: "Sep 2025", img: darshan, title: "Photographing a performer, not a performance",
        place: "On stage", cam: "Sony A7 III", lens: "70-200mm", set: "f/2.8 · 1/500 · ISO 3200",
        excerpt: "The best live frame is the half second between two songs.",
        body: [
            "On stage the light is chaotic and the artist never stops moving. I stopped chasing the big moments and started watching the small ones: a breath before a high note, a glance at the crowd, a hand on the mic.",
            "Colour changes every second, so I shoot for expression first and fix the tone later. A sharp face under strange light beats a perfect exposure of an empty gesture.",
        ],
        quote: "Everyone shoots the song. I wait for the silence around it.",
        note: "Learn the set list. Knowing the next song is the closest thing to seeing the future.",
    },
    {
        id: "backstage", tag: "Candid", min: 4, date: "Sep 2025", img: darshan3, title: "The quiet backstage",
        place: "Studio", cam: "Sony A7 III", lens: "85mm", set: "f/1.8 · 1/200 · ISO 400",
        excerpt: "Fame looks different with the sound turned off.",
        body: [
            "After the loud part, there is a quiet part nobody sees. A performer tuning a guitar, deciding nothing, simply being tired. That is where I put the camera down and talk, and then pick it up again.",
            "I use longer lenses and stay at a polite distance. People forget a distant camera. They never forget a close one.",
        ],
        quote: "A candid is not a hidden camera. It is trust, given slowly.",
        note: "Talk first, shoot later. The first ten minutes are never about the photograph.",
    },
    {
        id: "grade", tag: "Craft", min: 7, date: "Aug 2025", img: colorGrading, title: "Why I grade the way I remember",
        place: "Edit suite", cam: "DaVinci Resolve", lens: "Colour wheels", set: "Warm shadows · soft contrast",
        excerpt: "Accurate colour is easy. Honest colour is a decision.",
        body: [
            "Memory does not store colour accurately. It stores mood. When I grade, I am not matching the scene, I am matching how that day felt: warmer shadows for a nostalgic afternoon, cooler highlights for a restless night.",
            "I keep a simple rule: skin stays believable, everything else is allowed to feel. If a viewer notices the grade before the subject, I have gone too far.",
        ],
        quote: "Grade for how it felt, not how it measured.",
        note: "Fix skin first. Every creative choice after that is forgiven when the faces look alive.",
    },
    {
        id: "events", tag: "Events", min: 5, date: "Jun 2025", img: eventImg, title: "Events are people, not schedules",
        place: "On location", cam: "Sony A7 III", lens: "24-70mm", set: "f/2.8 · 1/160 · ISO 1600",
        excerpt: "The shot list gets the ceremony. The people give you the story.",
        body: [
            "I always begin with the shot list because clients deserve it. Then I put it away and watch the edges of the room, where relatives hug, children get bored and elders quietly cry.",
            "Those frames are never on any list, and they are the ones people frame later. An event is a few hours; the photographs have to last decades.",
        ],
        quote: "Cover the event. Keep the people.",
        note: "Shoot the first 30 minutes for the client and the rest for the family.",
    },
];

/* small version of the Portraitwalagallery watermark */
const Mark = ({ className = "" }) => (
    <span aria-hidden className={`pointer-events-none absolute flex items-center gap-1.5 text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] ${className}`}>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9.5" /><circle cx="12" cy="12" r="3.2" /><path d="M12 2.5v6.3M21.5 12h-6.3M12 21.5v-6.3M2.5 12h6.3" /></svg>
        <span className="text-[10px] font-semibold tracking-tight" style={DISPLAY}>Portraitwalagallery</span>
    </span>
);

/* one print on the line: swings gently, develops when it scrolls into view */
const Print = ({ s, i, onOpen, reduce }) => (
    <motion.li
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: (i % 3) * 0.12 }}
        className="relative list-none"
    >
        {/* string */}
        <span className="absolute -top-7 -left-4 -right-4 h-px bg-white/25" aria-hidden />
        <motion.div
            animate={reduce ? {} : { rotate: [-0.9, 0.9, -0.9] }}
            transition={{ duration: 6 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            whileHover={reduce ? {} : { y: 6 }}
            style={{ transformOrigin: "50% -28px" }}
        >
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 w-3 h-9 bg-[#c9b79c] z-10 shadow-md" aria-hidden />
            <button onClick={() => onOpen(i)} aria-label={`Read: ${s.title}`} className="group block w-full text-left bg-[#f2efe9] text-[#0a0a0b] p-2.5 pb-4 shadow-[0_30px_60px_rgba(0,0,0,0.55)]">
                <div className="relative aspect-[4/5] overflow-hidden bg-black">
                    {/* the print develops: dark, blurred, red-lit, then the real photo */}
                    <motion.img
                        src={s.img} alt={s.title} loading="lazy" draggable={false}
                        initial={reduce ? false : { filter: "brightness(0.12) contrast(1.6) grayscale(1) blur(10px)" }}
                        whileInView={{ filter: "brightness(1) contrast(1) grayscale(0) blur(0px)" }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 2.6, delay: 0.3 + (i % 3) * 0.15, ease: "easeOut" }}
                        className="w-full h-full object-cover transition-transform duration-[1.6s] group-hover:scale-105"
                    />
                    <motion.span
                        initial={reduce ? false : { opacity: 0.55 }}
                        whileInView={{ opacity: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 2.6, delay: 0.3 + (i % 3) * 0.15 }}
                        className="absolute inset-0 pointer-events-none" style={{ background: RED, mixBlendMode: "multiply" }} aria-hidden
                    />
                    <Mark className="right-2 bottom-2" />
                </div>
                <div className="pt-4 px-1">
                    <p className="text-[11px] text-[#0a0a0b]/60" style={MONO}>{s.tag} · {s.min} min read</p>
                    <h3 className="mt-1 text-xl font-extrabold tracking-[-0.02em] leading-tight">{s.title}</h3>
                    <p className="mt-2 text-sm text-[#0a0a0b]/70 leading-snug" style={{ fontFamily: "system-ui, sans-serif" }}>{s.excerpt}</p>
                </div>
            </button>
        </motion.div>
    </motion.li>
);

const Reader = ({ i, setI }) => {
    const s = STORIES[i];
    const go = (d) => setI((i + d + STORIES.length) % STORIES.length);
    useEffect(() => {
        const k = (e) => {
            if (e.key === "Escape") setI(null);
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
        };
        window.addEventListener("keydown", k);
        return () => window.removeEventListener("keydown", k);
    }, [i]);

    return (
        <motion.div role="dialog" aria-modal="true" aria-label={s.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-[#0a0a0b] text-[#f2efe9] overflow-y-auto" style={DISPLAY}>
            <button onClick={() => setI(null)} aria-label="Close story" className="fixed top-4 right-5 z-10 text-3xl text-white/80 hover:text-white">×</button>
            <article key={s.id} className="max-w-6xl mx-auto px-6 sm:px-12 py-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16">
                {/* photograph + how it was shot */}
                <div className="lg:sticky lg:top-20 self-start">
                    <div className="relative bg-[#f2efe9] p-2.5">
                        <img src={s.img} alt={s.title} draggable={false} className="w-full max-h-[70vh] object-cover" />
                        <Mark className="right-5 bottom-5" />
                    </div>
                    <dl className="mt-5 grid grid-cols-2 gap-px bg-white/15 text-sm">
                        {[["Place", s.place], ["Camera", s.cam], ["Lens", s.lens], ["Settings", s.set]].map(([k, v]) => (
                            <div key={k} className="bg-[#0a0a0b] p-3">
                                <dt className="text-[11px] text-white/50" style={MONO}>{k}</dt>
                                <dd className="mt-0.5">{v}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* the story */}
                <div>
                    <p className="text-xs text-white/60" style={MONO}>{s.tag} · {s.min} min read · {s.date}</p>
                    <h2 className="mt-3 text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] leading-[0.98]">{s.title}</h2>
                    <p className="mt-6 text-2xl text-white/75 leading-snug" style={READ}>{s.excerpt}</p>
                    <div className="mt-8 space-y-6 text-lg sm:text-xl leading-[1.8] text-white/80 max-w-xl" style={READ}>
                        <p>{s.body[0]}</p>
                        <blockquote className="my-10 pl-6 border-l-2 text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] leading-[1.1]" style={{ ...DISPLAY, borderColor: RED }}>{s.quote}</blockquote>
                        <p>{s.body[1]}</p>
                    </div>
                    <div className="mt-10 p-5 border border-white/20 max-w-xl">
                        <p className="text-[11px] text-white/50 mb-1" style={MONO}>Note to self</p>
                        <p className="text-lg" style={READ}>{s.note}</p>
                    </div>
                    <div className="mt-12 flex gap-3 text-sm" style={MONO}>
                        <button onClick={() => go(-1)} className="px-5 py-3 border border-white/30 hover:border-[#ff4b3e] transition-colors">Previous story</button>
                        <button onClick={() => go(1)} className="px-5 py-3 border border-white/30 hover:border-[#ff4b3e] transition-colors">Next story</button>
                    </div>
                </div>
            </article>
        </motion.div>
    );
};

const Blog = () => {
    const reduce = useReducedMotion();
    const [open, setOpen] = useState(null);

    return (
        <section id="stories" className="relative bg-[#0a0a0b] text-[#f2efe9] px-6 sm:px-12 py-28 overflow-hidden" style={DISPLAY}>
            {/* safelight glow */}
            <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,75,62,0.14), transparent 70%)" }} aria-hidden />

            <div className="relative max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                    <p className="text-xs text-white/60 mb-2" style={MONO}>Stories from the darkroom</p>
                    <h2 className="text-5xl sm:text-7xl font-extrabold tracking-[-0.03em] leading-[0.95]">Behind the frames</h2>
                    <p className="mt-5 max-w-xl text-white/65 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                        Why I shot them, what I saw, and what I would do again. My way of looking at a photograph, one print at a time.
                    </p>
                </motion.div>

                <ul className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 p-0" style={{ perspective: 1200 }}>
                    {STORIES.map((s, i) => <Print key={s.id} s={s} i={i} onOpen={setOpen} reduce={reduce} />)}
                </ul>
            </div>

            <AnimatePresence>{open !== null && <Reader i={open} setI={setOpen} />}</AnimatePresence>
        </section>
    );
};

export default Blog;