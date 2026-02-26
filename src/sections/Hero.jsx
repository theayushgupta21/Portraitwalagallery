import ThreeBackground from "../compornetns/ThreeBackground";

const Hero = () => {

    const scrollToSkills = () => {
        const section = document.getElementById("skills");
        section?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black px-6">
            <ThreeBackground />


            {/* Glow Background */}
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[160px]" />
            <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[160px]" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl text-center">

                {/* Name */}
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                    Ayush
                    <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Gupta
                    </span>
                </h1>

                {/* Alias */}
                <p className="mt-4 text-lg md:text-xl uppercase tracking-[0.3em] text-zinc-400">
                    (Portraitwalagallery)
                </p>

                {/* Divider */}
                <div className="mx-auto mt-6 h-[1px] w-24 bg-gradient-to-r from-blue-500 to-purple-600" />

                {/* Tagline */}
                <p className="mt-8 text-zinc-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                    Photographer • Video Editor • Visual Storyteller
                    <br />
                    <span className="text-zinc-500">
                        Crafting cinematic visuals that capture emotion, motion & moments.
                    </span>
                </p>

                {/* CTA Buttons */}
                <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">

                    {/* VIEW WORK */}
                    <button
                        onClick={scrollToSkills}
                        className="group relative px-10 py-4 rounded-full 
                        bg-gradient-to-r from-blue-600 to-purple-600 
                        font-semibold overflow-hidden 
                        hover:scale-105 transition duration-300 
                        shadow-lg hover:shadow-blue-500/40"
                    >
                        <span className="relative z-10">View Work</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
                    </button>

                    {/* COLLAB */}
                    <button
                        onClick={scrollToSkills}
                        className="px-10 py-4 rounded-full border border-zinc-700 
                        text-zinc-300 hover:border-blue-500 hover:text-white 
                        hover:scale-105 transition duration-300"
                    >
                        Let’s Collaborate
                    </button>

                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
        </section>
    );
};

export default Hero;