import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Contact = () => {
    return (
        <section className="relative py-32 px-6 overflow-hidden bg-black text-center">

            {/* Glow Effects */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[180px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-[160px]" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto">

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    Let’s Create
                    <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Something Powerful
                    </span>
                </h2>

                {/* Divider */}
                <div className="mx-auto mt-6 h-[1px] w-24 bg-gradient-to-r from-blue-500 to-purple-600" />

                {/* Description */}
                <p className="mt-8 text-zinc-400 text-lg md:text-xl leading-relaxed">
                    Open for collaborations, brand work, events,
                    and cinematic visual storytelling projects.
                </p>

                {/* CTA Buttons */}
                <div className="mt-14 flex flex-col sm:flex-row justify-center gap-6">

                    <a
                        href="mailto:ayushgupta9510@gmail.com"
                        className="group relative px-12 py-4 rounded-full 
                        bg-gradient-to-r from-blue-600 to-purple-600 
                        font-semibold overflow-hidden hover:scale-105 transition"
                    >
                        <span className="relative z-10">Start a Project</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
                    </a>

                </div>

                {/* Social Icons */}
                <div className="mt-12 flex justify-center gap-8 text-zinc-400">

                    <a
                        href="https://github.com/theayushgupta21"
                        target="_blank"
                        rel="noreferrer"
                        className="text-2xl hover:text-white hover:scale-125 transition"
                    >
                        <FaGithub />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/theayushgupta21"
                        target="_blank"
                        rel="noreferrer"
                        className="text-2xl hover:text-blue-500 hover:scale-125 transition"
                    >
                        <FaLinkedin />
                    </a>

                    <a
                        href="https://www.instagram.com/portraitwalagallery"
                        target="_blank"
                        rel="noreferrer"
                        className="text-2xl hover:text-pink-500 hover:scale-125 transition"
                    >
                        <FaInstagram />
                    </a>

                </div>

                {/* Sub Text */}
                <p className="mt-10 text-sm text-zinc-500 tracking-wide">
                    Based in India • Available Worldwide
                </p>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
        </section>
    );
};

export default Contact;