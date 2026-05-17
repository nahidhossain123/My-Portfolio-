import React, { useRef, useEffect } from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { gsap } from 'gsap';

const LottieAnimated = ({
    src = "/SoftText.json",
    duration = 0.4,
    ease = "power1.out",
    containerClassName = "w-screen h-screen absolute top-0 left-0 flex justify-center items-end pb-40"
}) => {
    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const playhead = useRef({ progress: 0 });
    const rafId = useRef(null);
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

        const handleMouseMove = (e) => {
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
            <div className='w-[90%]'>
                <DotLottiePlayer
                    ref={playerRef}
                    autoplay={false}
                    loop={false}
                    src={src}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
};

export default LottieAnimated;