'use client'
import React, { useState, useMemo, Suspense, useRef } from 'react';
import { Github, ExternalLink, Code, Database, Server } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import ExperienceCard from './ExperienceCard';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';



// --- Main Projects Component ---
const Experience: React.FC = () => {
    const experienceRef = useRef<HTMLDivElement>(null)
    const exp1Ref = useRef<HTMLDivElement>(null)
    const exp2Ref = useRef<HTMLDivElement>(null)
    const exp3Ref = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: experienceRef.current,
                start: "10% 50%",
                end: "90% 50%",
                scrub: true,
                markers: true,
                invalidateOnRefresh: true,
            }
        });

        tl.fromTo(
            exp1Ref.current,
            {
                rotationX: 90,
                transformPerspective: 2000,
                transformOrigin: "center center",
            },
            {
                rotationX: 0,
                ease: "none",
            },
            0
        );
        tl.fromTo(
            exp2Ref.current,
            {
                rotationX: 90,
                transformPerspective: 2000,
                transformOrigin: "center center",
            },
            {
                rotationX: 0,
                ease: "none",
            },
            0.1
        );
        tl.fromTo(
            exp3Ref.current,
            {
                rotationX: 90,
                transformPerspective: 2000,
                transformOrigin: "center center",
            },
            {
                rotationX: 0,
                ease: "none",
            },
            0
        );
        tl.to(
            cardsRef.current,
            {
                y: -100,
                ease: "none",
            },
            0.5
        );
    }, []);
    return (
        <section ref={experienceRef} id="projects" className="py-40  bg-white dark:bg-black container mx-auto">
            <div className='space-y-20'>
                <div className='max-w-[550px]'>
                    <p>Professional Experience</p>
                    <h2 className="text-[5vw] leading-[5vw] font-bold ">
                        Companies I Work With
                    </h2>
                </div>
                <div ref={cardsRef} className="flex gap-5">
                    <div ref={exp1Ref} className='space-y-5 w-full md:max-w-[40%] p-5 rounded-xl bg-gray-800 shadow-2xl backdrop-blur-2xl'>

                        <h3 className="text-5xl font-semibold">
                            Aspyrer.com, Canada
                        </h3>

                        <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-300">
                            Role : Software Engineer (Remote)
                        </p>
                        <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-300">
                            Duration : Jan 2023 — Present
                        </p>

                        <p className="mt-3 text-sm text-gray-600 leading-relaxed dark:text-gray-300">
                            Responsibilities : Worked on API integration, UI design, feature development, bug fixing, and performance optimization
                            across both React.js web applications and React Native mobile apps.
                        </p>
                    </div>
                    <div ref={exp2Ref} className='space-y-5 w-full md:max-w-[40%] p-5 rounded-xl bg-gray-800 shadow-2xl backdrop-blur-2xl'>

                        <h3 className="text-5xl font-semibold">
                            Dynamic Software Ltd.
                        </h3>

                        <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-300">
                            Role : Software Developer
                        </p>
                        <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-300">
                            Duration : Apr 2022 — Jan 2023
                        </p>

                        <p className="mt-3 text-sm text-gray-600 leading-relaxed dark:text-gray-300">
                            Responsibilities : Converted Figma designs into responsive user interfaces, developed and customized WordPress themes,
                            and collaborated on Laravel + React-based applications to build scalable frontend features.
                        </p>
                    </div>
                    <div ref={exp3Ref} className='space-y-5 w-full md:max-w-[40%] p-5 rounded-xl bg-gray-800 shadow-2xl backdrop-blur-2xl'>
                        <h3 className="text-5xl font-semibold">
                            Trenza Softwares
                        </h3>

                        <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Role:Software Engineer • Nov 2021 — Apr 2022
                        </p>
                        <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Duration : Nov 2021 — Apr 2022
                        </p>

                        <p className="mt-3 text-sm text-gray-600 leading-relaxed dark:text-gray-400">
                            Responsibilities: Translated Figma designs into responsive user interfaces and assisted in developing and customizing
                            WordPress themes, gaining hands-on experience in frontend development workflows.
                        </p>
                    </div>
                </div>
            </div>


        </section >
    );
};

export default Experience;