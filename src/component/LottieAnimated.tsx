import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import animationData from "./SoftText.json";
const LottieAnimated = ({
    duration = 0.4,
    ease = "power1.out",
    containerClassName = "w-full h-full absolute top-0 left-0 flex flex-col justify-end items-center pb-20"
}) => {
    const playerRef = useRef<LottieRefCurrentProps | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const playhead = useRef({ progress: 0 });
    const rafId = useRef(0);
    const lastX = useRef(0);

    useEffect(() => {
        const player = playerRef.current;
        const container = containerRef.current;

        if (!container || !player) return;

        // Debug: Log available methods
        setTimeout(() => {
            console.log('DotLottiePlayer instance:', player);
            console.log('Available methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(player)));
        }, 500);

        const handleMouseMove = (e: MouseEvent) => {
            if (!container || !player) return;

            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }

            rafId.current = requestAnimationFrame(() => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;

                if (Math.abs(x - lastX.current) < 1) return;
                lastX.current = x;

                const mouseProgress = Math.max(0, Math.min(1, x / rect.width));

                gsap.killTweensOf(playhead.current);

                gsap.to(playhead.current, {
                    progress: mouseProgress,
                    duration,
                    ease,
                    onUpdate: () => {
                        // Try all possible seek methods
                        console.log(playhead.current.progress * 30)
                        player.goToAndStop(playhead.current.progress * 30, true);
                    }
                });
            });
        };

        const handleMouseLeave = () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            if (rafId.current) cancelAnimationFrame(rafId.current);
            gsap.killTweensOf(playhead.current);
        };
    }, [duration, ease]);

    return (
        <div
            ref={containerRef}
            className={containerClassName}
            style={{ cursor: 'crosshair' }}
        >
            <div className='w-[92%]'>
                <Lottie
                    lottieRef={playerRef}
                    autoplay={false}
                    loop={false}
                    animationData={animationData}
                    style={{ width: '100%', height: '100%' }}
                />
                <h2 className='font-extrabold text-2xl text-end'>Web & Mobile App Developer</h2>
            </div>

        </div>
    );
};

export default LottieAnimated;