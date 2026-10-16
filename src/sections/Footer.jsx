import { motion } from "framer-motion";

/* Same fonts as the rest (add once in index.html <head>):
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

   CONCEPT: the end of the reel. A strip of film sprocket holes on top, a section index, and a
   "Rewind" button that scrolls back to the start like rewinding a tape. */

const DISPLAY = { fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' };
const MONO = { fontFamily: '"IBM Plex Mono", ui-monospace, monospace' };

const LINKS = [
    ["Portfolio", "skills"],
    ["About", "about"],
    ["Experience", "experience"],
    ["Contact", "contact"],
];

const Footer = () => {
    const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const rewind = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer className="bg-[#0a0a0b] text-[#f2efe9]" style={DISPLAY}>
            {/* film sprocket holes */}
            <div className="h-2.5 mx-6 sm:mx-12 opacity-40" style={{ background: "repeating-linear-gradient(90deg, #f2efe9 0 14px, transparent 14px 34px)" }} aria-hidden />

            <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
                <div>
                    <p className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-none">Portraitwala</p>
                    <p className="mt-3 text-sm text-white/55" style={MONO}>© 2026 Portraitwala. All rights reserved.</p>
                </div>

                <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                    {LINKS.map(([label, id]) => (
                        <button key={id} onClick={() => go(id)} className="text-white/70 hover:text-[#ff4b3e] transition-colors">{label}</button>
                    ))}
                </nav>

                <motion.button
                    onClick={rewind}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="self-start md:self-auto px-6 py-3 text-sm border border-white/30 hover:border-[#ff4b3e] transition-colors"
                    style={MONO}
                    aria-label="Back to top"
                >
                    ◀◀ Rewind
                </motion.button>
            </div>

            <div className="border-t border-white/10">
                <p className="max-w-6xl mx-auto px-6 sm:px-12 py-5 text-xs text-white/45 flex flex-col sm:flex-row gap-2 sm:justify-between" style={MONO}>
                    <span>Designed and developed by Ayush Gupta</span>
                    <span>End of reel</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;