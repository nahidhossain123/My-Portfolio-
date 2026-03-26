export default function AuroraBackground() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-slate-100 transition-bg">
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className={`
                            pointer-events-none
                            absolute -inset-2.5 opacity-50 blur-[30px] will-change-transform
                            [--aurora:repeating-linear-gradient(100deg,var(--color-blue-500)_10%,var(--color-indigo-300)_15%,var(--color-blue-300)_20%,var(--color-violet-200)_25%,var(--color-blue-400)_30%)]
                            [--dark-gradient:repeating-linear-gradient(100deg,var(--color-black)_0%,var(--color-black)_7%,transparent_10%,transparent_12%,var(--color-black)_16%)]
                            [background-image:var(--dark-gradient),var(--aurora)]
                            bg-position-[50%_50%,50%_50%]
                            bg-size-[300%,200%]
                            
                            after:absolute after:inset-0 after:animate-aurora after:mix-blend-difference after:content-[""]
                            after:bg-fixed
                            after:[background-image:var(--dark-gradient),var(--aurora)]
                            after:bg-size-[200%,100%]
                            
                            mask-[radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]
                        `}
                ></div>
            </div>
        </div>
    );
}