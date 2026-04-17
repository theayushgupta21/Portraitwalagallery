const Footer = () => {
    return (
        <footer className="py-12 bg-black border-t border-zinc-900/50 text-center">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-zinc-500 text-sm font-light">
                    © 2026 <span className="text-zinc-300 font-medium">Portraitwala</span>. All rights reserved.
                </p>
                <div className="h-[1px] w-12 bg-zinc-800 md:hidden" />
                <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em]">
                    Designed & Developed by <span className="hover:text-blue-500 transition-colors cursor-default">Ayush Gupta</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;