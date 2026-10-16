import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Camera, Video, Film, MapPin, Feather } from "lucide-react";

/* Same fonts as the Hero (add once in index.html <head>):
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

   CONCEPT: About is a working After Effects window. Five layers live in a 3D composition; clicking a
   layer flies the camera to it. The Effect Controls panel has real scrubbable numbers (drag them like in
   AE), a colour-grade panel that regrades the whole scene, and easing presets that change how the camera
   move feels. Visitors literally try your craft instead of reading about it. */

const DISPLAY = { fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' };
const MONO = { fontFamily: '"IBM Plex Mono", ui-monospace, monospace' };
const BODY = { fontFamily: "system-ui, sans-serif" };
const RED = "#ff4b3e";

const LAYERS = [
    { name: "Photography", icon: Camera, label: "#e7b66a", sub: "6+ years of visual discovery", text: "Mastering the stillness of a moment. From the raw energy of street photography in Banaras to timeless portraiture and evocative wildlife shots." },
    { name: "Video editing", icon: Video, label: "#4fb3b8", sub: "Master of the timeline", text: "Weaving narratives through deliberate cuts and advanced color grading. Expertise in Premiere Pro and After Effects to create high-retention cinematic experiences." },
    { name: "Cinematic flow", icon: Film, label: "#c48bd6", sub: "Rhythm and pacing mastery", text: "Every cut has a beat. Try the easing presets on the right and feel how the camera move changes." },
    { name: "Travel logs", icon: MapPin, label: "#8fd18a", sub: "Global storytelling", text: "From the ghats of Banaras to the mountains, places told through light, texture and patience." },
    { name: "Color grading", icon: Feather, label: "#ff8a70", sub: "Advanced tonal control", text: "Tone sets the mood. Drag Temperature, Contrast and Saturation on the right and regrade this whole scene." },
];
const EASES = { Linear: "linear", Ease: [0.4, 0, 0.2, 1], Cinematic: [0.16, 1, 0.3, 1] };
const DEF = { x: 0, y: 0, s: 100, r: 0, o: 100 };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* AE-style scrubbable number: drag left/right (hold Shift for fine control), or use arrow keys */
const Scrub = ({ label, value, set, min, max, step = 1, unit = "" }) => {
    const drag = useRef(null);
    const put = (v) => set(Math.round(clamp(v, min, max) / step) * step);
    return (
        <div className="flex items-center justify-between py-1.5 text-xs">
            <span className="text-white/60">{label}</span>
            <span
                role="slider" tabIndex={0} aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
                onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); drag.current = { x: e.clientX, v: value }; }}
                onPointerMove={(e) => drag.current && put(drag.current.v + (e.clientX - drag.current.x) * step * (e.shiftKey ? 0.1 : 1))}
                onPointerUp={() => (drag.current = null)}
                onKeyDown={(e) => { if (e.key === "ArrowRight") put(value + step * 5); if (e.key === "ArrowLeft") put(value - step * 5); }}
                className="cursor-ew-resize touch-none select-none px-1 tabular-nums underline decoration-dotted underline-offset-4 hover:text-[#ff4b3e]"
                style={MONO}
            >{value}{unit}</span>
        </div>
    );
};

const Panel = ({ title, children, className = "" }) => (
    <div className={`bg-[#161618] border border-white/10 ${className}`}>
        <div className="px-3 py-2 text-[11px] text-white/70 border-b border-white/10 bg-[#1d1d20]" style={MONO}>{title}</div>
        {children}
    </div>
);

const About = () => {
    const reduce = useReducedMotion();
    const [sel, setSel] = useState(0);
    const [tf, setTf] = useState(LAYERS.map(() => ({ ...DEF })));
    const [grade, setGrade] = useState({ temp: 0, contrast: 100, sat: 100 });
    const [ease, setEase] = useState("Cinematic");
    const L = LAYERS[sel];
    const upd = (k) => (v) => setTf((t) => t.map((o, i) => (i === sel ? { ...o, [k]: v } : o)));

    return (
        <section id="about" className="relative bg-[#0a0a0b] text-[#f2efe9] px-6 sm:px-12 py-24" style={DISPLAY}>
            <div className="max-w-6xl mx-auto">
                <p className="text-xs text-white/60 mb-2" style={MONO}>Behind the lens</p>
                <h2 className="text-5xl sm:text-7xl font-extrabold tracking-[-0.03em] leading-[0.95]">The visual architect</h2>
                <p className="mt-5 max-w-2xl text-white/65 leading-relaxed" style={BODY}>
                    I am Ayush Gupta, the creative force behind Portraitwala. With a profound obsession for cinematic aesthetics, I mold light, color and narrative to craft visuals that don't just speak, but echo.
                </p>

                {/* ---------- the After Effects window ---------- */}
                <div className="mt-12 border border-white/10 bg-[#101012] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 text-[11px] text-white/60" style={MONO}>
                        <i className="w-2.5 h-2.5 rounded-full bg-white/20" /><i className="w-2.5 h-2.5 rounded-full bg-white/20" /><i className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        <span className="ml-3">Ayush_Gupta_About.aep · Composition: About_final</span>
                    </div>

                    <div className="grid lg:grid-cols-[190px_1fr_260px] gap-px bg-white/10">
                        {/* layers */}
                        <Panel title="Layers" className="border-0">
                            <ul className="flex lg:block overflow-x-auto">
                                {LAYERS.map((l, i) => {
                                    const I = l.icon;
                                    return (
                                        <li key={l.name} className="shrink-0">
                                            <button
                                                onClick={() => setSel(i)}
                                                aria-pressed={sel === i}
                                                className={`w-full flex items-center gap-2.5 px-3 py-3 text-sm text-left transition-colors ${sel === i ? "bg-white/12" : "hover:bg-white/5"}`}
                                            >
                                                <i className="w-2.5 h-2.5 shrink-0" style={{ background: l.label }} />
                                                <span className="text-white/40 text-xs w-3" style={MONO}>{i + 1}</span>
                                                <I className="w-4 h-4 shrink-0 text-white/70" />
                                                <span className="whitespace-nowrap">{l.name}</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Panel>

                        {/* composition viewer: layers are 3D planes, camera flies between them */}
                        <div className="relative bg-[#0a0a0b] min-h-[380px] md:min-h-[460px] overflow-hidden">
                            <div className="absolute inset-0" style={{ filter: `contrast(${grade.contrast}%) saturate(${grade.sat}%)` }}>
                                <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: 1200 }}>
                                    {LAYERS.map((l, i) => {
                                        const o = i - sel, t = tf[i], I = l.icon, on = o === 0;
                                        return (
                                            <motion.div
                                                key={l.name}
                                                onClick={() => setSel(i)}
                                                animate={{ x: `${o * 58}%`, z: -Math.abs(o) * 200, rotateY: -o * 24, opacity: on ? 1 : Math.max(0.12, 0.45 - Math.abs(o) * 0.1), filter: `blur(${on ? 0 : Math.min(6, Math.abs(o) * 3)}px)` }}
                                                transition={{ duration: reduce ? 0 : 0.9, ease: EASES[ease] }}
                                                style={{ zIndex: 10 - Math.abs(o) }}
                                                className="absolute w-[72%] md:w-[56%] cursor-pointer"
                                            >
                                                <div
                                                    style={{ transform: `translate(${t.x}px, ${t.y}px) scale(${t.s / 100}) rotate(${t.r}deg)`, opacity: t.o / 100, boxShadow: on ? `0 0 0 1px ${RED}` : "0 0 0 1px rgba(255,255,255,0.12)" }}
                                                    className="bg-[#151517] p-6 sm:p-8"
                                                >
                                                    <div className="flex items-center gap-2 mb-5 text-[11px] text-white/60" style={MONO}><i className="w-2.5 h-2.5" style={{ background: l.label }} />Layer {i + 1}</div>
                                                    <I className="w-9 h-9 mb-4" style={{ color: l.label }} />
                                                    <h3 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em]">{l.name}</h3>
                                                    <p className="text-xs text-white/55 mt-1 mb-4" style={MONO}>{l.sub}</p>
                                                    <p className="text-sm text-white/70 leading-relaxed" style={BODY}>{l.text}</p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                            {/* temperature overlay */}
                            <div className="absolute inset-0 pointer-events-none" style={{ background: grade.temp >= 0 ? "#ff9a3c" : "#3c8cff", opacity: Math.abs(grade.temp) / 220, mixBlendMode: "soft-light" }} />
                            <div className="absolute inset-4 border border-dashed border-white/10 pointer-events-none" aria-hidden />
                            <div className="absolute left-0 right-0 bottom-0 flex justify-between px-4 py-2 text-[11px] text-white/50" style={MONO}>
                                <span>100% · Full · Active Camera</span><span>Drag the numbers →</span>
                            </div>
                        </div>

                        {/* effect controls */}
                        <div className="flex flex-col gap-px bg-white/10">
                            <Panel title={`Effect Controls: ${L.name}`} className="border-0">
                                <div className="px-3 py-2">
                                    <p className="text-[11px] text-white/40 mb-1" style={MONO}>Transform</p>
                                    <Scrub label="Position X" value={tf[sel].x} set={upd("x")} min={-120} max={120} unit=" px" />
                                    <Scrub label="Position Y" value={tf[sel].y} set={upd("y")} min={-100} max={100} unit=" px" />
                                    <Scrub label="Scale" value={tf[sel].s} set={upd("s")} min={60} max={130} unit="%" />
                                    <Scrub label="Rotation" value={tf[sel].r} set={upd("r")} min={-15} max={15} unit="°" />
                                    <Scrub label="Opacity" value={tf[sel].o} set={upd("o")} min={20} max={100} unit="%" />
                                    <button onClick={() => setTf((t) => t.map((o, i) => (i === sel ? { ...DEF } : o)))} className="mt-1 text-[11px] text-white/50 hover:text-[#ff4b3e]" style={MONO}>Reset layer</button>
                                </div>
                            </Panel>
                            <Panel title="Lumetri Color · all layers" className="border-0">
                                <div className="px-3 py-2">
                                    <Scrub label="Temperature" value={grade.temp} set={(v) => setGrade((g) => ({ ...g, temp: v }))} min={-100} max={100} />
                                    <Scrub label="Contrast" value={grade.contrast} set={(v) => setGrade((g) => ({ ...g, contrast: v }))} min={70} max={150} unit="%" />
                                    <Scrub label="Saturation" value={grade.sat} set={(v) => setGrade((g) => ({ ...g, sat: v }))} min={0} max={160} unit="%" />
                                </div>
                            </Panel>
                            <Panel title="Camera easing" className="border-0 flex-1">
                                <div className="px-3 py-3 flex flex-wrap gap-2">
                                    {Object.keys(EASES).map((k) => (
                                        <button key={k} onClick={() => setEase(k)} aria-pressed={ease === k} className="px-3 py-1.5 text-xs border transition-colors"
                                            style={{ borderColor: ease === k ? RED : "rgba(255,255,255,0.18)", background: ease === k ? "rgba(255,75,62,0.12)" : "transparent" }}>{k}</button>
                                    ))}
                                </div>
                            </Panel>
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-xs text-white/45" style={MONO}>Click a layer to fly the camera there. Drag any underlined number to change it, hold Shift for fine control.</p>
            </div>
        </section>
    );
};

export default About;