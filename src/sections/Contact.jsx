import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

/* Same fonts as the rest (add once in index.html <head>):
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

   CONCEPT: the last scene of the film. Left: a call sheet where the client builds a short brief; "Send brief"
   opens their email app with everything filled in (no backend needed). Right: end credits rolling up in 3D,
   with your real links as the credits. The credits pause on hover so the links are easy to click. */

const DISPLAY = { fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' };
const MONO = { fontFamily: '"IBM Plex Mono", ui-monospace, monospace' };
const BODY = { fontFamily: "system-ui, sans-serif" };
const RED = "#ff4b3e";
const EMAIL = "ayushgupta9510@gmail.com";

const socials = [
    { name: "Instagram", handle: "@portraitwalagallery", icon: FaInstagram, href: "https://www.instagram.com/portraitwalagallery" },
    { name: "YouTube", handle: "@ayushgupta-portraitwala", icon: FaYoutube, href: "https://www.youtube.com/@ayushgupta-portraitwala" },
    { name: "LinkedIn", handle: "in/theayushgupta21", icon: FaLinkedin, href: "https://www.linkedin.com/in/theayushgupta21" },
];
const TYPES = ["Portrait shoot", "Event coverage", "Video editing", "Brand film", "Travel film"];
const WHEN = ["As soon as possible", "This month", "In the next 2 to 3 months", "Just exploring"];

const Credits = ({ hidden = false }) => (
    <div aria-hidden={hidden || undefined} className="py-10 text-center space-y-10">
        <div>
            <p className="text-xs text-white/50 mb-2" style={MONO}>Directed, shot and edited by</p>
            <p className="text-3xl font-extrabold tracking-[-0.02em]">Ayush Gupta</p>
        </div>
        {socials.map(({ name, handle, icon: Icon, href }) => (
            <a key={name} href={href} target="_blank" rel="noreferrer" tabIndex={hidden ? -1 : 0} className="block group">
                <Icon className="mx-auto mb-2 text-3xl text-white/70 group-hover:text-[#ff4b3e] transition-colors" aria-hidden />
                <p className="text-xl font-extrabold tracking-[-0.02em]">{name}</p>
                <p className="text-xs text-white/55 group-hover:text-white" style={MONO}>{handle}</p>
            </a>
        ))}
        <a href={`mailto:${EMAIL}`} tabIndex={hidden ? -1 : 0} className="block group">
            <p className="text-xs text-white/50 mb-1" style={MONO}>Email</p>
            <p className="text-lg font-extrabold group-hover:text-[#ff4b3e] transition-colors break-all">{EMAIL}</p>
        </a>
        <div>
            <p className="text-xs text-white/50 mb-1" style={MONO}>Location</p>
            <p className="text-lg font-extrabold">Based in India, available worldwide</p>
        </div>
        <p className="text-xs text-white/40" style={MONO}>Thank you for watching</p>
    </div>
);

const Contact = () => {
    const [types, setTypes] = useState([]);
    const [name, setName] = useState("");
    const [when, setWhen] = useState(WHEN[1]);
    const [msg, setMsg] = useState("");

    const toggle = (t) => setTypes((a) => (a.includes(t) ? a.filter((x) => x !== t) : [...a, t]));
    const subject = `New project: ${types.length ? types.join(", ") : "enquiry"}`;
    const body = `Hi Ayush,\n\nI'm ${name || "[my name]"}.\n\nProject type: ${types.join(", ") || "not sure yet"}\nTimeline: ${when}\n\n${msg || "Here is what I have in mind: "}\n`;
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const field = "w-full bg-[#141416] border border-white/20 px-4 py-3 text-sm outline-none focus:border-[#ff4b3e] transition-colors";

    return (
        <section id="contact" className="relative bg-[#0a0a0b] text-[#f2efe9] px-6 sm:px-12 py-28 overflow-hidden" style={DISPLAY}>
            <style>{`
                @keyframes credits-roll { from { transform: translateY(0); } to { transform: translateY(-50%); } }
                .credits-track { animation: credits-roll 28s linear infinite; }
                .credits-box:hover .credits-track, .credits-box:focus-within .credits-track { animation-play-state: paused; }
                @media (prefers-reduced-motion: reduce) { .credits-track { animation: none; } }
            `}</style>

            <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                    <p className="text-xs text-white/60 mb-2" style={MONO}>Let's work together</p>
                    <h2 className="text-6xl sm:text-8xl font-extrabold tracking-[-0.04em] leading-[0.9]">Start a project</h2>
                    <p className="mt-6 max-w-2xl text-lg text-white/65 leading-relaxed" style={BODY}>
                        Whether it's a cinematic masterpiece, a compelling brand story, or a stunning visual campaign. Connect with me directly and let's craft magic.
                    </p>
                </motion.div>

                <div className="mt-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
                    {/* call sheet */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="border border-white/25 bg-[#101012]">
                        <div className="flex justify-between px-5 py-3 border-b border-white/20 text-[11px] text-white/60" style={MONO}>
                            <span>Call sheet</span><span>Prod. Portraitwalagallery</span>
                        </div>
                        <div className="p-5 sm:p-7 space-y-6">
                            <fieldset>
                                <legend className="text-[11px] text-white/55 mb-2" style={MONO}>What are we making?</legend>
                                <div className="flex flex-wrap gap-2">
                                    {TYPES.map((t) => {
                                        const on = types.includes(t);
                                        return (
                                            <button key={t} type="button" onClick={() => toggle(t)} aria-pressed={on} className="px-4 py-2 text-sm border transition-colors"
                                                style={{ borderColor: on ? RED : "rgba(255,255,255,0.22)", background: on ? "rgba(255,75,62,0.14)" : "transparent" }}>{t}</button>
                                        );
                                    })}
                                </div>
                            </fieldset>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <label className="block"><span className="block text-[11px] text-white/55 mb-2" style={MONO}>Your name</span>
                                    <input value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Name or brand" autoComplete="name" />
                                </label>
                                <label className="block"><span className="block text-[11px] text-white/55 mb-2" style={MONO}>When do you need it?</span>
                                    <select value={when} onChange={(e) => setWhen(e.target.value)} className={field}>{WHEN.map((w) => <option key={w}>{w}</option>)}</select>
                                </label>
                            </div>
                            <label className="block"><span className="block text-[11px] text-white/55 mb-2" style={MONO}>Tell me about it</span>
                                <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} className={`${field} resize-y`} placeholder="Location, mood, references, anything useful" />
                            </label>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <motion.a href={href} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex justify-center px-9 py-4 text-sm font-semibold text-black bg-[#f2efe9]">
                                    Send brief
                                </motion.a>
                                <p className="text-xs text-white/50" style={MONO}>Opens your email app with this brief filled in.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* rolling end credits */}
                    <div className="credits-box relative h-[440px] overflow-hidden" style={{ perspective: 500 }}>
                        <div className="absolute inset-0" style={{ transform: "rotateX(26deg)", transformOrigin: "50% 100%", maskImage: "linear-gradient(transparent 0%, #000 22%, #000 78%, transparent 100%)", WebkitMaskImage: "linear-gradient(transparent 0%, #000 22%, #000 78%, transparent 100%)" }}>
                            <div className="credits-track">
                                <Credits />
                                <Credits hidden />
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-20 text-xs text-white/45 text-center" style={MONO}>Available worldwide · Based in India · That's a wrap</p>
            </div>
        </section>
    );
};

export default Contact;