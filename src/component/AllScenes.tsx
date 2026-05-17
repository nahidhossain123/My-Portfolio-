import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ExperienceCard from './ExperienceCard';
import { Model } from './Keyboard';
import KnowMore from './KnowMore';
import ScrollingPaper from './ScrollingPaper';
import SuperGlowText from './SoftBodyText';

gsap.registerPlugin(ScrollTrigger);

const AllScenes = () => {
    const heroRef = useRef();
    const scene2Ref = useRef();
    const scene3Ref = useRef();
    const scene4Ref = useRef();
    const curlProgress = useRef({ value: 0 })
    // We use a ref to store the "Target" progress so useFrame can pick it up
    const scrollData = useRef({ progress: 0, smoothedProgress: 0 });

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: ".hero",
            start: "top top",
            end: "+=10000",
            pin: true,
            // snap: {
            //     // This math divides the 0-1 range into equal segments for your scenes
            //     snapTo: 1 / (4 - 1),
            //     duration: { min: 0.5, max: 1.2 }, // This makes the snap feel "heavy"
            //     delay: 0.1, // Wait 0.1s after scrolling stops to snap
            //     ease: "power4.inOut" // The weighted mechanical feel
            // },
            onUpdate: (self) => {
                // self.progress is a value between 0 and 1
                scrollData.current.progress = self.progress;
            }
        });
    }, []);

    useFrame((state, delta) => {
        // 1. Smooth the progress (The 'Heavy' Logic)
        // 0.05 makes it feel very heavy/delayed. 0.1 is snappier.
        scrollData.current.smoothedProgress = THREE.MathUtils.lerp(
            scrollData.current.smoothedProgress,
            scrollData.current.progress,
            0.05
        );

        const p = scrollData.current.smoothedProgress;

        // 2. Logic to reveal/hide sections based on 'p'
        // SECTION 1 (0.0 to 0.25)
        if (heroRef.current) {
            heroRef.current.position.z = p * 20; // Fly towards camera
            heroRef.current.visible = p < 0.1; // Hide when past its segment
        }

        // SECTION 2 (0.25 to 0.50)
        if (scene2Ref.current) {
            // This section "activates" at 0.25
            const section2P = THREE.MathUtils.smoothstep(p, 0, 1);
            console.log('section2P', THREE.MathUtils.mapLinear(p, 0.2, 0.30, -2, 2))
            scene2Ref.current.position.z = THREE.MathUtils.mapLinear(p, 0.2, 0.30, -2, 2); // Fly in from back
            //scene2Ref.current.scale.setScalar(section2P);
            scene2Ref.current.visible = p > 0.1 && p < 0.3;
        }

        // SECTION 3 (0.50 to 0.75)
        if (scene3Ref.current) {
            const section3P = THREE.MathUtils.smoothstep(p, 0.3, 0.4);
            scene3Ref.current.position.y = (1 - section3P) * 15; // Fly in from bottom
            scene3Ref.current.visible = p > 0.2;
        }
        if (scene4Ref.current) {
            curlProgress.current.value = THREE.MathUtils.mapLinear(p, 0.4, 0.8, -5, 5); // Fly in from bottom
            if (p > 0.4) {
                scene3Ref.current.position.y = THREE.MathUtils.mapLinear(p, 0.5, 0.85, 0, -5); // Fly in from bottom
            }
            if (p > .8) {
                scene4Ref.current.position.y = THREE.MathUtils.mapLinear(p, 0.8, 1.0, 0, 5);
            }

            // scene4Ref.current.position.y = THREE.MathUtils.mapLinear(p, 0.85, 1, 0, 5); // Fly in from bottom
            scene4Ref.current.visible = p > 0.4;
        }
    });

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
                <SuperGlowText text="About Me" size='60px' position={[0, 1.2, 0.5]} />
                <KnowMore />
            </group>
            <group ref={scene4Ref}>
                <ScrollingPaper curlProgress={curlProgress} />
            </group>
        </>
    );
};

export default AllScenes;