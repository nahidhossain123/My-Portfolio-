import React, { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { useThree } from '@react-three/fiber';
import { Model } from './Keyboard';
import ExperienceCard from './ExperienceCard';
import SuperGlowText from './SoftBodyText';
import KnowMore from './KnowMore';
import ScrollingPaper from './ScrollingPaper';

gsap.registerPlugin(ScrollTrigger);

const AllScenes = () => {
    const meshRef = useRef();
    const [isZoomed, setIsZoomed] = useState(false);
    const animating = useRef(false);
    const scene1REf = useRef();
    const { camera } = useThree();
    const heroRef = useRef();
    const scene2Ref = useRef();
    const scene3Ref = useRef();
    const scene4Ref = useRef();
    const curlProgress = useRef({ value: 0 })

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "+=2000", // Increased to give room for 3 scenes
                pin: true,
                scrub: true,
                snap: {
                    // Snap points for 3 scenes: 0 (Scene 1), 0.5 (Scene 2), 1 (Scene 3)
                    snapTo: [0, 0.5, 1],
                    duration: 0.2,
                    delay: 0,
                    ease: "power1.inOut"
                }
            }
        });

        // --- TRANSITION 1: Scene 1 to Scene 2 ---
        // Scene 1 Zooms Out
        tl.to(heroRef.current.position, { z: 15, ease: "none" }, 0)
            .to(heroRef.current.scale, { x: 5, y: 5, z: 5, ease: "none" }, 0);

        // Scene 2 Zooms In
        tl.fromTo(scene2Ref.current.position, { z: -10 }, { z: 0, ease: "none" }, 0)
            .fromTo(scene2Ref.current.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, ease: "none" }, 0);


        // --- TRANSITION 2: Scene 2 to Scene 3 ---
        // Scene 2 Zooms Out (Starts at middle of timeline)
        tl.to(scene2Ref.current.position, { z: 15, ease: "none" }, 0.5)
            .to(scene2Ref.current.scale, { x: 5, y: 5, z: 5, ease: "none" }, 0.5);

        // Scene 3 Zooms In
        tl.fromTo(scene3Ref.current.position, { z: -10 }, { z: 0, ease: "none" }, 0.5)
            .fromTo(scene3Ref.current.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, ease: "none" }, 0.5);

        tl.to(scene3Ref.current.position, { y: 5 }, 1)
        tl.fromTo(curlProgress.current, { value: -5, ease: "none" }, { value: 5, ease: "none" }, 1)
        tl.to(scene4Ref.current.position, { y: 5 }, 1.5)
    }, [camera]);
    return (
        <>
            {/* Scene 1 */}
            <group ref={heroRef} position={[0, 0, 0]}>
                <ExperienceCard />
                <group position={[-0.8, 0, 0]}>
                    <SuperGlowText text="Hi I'm," position={[0, 0.5, 0]} />
                    <SuperGlowText text="Frontend Developer" size='100px' args={[4, 2, 64, 64]} position={[0, 0, 0]} />
                    <SuperGlowText text="Turning ideas into interactive digital experiences." size='40px' position={[0, -0.5, 0]} />
                </group>
            </group>

            {/* Scene 2 (start far away) */}
            <group ref={scene2Ref} position={[0, 0, 8]}>
                <SuperGlowText text="Skills" position={[0, 1.2, 0]} />
                <Model scale={3} />
            </group>
            <group ref={scene3Ref}>
                <SuperGlowText text="Know more about me" position={[0, 1.2, 0.5]} />
                <KnowMore />
            </group>
            <group ref={scene4Ref}>
                <ScrollingPaper curlProgress={curlProgress} />
            </group>
        </>
    );
}

export default AllScenes;