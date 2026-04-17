import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Contact = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const yVal = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);

    const socials = [
        { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/portraitwalagallery", color: "text-pink-500", hoverBg: "hover:bg-pink-500/10", border: "hover:border-pink-500" },
        { name: "YouTube", icon: FaYoutube, href: "https://www.youtube.com/@ayushgupta-portraitwala", color: "text-red-500", hoverBg: "hover:bg-red-500/10", border: "hover:border-red-500" },
        { name: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/in/theayushgupta21", color: "text-blue-500", hoverBg: "hover:bg-blue-500/10", border: "hover:border-blue-500" }
    ];

    return (
        <section id="contact" ref={containerRef} className="relative min-h-[90vh] py-32 px-6 overflow-hidden bg-[#050505] flex items-center justify-center">

            {/* Cinematic Ambience */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[200px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[200px]" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDUwNTA1Ij48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxMTEiPjwvcmVjdD4KPC9zdmc+')] opacity-20 pointer-events-none" />

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
                
                {/* Title */}
                <motion.div style={{ y: yVal }} className="text-center w-full">
                    <p className="text-blue-500 uppercase tracking-[0.5em] text-sm font-bold mb-6">Let's Work Together</p>
                    <h2 className="text-6xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter leading-none mb-10 w-full flex flex-col items-center">
                        <span className="block text-zinc-200">Start A</span>
                        <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x mt-[-10px]">
                            Project
                        </span>
                    </h2>

                    <p className="mt-8 text-zinc-400 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
                        Whether it’s a cinematic masterpiece, a compelling brand story, or a stunning visual campaign. Connect with me directly and let's craft magic.
                    </p>

                    {/* Email CTA */}
                    <div className="mt-16 mb-20">
                        <motion.a
                            href="mailto:ayushgupta9510@gmail.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center relative px-12 py-6 rounded-full bg-white text-black font-black text-xl tracking-[0.2em] uppercase overflow-hidden group shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all duration-500"
                        >
                            <span className="relative z-10">Get In Touch</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.a>
                    </div>
                </motion.div>

                {/* Massive Social Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-zinc-800/50">
                    {socials.map((social, idx) => (
                        <motion.a
                            key={idx}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className={`flex flex-col items-center justify-center gap-6 p-12 rounded-3xl glass-card border-transparent transition-all duration-500 ${social.hoverBg} ${social.border} group`}
                        >
                            <social.icon className={`text-6xl md:text-8xl ${social.color} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 drop-shadow-xl`} />
                            <span className="text-xl md:text-2xl font-bold tracking-widest text-zinc-300 group-hover:text-white transition-colors uppercase">
                                {social.name}
                            </span>
                        </motion.a>
                    ))}
                </div>

                <div className="mt-20">
                    <p className="text-zinc-600 text-[10px] tracking-[0.5em] uppercase font-bold text-center">
                        Available Worldwide • Based in India
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;