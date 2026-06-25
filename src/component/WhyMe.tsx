import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';

// Register ScrollTrigger explicitly to prevent tree-shaking issues
gsap.registerPlugin(ScrollTrigger);

const WhyMe = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const introLayerRef = useRef<HTMLDivElement>(null);
    const contentLayerRef = useRef<HTMLDivElement>(null);

    const introText1Ref = useRef<HTMLHeadingElement>(null);
    const introText2Ref = useRef<HTMLHeadingElement>(null);
    const introBorderRef = useRef<HTMLDivElement>(null);
    const introText3Ref = useRef<HTMLHeadingElement>(null);

    // Grouping our list rows for cleaner DOM mapping
    const rowsData = [
        { title: "Why Choose Me?", },
        { title: "perspective + sharp instincts", isHeader: true },
        { title: "I bring a premium and unique visual" },
        { title: "I care about the craft and details" },
        { title: "I define scale and scope of the project" },
        { title: "I align your goals with the best practices and trends" },
    ];

    // Maintain an array of row element targets
    const rowRefs = useRef<HTMLDivElement[]>([]);
    const rowBorderRefs = useRef<HTMLDivElement[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Create the master timeline linked to scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                end: "+=3500", // Slightly longer scroll footprint for butter-smooth pacing
                scrub: 1,      // Smooth, catch-up value

            },
        });
        const pin = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=3500", // Slightly longer scroll footprint for butter-smooth pacing
                scrub: 1,      // Smooth, catch-up value
                pin: true,
                anticipatePin: 1,
                // markers: true, // Uncomment for debugging scroll positions
            },
        });

        // Query structural arrays safely for GSAP targeting
        // This extracts all inner word span tags we generate below
        const intro1Words = introText1Ref.current?.querySelectorAll('.word') || [];
        const intro2Words = introText2Ref.current?.querySelectorAll('.word') || [];
        const intro3Words = introText3Ref.current?.querySelectorAll('.word') || [];

        // -------------------------------------------------------------
        // 🛠️ SETUP INITIAL STATES (Prevents flash of unstyled content)
        // -------------------------------------------------------------
        gsap.set([intro1Words, intro2Words, intro3Words], { opacity: 0, y: 40, filter: "blur(8px)" });
        gsap.set(contentLayerRef.current, { opacity: 0 });

        rowRefs.current.forEach((row) => {
            const words = row.querySelectorAll('.word');
            gsap.set(words, { opacity: 0, y: 30, filter: "blur(6px)" });
        });
        rowBorderRefs.current.forEach((border) => {
            gsap.set(border, { scaleX: 0, transformOrigin: "left center" });
        });

        // -------------------------------------------------------------
        // 🎬 PHASE 1: INTRO TEXT SLIDE & REVEAL
        // -------------------------------------------------------------
        tl.fromTo(introText1Ref.current, { x: "50%" }, { x: "-20%", ease: "none" }, 0)
            .fromTo(introText2Ref.current, { x: "-50%" }, { x: "20%", ease: "none" }, 0)
            .to(intro1Words, { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.03, ease: "power2.out" }, 0)
            .to(intro2Words, { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.03, ease: "power2.out" }, 0.1);

        // 🎬 PHASE 2: MIDDLE LINE & SUBTEXT
        tl.fromTo(introBorderRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power3.inOut" }, ">-=0.2")
            .to(intro3Words, { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.02, ease: "power2.out" }, ">-=0.1");

        // 🎬 PHASE 3: OUTRO FADE FOR INTRO LAYER
        tl.to(introLayerRef.current, { opacity: 0, y: -50, filter: "blur(10px)", duration: 0.8, ease: "power3.in" }, ">+=0.5");

        // 🎬 PHASE 4: ENTER CONTENT LAYER (Cross-fade)
        tl.to(contentLayerRef.current, { opacity: 1, duration: 0.4 }, "<+=0.3");

        // 🎬 PHASE 5: SEQUENTIAL ROW ANIMATION (The Senior Secret)
        rowRefs.current.forEach((row, index) => {
            const words = row.querySelectorAll('.word');
            const border = rowBorderRefs.current[index];

            // Stagger line entries cleanly relative to one another
            const rowTimeline = gsap.timeline();

            rowTimeline.to(words, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                stagger: 0.03,
                ease: "power3.out",
                duration: 0.8
            });

            if (border) {
                rowTimeline.to(border, {
                    scaleX: 1,
                    duration: 0.8,
                    ease: "power2.out"
                }, "<+=0.1");
            }

            tl.add(rowTimeline, `>+=${index === 0 ? 0.2 : 0.4}`);
        });

        // Add a small spacer buffer timeline-end so the last row stays readable before unpinning
        tl.to({}, { duration: 0.5 });

    }, { scope: containerRef }); // Context scoping cleans up timelines automatically on unmount

    // Helper to turn strings into animated word-blocks safely
    const splitWords = (text: string) => {
        return text.split(" ").map((word, i) => (
            <span key={i} className="word inline-block whitespace-nowrap">
                {word}&nbsp;
            </span>
        ));
    };

    return (
        <div ref={containerRef} className="h-screen w-full overflow-hidden relative bg-neutral-950 text-white select-none px-5 md:px-0">

            {/* LAYER 1: INTRO ANIMATION */}
            <div ref={introLayerRef} className="hidden md:flex absolute inset-0 flex-col justify-center items-center px-4 z-10 w-full">
                <div className="w-full flex flex-col items-center">
                    <h3 ref={introText1Ref} className="text-[14vw] font-bold tracking-tighter leading-none">
                        {splitWords("Experience to")}
                    </h3>
                    <h3 ref={introText2Ref} className="text-[14vw] font-bold tracking-tighter leading-none">
                        {splitWords("Excellence")}
                    </h3>

                    <div ref={introBorderRef} className="w-full border-t border-neutral-700 my-8 origin-left" />

                    <h4 ref={introText3Ref} className="text-center text-lg md:text-xl text-neutral-400 max-w-md tracking-wide font-light">
                        {splitWords("Let's Create Something Amazing Together!")}
                    </h4>
                </div>
            </div>

            {/* LAYER 2: THE "WHY ME" REVEAL LIST */}
            <div ref={contentLayerRef} className="container mx-auto absolute inset-0 left-0 flex flex-col justify-center items-start z-0 w-full initialization-hidden px-5 md:px-0">
                <div className="w-full space-y-2">
                    {rowsData.map((row, index) => (
                        <div key={index} className="w-full block py-4">
                            <div ref={(el) => { if (el) rowRefs.current[index] = el; }}>
                                {row.isHeader ? (
                                    <h3 className="text-[12vw] md:text-[5vw] font-bold tracking-tight text-neutral-200 uppercase mb-4">
                                        {splitWords(row.title)}
                                    </h3>
                                ) : (
                                    <h5 className="text-xl md:text-2xl text-neutral-400 font-medium tracking-normal hover:text-white transition-colors duration-300">
                                        {splitWords(row.title)}
                                    </h5>
                                )}
                            </div>

                            {/* Do not render a bottom line under the final item */}
                            {index < rowsData.length - 1 && (
                                <div
                                    ref={(el) => { if (el) rowBorderRefs.current[index] = el; }}
                                    className="w-full border-t border-neutral-800 mt-4"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default WhyMe;