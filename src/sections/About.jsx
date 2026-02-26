import { Camera, Video, Film, MapPin, Feather } from "lucide-react";
import ThreeBackground from "../compornetns/ThreeBackground";

const About = () => {
    return (
        <section className="relative py-32 px-6 bg-black overflow-hidden">
            <ThreeBackground />

            {/* Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[160px]" />

            <div className="relative z-10 max-w-6xl mx-auto">

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
                    About
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        {" "}Me
                    </span>
                </h2>

                {/* Intro */}
                <p className="text-center text-zinc-400 text-lg max-w-4xl mx-auto leading-relaxed mb-16">
                    I’m <span className="text-white font-semibold">Ayush Gupta</span>, also known as{" "}
                    <span className="text-blue-500 font-semibold">Portraitwala</span> —
                    a visual storyteller capturing emotions, motion, and moments that don’t repeat.
                    From street photography to cinematic reels and events, my work is driven by story,
                    mood, and authenticity.
                </p>

                {/* Experience Cards */}
                <div className="grid sm:grid-cols-2 gap-8 mb-20">

                    <div className="relative p-6 rounded-2xl bg-zinc-900/60 backdrop-blur border border-zinc-800">
                        <Camera className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">Photography</h3>
                        <p className="text-zinc-400">
                            <span className="text-white font-semibold">6+ Years Experience</span>
                        </p>
                        <p className="mt-3 text-zinc-400 text-sm">
                            Street • Portrait • Event • Wildlife (Bird) • Motion • Travel
                        </p>
                    </div>

                    <div className="relative p-6 rounded-2xl bg-zinc-900/60 backdrop-blur border border-zinc-800">
                        <Video className="w-8 h-8 text-purple-500 mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">Video Editing</h3>
                        <p className="text-zinc-400">
                            <span className="text-white font-semibold">2+ Years Experience</span>
                        </p>
                        <p className="mt-3 text-zinc-400 text-sm">
                            Adobe Premiere Pro • Travel Vlogs • Reels • Short Films • Documentaries
                        </p>
                    </div>

                </div>

                {/* Specializations */}
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-2xl font-semibold text-center mb-10">
                        What I Specialize In
                    </h3>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">

                        <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                            <Film className="mx-auto mb-3 text-blue-500" />
                            <p className="text-zinc-300">Cinematic Storytelling</p>
                        </div>

                        <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                            <MapPin className="mx-auto mb-3 text-purple-500" />
                            <p className="text-zinc-300">Travel Vlog Editing</p>
                        </div>

                        <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                            <Feather className="mx-auto mb-3 text-blue-400" />
                            <p className="text-zinc-300">Short Documentary Style</p>
                        </div>

                    </div>
                </div>

            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
        </section>
    );
};

export default About;