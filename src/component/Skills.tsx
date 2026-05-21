'use client';
// Skills.tsx
import React, { Suspense, useEffect, useRef } from 'react';
import {
    Code, Type, Atom, Component, GitBranch, Palette, Zap, Server, SquareDashedKanban, FileText, Wrench
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import MySkillScene from './MySkillScene';
import { Environment, View } from '@react-three/drei';
import ScrollingPaper from './ScrollingPaper';
import { Model } from './Keyboard';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import GlobalCanvas from './ViewCanvas';

const Skills: React.FC = () => {
    const sectionRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const modelRef = useRef({ value: -4 })
    const [modelReady, setModelReady] = React.useState(false);
    const skillsText = "4+ years Of Experience, Building Strong Skills".split(" ");

    useGSAP(() => {
        const words = gsap.utils.toArray(".word");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=5000",
                scrub: true,
                pin: true,

            },
        });

        // 🔹 Word highlight (main effect)
        tl.to(words, {
            opacity: 1,
            stagger: 0.2,
            ease: "power2.out",
        });

        // 🔹 Move first text up
        tl.to(text1Ref.current, {
            y: "-120%",
            opacity: 0,
            duration: 1,
        });
        tl.fromTo(modelRef.current,
            { value: -4 },
            { value: 0 },
            2
        );


    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="h-screen bg-gray-50 dark:bg-black py-40"
        >
            <div className="flex justify-center items-center">
                <h2
                    ref={text1Ref}
                    className="text-[10vw] leading-none font-bold flex flex-wrap gap-x-6 container mx-auto"
                >
                    {skillsText.map((word, i) => (
                        <span key={i} className="word opacity-20">
                            {word}
                        </span>
                    ))}.
                    <button className="text-[10vw] leading-none  px-8 py-2 bg-white text-black rounded-full text-sm font-bold">
                        Click
                    </button>
                </h2>
            </div>
            <Suspense>
                <GlobalCanvas>
                    <MySkillScene yRef={modelRef} />
                </GlobalCanvas>
            </Suspense>
        </section >
    );
};

export default Skills;