// hooks/useScrollResistance.ts
import { useRef, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollResistanceConfig {
    scenes: number;
    thresholds: number[];
    velocityThreshold: number;
    springDuration: number;
    onSceneChange?: (sceneIndex: number) => void;
}

export const useScrollResistance = (config: ScrollResistanceConfig) => {
    const {
        scenes,
        thresholds,
        velocityThreshold = 0.3,
        springDuration = 0.6,
        onSceneChange,
    } = config;

    const state = useRef({
        velocity: 0,
        lastScrollTime: Date.now(),
        lastScrollY: 0,
        currentScene: 0,
        isLocked: false,
        scrollBuffer: 0,
        wheelTimeout: null as NodeJS.Timeout | null,
    });

    useLayoutEffect(() => {
        let wheelTimeout: NodeJS.Timeout;

        const handleWheel = (e: WheelEvent) => {
            const now = Date.now();
            const deltaTime = Math.max(now - state.current.lastScrollTime, 16);

            // Calculate velocity
            state.current.velocity = Math.abs(e.deltaY) / deltaTime;
            state.current.lastScrollTime = now;
            state.current.scrollBuffer += Math.abs(e.deltaY);

            // Get the ScrollTrigger instance
            const scrollTriggers = ScrollTrigger.getAll();
            if (scrollTriggers.length === 0) return;

            const st = scrollTriggers[0];
            const progress = st.progress;
            const currentSceneNum = Math.floor(progress * scenes);

            // Determine which transition zone we're in
            const threshold = thresholds[Math.min(currentSceneNum, thresholds.length - 1)];

            // Check if we meet both conditions to transition
            const hasEnoughDistance = state.current.scrollBuffer > threshold;
            const hasEnoughVelocity = state.current.velocity > velocityThreshold;

            if (hasEnoughDistance && hasEnoughVelocity && !state.current.isLocked) {
                // COMMIT to next scene
                state.current.isLocked = true;
                const nextScene = Math.min(currentSceneNum + 1, scenes - 1);
                const maxScroll = st.scrollTrigger.endTrigger.offsetHeight || window.innerHeight * 4;
                const targetScroll = (nextScene / (scenes - 1)) * maxScroll;

                gsap.to(window, {
                    scrollTo: { y: targetScroll, autoKill: false },
                    duration: springDuration,
                    ease: 'elastic.out(1, 0.4)',
                    onComplete: () => {
                        state.current.isLocked = false;
                        state.current.currentScene = nextScene;
                        state.current.scrollBuffer = 0;
                        onSceneChange?.(nextScene);
                    },
                });
            } else if (state.current.scrollBuffer > 30 && state.current.scrollBuffer < threshold && !state.current.isLocked) {
                // Not enough - prepare to rebound
                clearTimeout(wheelTimeout);
                wheelTimeout = setTimeout(() => {
                    if (!state.current.isLocked) {
                        state.current.isLocked = true;
                        const maxScroll = st.scrollTrigger.endTrigger.offsetHeight || window.innerHeight * 4;
                        const targetScroll = (currentSceneNum / (scenes - 1)) * maxScroll;

                        gsap.to(window, {
                            scrollTo: { y: targetScroll, autoKill: false },
                            duration: springDuration * 0.8,
                            ease: 'elastic.out(1, 0.5)',
                            onComplete: () => {
                                state.current.isLocked = false;
                                state.current.scrollBuffer = 0;
                            },
                        });
                    }
                }, 100);
            }

            // Reset buffer after timeout
            clearTimeout(state.current.wheelTimeout);
            state.current.wheelTimeout = setTimeout(() => {
                state.current.scrollBuffer = 0;
                state.current.velocity = 0;
            }, 200);
        };

        window.addEventListener('wheel', handleWheel, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (state.current.wheelTimeout) clearTimeout(state.current.wheelTimeout);
            clearTimeout(wheelTimeout);
        };
    }, [scenes, thresholds, velocityThreshold, springDuration, onSceneChange]);

    return { state };
};