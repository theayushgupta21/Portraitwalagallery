import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ---------- Add to index.html <head> (fonts) ----------
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
-------------------------------------------------------

   CONCEPT: the whole hero is a camera viewfinder. Three scenes sit at different depths
   (Portraits near, Ayush mid, Film far). The visitor pulls focus with the lens ring:
   whatever is at the focus distance turns sharp, everything else melts into bokeh.
   Rack focus is a filmmaker's move, so the page itself shows what you do. */

const DISPLAY = { fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' };
const MONO = { fontFamily: '"IBM Plex Mono", ui-monospace, monospace' };
const RED = "#ff4b3e";

// d = position on the focus ring (0 near, 1 far)
const STOPS = [
    { d: 0.08, label: "Portraits", dist: "0.8 m", text: "Faces, held a second longer. Emotive portraits shot in natural light." },
    { d: 0.5, label: "Ayush Gupta", dist: "2.5 m", text: "Director, editor and photographer. I turn ordinary moments into cinematic ones." },
    { d: 0.92, label: "Film", dist: "infinity", text: "Stories cut with rhythm and graded with feeling. High-end video editing." },
];

// Replace img with your own photo URLs, e.g. "/photos/portrait.jpg"
const PORTRAIT = { img: "", c: ["#d8a48a", "#3a2220", "#120d0d"] };
const FILM = { img: "", c: ["#4fb3b8", "#2b2238", "#0c0b12"] };
const bg = (p) =>
    p.img
        ? { backgroundImage: `url(${p.img})`, backgroundSize: "cover", backgroundPosition: "center" }
        : { background: `radial-gradient(circle at 35% 25%, ${p.c[0]}, transparent 60%), linear-gradient(160deg, ${p.c[1]}, ${p.c[2]})` };

// [left %, top %, size px, depth, tint]
const BOKEH = [
    [8, 14, 90, 0.1, "#ffe3c2"], [22, 70, 60, 0.05, "#ff8a70"], [38, 8, 120, 0.5, "#ffe3c2"], [55, 80, 80, 0.92, "#ffe3c2"],
    [70, 16, 70, 0.5, "#ff8a70"], [86, 58, 130, 0.92, "#ffe3c2"], [92, 12, 60, 0.08, "#ffe3c2"], [15, 46, 50, 0.92, "#ff8a70"],
    [48, 52, 40, 0.08, "#ffe3c2"], [64, 34, 150, 0.5, "#ffe3c2"], [30, 88, 100, 0.5, "#ff8a70"], [78, 86, 60, 0.08, "#ffe3c2"],
];

/* One depth layer: blurs by its distance from focus, drifts with the cursor, gets a red focus-peaking outline when sharp. */
const Layer = ({ d, sf, mx, my, depth, className, children }) => {
    const filter = useTransform(sf, (v) => `blur(${Math.min(26, Math.abs(v - d) * 60)}px)`);
    const opacity = useTransform(sf, (v) => 1 - Math.min(0.5, Math.abs(v - d)) * 0.8);
    const scale = useTransform(sf, (v) => 1 + Math.abs(v - d) * 0.06); // focus breathing
    const peak = useTransform(sf, (v) => (Math.abs(v - d) < 0.07 ? 1 : 0));
    const x = useTransform(mx, [-0.5, 0.5], [-depth, depth]);
    const y = useTransform(my, [-0.5, 0.5], [-depth * 0.6, depth * 0.6]);
    return (
        <motion.div style={{ filter, opacity, scale, x, y }} className={`absolute ${className}`}>
            {children}
            <motion.span style={{ opacity: peak, boxShadow: `0 0 0 1px ${RED}` }} className="absolute -inset-1 pointer-events-none" aria-hidden />
        </motion.div>
    );
};

const BokehDot = ({ cfg: [l, t, s, d, tint], sf }) => {
    const filter = useTransform(sf, (v) => `blur(${6 + Math.abs(v - d) * 36}px)`);
    return (
        <motion.i
            aria-hidden
            style={{ filter, left: `${l}%`, top: `${t}%`, width: s, height: s, background: `radial-gradient(circle, ${tint}55 0%, ${tint}22 60%, transparent 70%)` }}
            className="absolute rounded-full pointer-events-none"
        />
    );
};

const Timecode = () => {
    const [t, setT] = useState("00:00:00:00");
    useEffect(() => {
        const start = performance.now();
        const p = (n) => String(n).padStart(2, "0");
        const id = setInterval(() => {
            const ms = performance.now() - start, s = Math.floor(ms / 1000);
            setT(`${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}:${p(Math.floor((ms % 1000) / 41.67))}`);
        }, 83);
        return () => clearInterval(id);
    }, []);
    return <span>{t}</span>;
};

const Hero = () => {
    const reduce = useReducedMotion();
    const secRef = useRef(null);
    const inputRef = useRef(null);
    const f = useMotionValue(1);
    const sf = useSpring(f, { stiffness: 70, damping: 20 });
    const rawX = useMotionValue(0), rawY = useMotionValue(0);
    const mx = useSpring(rawX, { stiffness: 60, damping: 20 });
    const my = useSpring(rawY, { stiffness: 60, damping: 20 });
    const [active, setActive] = useState(1);
    const [locked, setLocked] = useState(false);
    const [touched, setTouched] = useState(false);
    const left = useTransform(sf, (v) => `${v * 100}%`);

    // opening move: rack focus from far onto the name
    useEffect(() => {
        if (reduce) { f.set(0.5); return; }
        const a = animate(f, 0.5, { duration: 2.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] });
        return () => a.stop();
    }, []);

    // keep slider, active scene and the AF box in sync with the focus spring
    useEffect(() => sf.on("change", (v) => {
        if (inputRef.current) inputRef.current.value = v;
        let best = 0;
        STOPS.forEach((s, i) => { if (Math.abs(s.d - v) < Math.abs(STOPS[best].d - v)) best = i; });
        setActive(best);
        setLocked(Math.abs(STOPS[best].d - v) < 0.07);
    }), []);

    const pull = (v) => { setTouched(true); animate(f, v, { duration: 1.1, ease: [0.16, 1, 0.3, 1] }); };
    const move = (e) => {
        if (reduce) return;
        const r = secRef.current.getBoundingClientRect();
        rawX.set((e.clientX - r.left) / r.width - 0.5);
        rawY.set((e.clientY - r.top) / r.height - 0.5);
    };
    const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const stop = STOPS[active];

    return (
        <section ref={secRef} onPointerMove={move} className="relative h-screen min-h-[640px] overflow-hidden bg-[#0a0a0b] text-[#f2efe9]" style={DISPLAY}>
            {/* depth scene */}
            <div className="absolute inset-0">
                {BOKEH.map((b, i) => <BokehDot key={i} cfg={b} sf={sf} />)}

                {/* far: film frame */}
                <Layer d={0.92} sf={sf} mx={mx} my={my} depth={12} className="right-[4%] bottom-[26%] w-[52%] md:w-[34%] z-0">
                    <div className="aspect-video relative overflow-hidden" style={bg(FILM)} role="img" aria-label="Film still">
                        <div className="absolute inset-x-0 top-0 h-[10%] bg-black" />
                        <div className="absolute inset-x-0 bottom-0 h-[10%] bg-black" />
                        <span className="absolute left-3 bottom-[13%] text-[10px]" style={MONO}>SC 14 · TAKE 3</span>
                    </div>
                </Layer>

                {/* mid: the name */}
                <Layer d={0.5} sf={sf} mx={mx} my={my} depth={26} className="left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 z-10 px-4">
                    <h1 className="font-extrabold leading-[0.82] tracking-[-0.04em] text-[24vw] sm:text-[17vw] lg:text-[13vw] whitespace-nowrap">
                        <span className="block">Ayush</span>
                        <span className="block pl-[0.5em]">Gupta</span>
                    </h1>
                </Layer>

                {/* near: portrait */}
                <Layer d={0.08} sf={sf} mx={mx} my={my} depth={60} className="left-[4%] top-[16%] w-[40%] md:w-[22%] z-20">
                    <div className="aspect-[3/4] shadow-[0_40px_80px_rgba(0,0,0,0.6)]" style={bg(PORTRAIT)} role="img" aria-label="Portrait photograph" />
                </Layer>
            </div>

            {/* viewfinder HUD */}
            <div className="absolute inset-0 pointer-events-none">
                {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((c) => (
                    <span key={c} className={`absolute w-8 h-8 border-white/50 ${c}`} />
                ))}

                <div className="flex justify-between items-start text-xs sm:text-sm pt-10 px-8 sm:px-12" style={MONO}>
                    <div className="flex items-center gap-3">
                        <motion.i animate={reduce ? {} : { opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="w-2.5 h-2.5 rounded-full" style={{ background: RED }} />
                        REC <Timecode />
                    </div>
                    <div className="hidden sm:block text-white/70">ƒ/1.8 · 1/50 · ISO 400</div>
                    <div className="text-white/70">4K 24p</div>
                </div>

                {/* autofocus box: pulses while searching, locks red when a scene is sharp */}
                <motion.div
                    animate={{ scale: locked ? 1 : [1, 1.18, 1] }}
                    transition={locked ? { duration: 0.3 } : { duration: 1.2, repeat: Infinity }}
                    className="absolute left-1/2 top-[44%] w-20 h-20 -translate-x-1/2 -translate-y-1/2"
                    style={{ border: `1px solid ${locked ? RED : "rgba(255,255,255,0.4)"}` }}
                />

                {/* caption + actions + lens ring */}
                <div className="absolute inset-x-0 bottom-0 px-8 sm:px-12 pb-8 sm:pb-10 flex flex-col gap-5">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                        <div className="max-w-md min-h-[96px]">
                            <AnimatePresence mode="wait">
                                <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
                                    <p className="text-xs text-white/60 mb-1" style={MONO}>Focus {stop.dist}</p>
                                    <p className="text-2xl sm:text-3xl font-medium leading-tight">{stop.label}</p>
                                    <p className="mt-2 text-sm sm:text-base text-white/70" style={{ fontFamily: "system-ui, sans-serif" }}>{stop.text}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="flex gap-3 pointer-events-auto">
                            <button onClick={() => go("skills")} className="px-7 py-3.5 text-sm font-semibold text-black bg-[#f2efe9] transition hover:-translate-y-0.5">Explore portfolio</button>
                            <button onClick={() => go("contact")} className="px-7 py-3.5 text-sm font-semibold border border-white/40 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#ff4b3e]">Book a session</button>
                        </div>
                    </div>

                    <div className="pointer-events-auto">
                        <div className="relative h-6">
                            <div className="absolute inset-x-0 top-0 h-5 flex justify-between items-end">
                                {Array.from({ length: 51 }).map((_, i) => <i key={i} className="w-px bg-white/40" style={{ height: i % 5 === 0 ? 18 : 9 }} />)}
                            </div>
                            <motion.i style={{ left, background: RED }} className="absolute top-0 w-0.5 h-6 -translate-x-1/2" aria-hidden />
                            <input
                                ref={inputRef}
                                type="range" min="0" max="1" step="0.005" defaultValue="1"
                                aria-label="Pull focus from near to far"
                                onChange={(e) => { setTouched(true); f.set(parseFloat(e.target.value)); }}
                                className="absolute inset-x-0 top-0 h-6 w-full opacity-0 cursor-ew-resize"
                            />
                        </div>
                        <div className="flex justify-between text-xs text-white/60 mt-1" style={MONO}>
                            {STOPS.map((s, i) => (
                                <button key={s.label} onClick={() => pull(s.d)} className={`py-1 transition ${active === i ? "text-white" : "hover:text-white"}`}>{s.label}</button>
                            ))}
                        </div>
                        {!touched && <p className="text-center text-xs mt-2 text-white/50" style={MONO}>Drag the ring to pull focus</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;