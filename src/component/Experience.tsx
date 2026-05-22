'use client'
import React, { useState, useMemo, Suspense, useRef, useEffect } from 'react';
import { Github, ExternalLink, Code, Database, Server } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import ExperienceCard from './ExperienceCard';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { dynamicExperience, jrnyfyExperience, trenzaExperience } from '../utils/experience';
import { motion } from "framer-motion";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(Draggable);
gsap.registerPlugin(ScrollTrigger);

// --- Main Projects Component ---
const Experience: React.FC = () => {
    const experienceRef = useRef<HTMLDivElement>(null)
    const expTextRef = useRef<HTMLHeadingElement>(null)
    const cardsRef = useRef<HTMLDivElement[] | null>([])
    const containerRef = useRef(null);


    useEffect(() => {
        const container = containerRef.current;
        const cards = cardsRef.current;

        // Set all cards pivot from top
        gsap.set(cards, {
            transformOrigin: "top center",
        });

        let lastX = 0;

        Draggable.create(container, {
            type: "x",
            inertia: true,

            onDrag() {
                let delta = this.x - lastX;
                lastX = this.x;

                // Apply swing to each card
                cards.forEach((card, i) => {
                    gsap.to(card, {
                        rotation: delta * 0.5, // control swing strength
                        duration: 0.6,
                    });
                });
            },

            onRelease() {
                // Swing back to rest
                cards.forEach((card) => {
                    gsap.to(card, {
                        rotation: 0,
                        duration: 1.2,
                        ease: "elastic.out(1, 0.3)",
                    });
                });

            },
        });
    }, []);
    const maxX = 500; // adjust based on your UI

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: experienceRef.current,
                start: "top 60%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            },
        });

        tl.fromTo(
            expTextRef.current,
            { yPercent: 100 },
            { yPercent: 0, duration: 0.8 }
        )

        tl.fromTo(
            containerRef.current,
            { xPercent: 50 },
            { xPercent: 0, duration: 0.8 },
            "-=0.4" // 👈 overlap for smoother effect
        );

    }, []);

    return (
        <section ref={experienceRef} className="experience  bg-white dark:bg-black mt-20 md:mt-40">
            <div className="overflow-hidden">
                <h2 ref={expTextRef} className="text-[16vw] md:text-[5vw] leading-none font-bold text-center mb-10">
                    <span className="block">Professional</span>
                    <span className="block">Experience</span>
                </h2>
            </div>

            <div className='relative'>
                <div className='absolute top-[156px] bg-[linear-gradient(0deg,black_0%,gray_50%,gray_100%)] w-full h-5' />
                <div className="w-full">
                    <div className="px-20 py-20 overflow-hidden">
                        <div
                            ref={containerRef}
                            className="flex gap-10 cursor-grab active:cursor-grabbing"
                        >
                            <ExperienceCard
                                ref={(el) => (cardsRef.current[0] = el)}
                                company="Jrnyfy Corp."
                                duration="3 Years"
                                start="Jan 2023"
                                end="Present"
                                service="WEB/APP"
                                items={jrnyfyExperience}
                                color='#085C34'
                            />
                            <ExperienceCard
                                ref={(el) => (cardsRef.current[1] = el)}
                                company="Dynamic Software Ltd."
                                duration="0.6 Year"
                                start="Jun 2021"
                                end="Dec 2023"
                                service="WEB"
                                items={dynamicExperience}
                                color='#221EB4'
                            />
                            <ExperienceCard
                                ref={(el) => (cardsRef.current[2] = el)}
                                company="Trenza Softwares."
                                duration="0.4 Year"
                                start="Mar 2024"
                                end="Present"
                                service="WEB"
                                items={trenzaExperience}
                                color='#721C1F'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Experience;