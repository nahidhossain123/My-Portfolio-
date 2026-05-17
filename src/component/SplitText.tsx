import React, { useRef } from 'react';
import gsap from 'gsap';

export const HeroText = () => {
    const imageRef = useRef(null);

    const handleHover = (side, active) => {
        const isJuan = side === 'juan';

        // 1. Expand the Container
        gsap.to(isJuan ? ".juan-box" : ".mora-box", {
            flex: active ? 3 : 1, // Be aggressive with the ratio
            duration: 0.8,
            ease: "expo.out"
        });

        // 2. Shrink the Other Container
        gsap.to(isJuan ? ".mora-box" : ".juan-box", {
            flex: active ? 0.5 : 1,
            duration: 0.8,
            ease: "expo.out"
        });

        // 3. SCALE THE TEXT (The missing piece)
        gsap.to(isJuan ? ".juan-text" : ".mora-text", {
            scale: active ? 1.2 : 1,
            letterSpacing: active ? "-0.05em" : "-0.02em",
            duration: 0.8,
            ease: "expo.out"
        });

        // 4. Image Change (Verbatim Reference)
        if (active) {
            // Logic for image_3cb77f.jpg
            gsap.to(imageRef.current, {
                autoAlpha: 0,
                duration: 0.2,
                onComplete: () => {
                    // Switch to image_3cb77f.jpg or your hover image
                    imageRef.current.src = isJuan ? "image_3cb77f.jpg" : "other_image.jpg";
                    gsap.to(imageRef.current, { autoAlpha: 1, duration: 0.3 });
                }
            });
        }
    };

    return (
        <div className="relative flex w-full h-screen bg-[#d9a88d] overflow-hidden">

            {/* Center Image */}
            <img
                ref={imageRef}
                src="image_3cb77f.jpg"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-80 pointer-events-none"
            />

            {/* Juan Section */}
            <div
                onMouseEnter={() => handleHover('juan', true)}
                onMouseLeave={() => handleHover('juan', false)}
                className="juan-box flex-1 flex items-center justify-center border-r border-black/10"
            >
                <h1 className="juan-text text-[15vw] font-bold uppercase select-none">Juan</h1>
            </div>

            {/* Mora Section */}
            <div
                onMouseEnter={() => handleHover('mora', true)}
                onMouseLeave={() => handleHover('mora', false)}
                className="mora-box flex-1 flex items-center justify-center"
            >
                <h1 className="mora-text text-[15vw] font-bold uppercase select-none">Mora</h1>
            </div>
        </div>
    );
};