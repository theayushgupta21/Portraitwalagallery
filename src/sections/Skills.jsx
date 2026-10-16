import { motion, useDragControls, useMotionValue, useReducedMotion, useSpring, useTransform, useVelocity } from "framer-motion";
import { useEffect, useRef, useState } from "react";
// ✅ Cleaned media imports (unchanged)
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
// import logo from "../media/logo.png";   // 1) put your logo file here, 2) uncomment this line, 3) set LOGO_SRC = logo below
const LOGO_SRC = null;                      // null = built-in "Portraitwalagallery" text logo with an aperture mark

/* Same fonts as the rest (add once in index.html <head>):
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

   CONCEPT: a gallery wall. Every photo and film hangs on one big wall, all visible at once, in prints with a
   paper mat and a small placard. The wall is bigger than the screen:
   - drag it in any direction (mouse or touch), or scroll / trackpad to pan (at the wall's edge the page scrolls on)
   - the wall leans in 3D with the speed of your drag; frames lift off the wall on hover
   - grab "⠿ pick" on any frame and drop it in the tray (top right) to open it large
   - the mini-map (bottom right) shows where you are on the wall
   - every image and video carries the Portraitwalagallery logo in its bottom-right corner, also in the viewer */

const DISPLAY = { fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' };
const MONO = { fontFamily: '"IBM Plex Mono", ui-monospace, monospace' };
const BODY = { fontFamily: "system-ui, sans-serif" };
const RED = "#ff4b3e";
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

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
const ratioOf = (s) =>
    s.includes("row-span-2") && s.includes("col-span-2") ? "4/3" : s.includes("row-span-2") ? "3/4" : s.includes("col-span-2") ? "16/10" : "1/1";

/* Where each frame hangs on the wall (base size 2500 x 1550): [left, top, width], plus a slight tilt and depth */
const WALL = { w: 2500, h: 1550 };
const POS = [[140, 150, 620], [820, 110, 360], [1240, 170, 340], [1640, 100, 340], [2040, 220, 300], [100, 760, 620],
    [780, 640, 340], [1180, 720, 380], [1620, 650, 330], [2000, 620, 400], [760, 1120, 300], [1650, 1070, 520]];
const ROT = [-1.5, 1, -0.8, 1.2, -1, 0.8, -1.2, 1, -0.6, 1.4, -1, 0.6];
const Z = [0, 30, 0, 50, 20, 0, 40, 10, 0, 30, 20, 0];

/* Portraitwalagallery watermark: sits in a corner of whatever positioned parent it is placed in */
const Logo = ({ className = "" }) => (
    <span aria-hidden className={`pointer-events-none absolute flex items-center gap-1.5 text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] ${className}`}>
        {LOGO_SRC ? (
            <img src={LOGO_SRC} alt="" draggable={false} className="h-5 w-auto" />
        ) : (
            <>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9.5" /><circle cx="12" cy="12" r="3.2" />
                    <path d="M12 2.5v6.3M21.5 12h-6.3M12 21.5v-6.3M2.5 12h6.3" />
                </svg>
                <span className="text-[9px] sm:text-[11px] font-semibold tracking-tight" style={DISPLAY}>Portraitwalagallery</span>
            </>
        )}
    </span>
);

const Media = ({ item, className, controls = false, vref }) =>
    item.type === "image" ? (
        <img src={item.src} alt={item.name} loading="lazy" draggable={false} className={className} />
    ) : (
        <video ref={vref} src={item.src} muted={!controls} loop playsInline preload="metadata" controls={controls} autoPlay={controls} className={className} aria-label={item.name} />
    );

const Item = ({ item, i, s, onOpen, onPick }) => {
    const ref = useRef(null);
    const vref = useRef(null);
    const [x0, y0, w] = POS[i];
    // videos only play while they are on screen
    useEffect(() => {
        if (item.type !== "video" || !ref.current) return;
        const io = new IntersectionObserver(([e]) => (e.isIntersecting ? vref.current?.play().catch(() => {}) : vref.current?.pause()), { threshold: 0.15 });
        io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    return (
        <motion.figure
            ref={ref}
            whileHover={{ z: Z[i] + 70, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ position: "absolute", left: x0 * s, top: y0 * s, width: w * s, rotate: ROT[i], z: Z[i] }}
            className="m-0 select-none"
        >
            <div className="bg-[#f2efe9] p-1.5 sm:p-2 shadow-[0_30px_60px_rgba(0,0,0,0.55)]">
                <div className="group relative overflow-hidden bg-black" style={{ aspectRatio: ratioOf(item.span) }}>
                    <button onClick={() => onOpen(i)} aria-label={`Open ${item.name}`} className="absolute inset-0 block w-full h-full">
                        <Media item={item} vref={vref} className="w-full h-full object-cover transition-transform duration-[1.6s] group-hover:scale-105" />
                    </button>
                    <span className="absolute left-2 top-2 px-1.5 py-0.5 text-[10px] bg-black/65 pointer-events-none" style={MONO}>{String(i + 1).padStart(2, "0")}{item.type === "video" ? " · film" : ""}</span>
                    {/* drag handle: grab it and drop the frame in the tray */}
                    <span
                        role="button" tabIndex={0} aria-label={`Drag ${item.name} to the tray, or press Enter to open it`}
                        onPointerDown={(e) => onPick(i, e)}
                        onKeyDown={(e) => e.key === "Enter" && onOpen(i)}
                        className="absolute right-2 top-2 px-1.5 py-0.5 text-[10px] bg-black/65 text-white cursor-grab hover:bg-[#ff4b3e] hover:text-black transition-colors"
                        style={{ ...MONO, touchAction: "none" }}
                    >⠿ pick</span>
                    <Logo className="right-2 bottom-2" />
                </div>
            </div>
            {/* placard */}
            <figcaption className="mt-3">
                <p className="text-sm sm:text-base font-extrabold tracking-[-0.02em] text-[#f2efe9]">{item.name}</p>
                <p className="text-[10px] sm:text-[11px] text-white/55" style={MONO}>{item.level}</p>
            </figcaption>
        </motion.figure>
    );
};

const Skills = () => {
    const reduce = useReducedMotion();
    const vpRef = useRef(null);
    const dropRef = useRef(null);
    const bnd = useRef({ minX: 0, minY: 0, maxY: 0 });
    const moved = useRef(false);
    const placed = useRef(false);
    const controls = useDragControls();
    const [vp, setVp] = useState({ w: 1200, h: 800 });
    const [open, setOpen] = useState(null);
    const [grabbing, setGrabbing] = useState(false);
    const [pick, setPick] = useState(null);     // frame currently being dragged to the tray: {i, x, y, over}
    const [picked, setPicked] = useState(null); // last frame dropped in the tray

    /* wall size: scales with the screen. On phones the wall fits the height so only a sideways drag is needed. */
    const narrow = vp.w < 700;
    const s = narrow ? Math.max(0.34, vp.h / WALL.h) : clamp(vp.w / 1400, 0.62, 1);
    const W = WALL.w * s, H = WALL.h * s;
    const minX = Math.min(0, vp.w - W);
    const minY = H > vp.h ? vp.h - H : (vp.h - H) / 2;
    const maxY = H > vp.h ? 0 : (vp.h - H) / 2;
    bnd.current = { minX, minY, maxY };

    const x = useMotionValue(0), y = useMotionValue(0);
    // the wall leans with the speed of the drag
    const tiltY = useSpring(useTransform(useVelocity(x), [-1800, 1800], reduce ? [0, 0] : [7, -7]), { stiffness: 120, damping: 20 });
    const tiltX = useSpring(useTransform(useVelocity(y), [-1800, 1800], reduce ? [0, 0] : [-7, 7]), { stiffness: 120, damping: 20 });
    const miniLeft = useTransform(x, (v) => `${(-v / W) * 100}%`);
    const miniTop = useTransform(y, (v) => `${(-v / H) * 100}%`);

    useEffect(() => {
        const measure = () => vpRef.current && setVp({ w: vpRef.current.offsetWidth, h: vpRef.current.offsetHeight });
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(vpRef.current);
        return () => ro.disconnect();
    }, []);
    // start a little into the wall, once
    useEffect(() => {
        if (placed.current || vp.w === 1200) return;
        placed.current = true;
        x.set(minX * 0.2);
        y.set(maxY);
    }, [vp]);

    /* scroll / trackpad pans the wall; at the wall's edge the page scrolls on as normal */
    useEffect(() => {
        const el = vpRef.current;
        const h = (e) => {
            const b = bnd.current;
            const nx = clamp(x.get() - (e.shiftKey ? e.deltaY : e.deltaX), b.minX, 0);
            const ny = clamp(y.get() - (e.shiftKey ? 0 : e.deltaY), b.minY, b.maxY);
            if (nx !== x.get() || ny !== y.get()) { e.preventDefault(); x.set(nx); y.set(ny); }
        };
        el.addEventListener("wheel", h, { passive: false });
        return () => el.removeEventListener("wheel", h);
    }, []);

    useEffect(() => {
        if (open === null) return;
        const k = (e) => {
            if (e.key === "Escape") setOpen(null);
            if (e.key === "ArrowRight") setOpen((o) => (o + 1) % skills.length);
            if (e.key === "ArrowLeft") setOpen((o) => (o + skills.length - 1) % skills.length);
        };
        window.addEventListener("keydown", k);
        return () => window.removeEventListener("keydown", k);
    }, [open]);

    const openItem = (i) => { if (!moved.current) setOpen(i); };

    /* drag a single frame into the tray (works with mouse and touch) */
    const startPick = (i, e) => {
        e.stopPropagation();
        e.preventDefault();
        const inside = (px, py) => {
            const r = dropRef.current?.getBoundingClientRect();
            return !!r && px > r.left - 24 && px < r.right + 24 && py > r.top - 24 && py < r.bottom + 24;
        };
        setPick({ i, x: e.clientX, y: e.clientY, over: inside(e.clientX, e.clientY) });
        const mv = (ev) => setPick({ i, x: ev.clientX, y: ev.clientY, over: inside(ev.clientX, ev.clientY) });
        const up = (ev) => {
            window.removeEventListener("pointermove", mv);
            window.removeEventListener("pointerup", up);
            window.removeEventListener("pointercancel", up);
            if (inside(ev.clientX, ev.clientY)) { setPicked(i); setOpen(i); }
            setPick(null);
        };
        window.addEventListener("pointermove", mv);
        window.addEventListener("pointerup", up);
        window.addEventListener("pointercancel", up);
    };

    const P = picked !== null ? skills[picked] : null;

    return (
        <section id="skills" className="relative h-screen min-h-[640px] overflow-hidden bg-[#0a0a0b] text-[#f2efe9]" style={DISPLAY}>
            {/* the wall viewport */}
            <div
                ref={vpRef}
                onPointerDown={(e) => { if (!e.button) controls.start(e); }}
                className={`absolute inset-0 ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
                style={{ perspective: 1400, touchAction: narrow ? "pan-y" : "none", background: "radial-gradient(ellipse at 50% 40%, #17171a 0%, #0a0a0b 75%)" }}
            >
                <motion.div
                    drag dragControls={controls} dragListener={false}
                    dragConstraints={{ left: minX, right: 0, top: minY, bottom: maxY }}
                    dragElastic={0.08}
                    onDragStart={() => { moved.current = true; setGrabbing(true); }}
                    onDragEnd={() => { setGrabbing(false); setTimeout(() => (moved.current = false), 0); }}
                    style={{ x, y, rotateX: tiltX, rotateY: tiltY, width: W, height: H, transformStyle: "preserve-3d" }}
                    className="absolute left-0 top-0"
                >
                    {skills.map((it, i) => <Item key={it.name} item={it} i={i} s={s} onOpen={openItem} onPick={startPick} />)}
                </motion.div>
            </div>

            {/* title + tray */}
            <div className="absolute top-0 inset-x-0 z-20 pointer-events-none px-6 sm:px-12 pt-8 sm:pt-10 pb-12 flex items-start justify-between gap-6 bg-gradient-to-b from-[#0a0a0b] via-[#0a0a0b]/70 to-transparent">
                <div>
                    <p className="text-xs text-white/60 mb-2" style={MONO}>Visual chronicles</p>
                    <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] leading-[0.95]">Selected portfolio</h2>
                    <p className="hidden lg:block mt-4 max-w-md text-sm text-white/60 leading-relaxed" style={BODY}>
                        A curated selection of projects where light meets narrative. Each frame is a testament to technical precision and evocative storytelling.
                    </p>
                </div>
                <div
                    ref={dropRef}
                    className="relative shrink-0 w-28 h-20 sm:w-40 sm:h-28 border border-dashed flex items-center justify-center text-center transition-all duration-200 bg-[#0a0a0b]/60 backdrop-blur-sm pointer-events-auto"
                    style={{ borderColor: pick?.over ? RED : "rgba(255,255,255,0.3)", background: pick?.over ? "rgba(255,75,62,0.14)" : undefined, transform: pick?.over ? "scale(1.06)" : "none" }}
                >
                    {P && !pick ? (
                        <button onClick={() => setOpen(picked)} aria-label={`Open ${P.name} again`} className="absolute inset-1 overflow-hidden">
                            {P.type === "image" ? <img src={P.src} alt="" draggable={false} className="w-full h-full object-cover" /> : <span className="w-full h-full grid place-items-center bg-[#1a1a1d] text-[11px] px-1" style={MONO}>film · {P.name}</span>}
                        </button>
                    ) : (
                        <span className="text-[11px] text-white/55 px-2 leading-snug" style={MONO}>{pick ? (pick.over ? "Release to open" : "Drop here") : "Drop a frame here"}</span>
                    )}
                </div>
            </div>

            {/* hint + mini-map */}
            <div className="absolute bottom-0 inset-x-0 z-20 pointer-events-none px-6 sm:px-12 pb-6 pt-14 flex items-end justify-between gap-4 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent">
                <p className="text-[11px] sm:text-xs text-white/60 max-w-[60%]" style={MONO}>
                    Drag the wall or scroll to pan · drag ⠿ pick into the tray to open a frame
                </p>
                <div className="relative w-28 sm:w-40 border border-white/25 bg-black/50" style={{ aspectRatio: `${WALL.w}/${WALL.h}` }} aria-hidden>
                    {POS.map(([px, py, pw], i) => {
                        const [ra, rb] = ratioOf(skills[i].span).split("/").map(Number);
                        return <i key={i} className="absolute bg-white/45" style={{ left: `${(px / WALL.w) * 100}%`, top: `${(py / WALL.h) * 100}%`, width: `${(pw / WALL.w) * 100}%`, height: `${((pw * rb) / ra / WALL.h) * 100}%` }} />;
                    })}
                    <motion.i className="absolute" style={{ left: miniLeft, top: miniTop, width: `${Math.min(100, (vp.w / W) * 100)}%`, height: `${Math.min(100, (vp.h / H) * 100)}%`, boxShadow: `inset 0 0 0 1px ${RED}`, background: "rgba(255,75,62,0.12)" }} />
                </div>
            </div>

            {/* frame being dragged */}
            {pick && (
                <div className="fixed z-[200] pointer-events-none w-32 sm:w-40" style={{ left: pick.x, top: pick.y, transform: "translate(-50%,-60%) rotate(-4deg)", boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px ${RED}` }}>
                    {skills[pick.i].type === "image"
                        ? <img src={skills[pick.i].src} alt="" draggable={false} className="w-full aspect-[4/3] object-cover" />
                        : <div className="aspect-[4/3] bg-[#1a1a1d] grid place-items-center text-xs px-2 text-center" style={MONO}>film · {skills[pick.i].name}</div>}
                </div>
            )}

            {/* lightbox: logo stays in the bottom-right corner of the media */}
            {open !== null && (
                <div role="dialog" aria-modal="true" aria-label={skills[open].name} onClick={() => setOpen(null)} className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 sm:p-8">
                    <button onClick={() => setOpen(null)} aria-label="Close" className="absolute top-4 right-5 text-3xl text-white/80 hover:text-white">×</button>
                    <div onClick={(e) => e.stopPropagation()} className="max-w-full">
                        <div className="relative inline-block max-w-full">
                            <Media key={open} item={skills[open]} controls className="block max-h-[78vh] max-w-full object-contain" />
                            <Logo className={`right-3 ${skills[open].type === "video" ? "bottom-14" : "bottom-3"}`} />
                        </div>
                        <div className="mt-4 flex items-end justify-between gap-6">
                            <div>
                                <p className="text-2xl font-extrabold tracking-[-0.02em]">{skills[open].name}</p>
                                <p className="text-xs text-white/60" style={MONO}>{skills[open].level}</p>
                            </div>
                            <div className="flex gap-2 text-sm" style={MONO}>
                                <button onClick={() => setOpen((open + skills.length - 1) % skills.length)} className="px-4 py-2 border border-white/30 hover:border-[#ff4b3e]" aria-label="Previous">Prev</button>
                                <button onClick={() => setOpen((open + 1) % skills.length)} className="px-4 py-2 border border-white/30 hover:border-[#ff4b3e]" aria-label="Next">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Skills;