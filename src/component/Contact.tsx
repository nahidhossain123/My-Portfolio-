'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import TelePhoneScene from './ImagePlane';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Define the shape of the form data (omitted for brevity)
interface ContactForm { name: string; email: string; message: string; }
interface FormErrors { name?: string; email?: string; message?: string; }

// --- Contact Details Data (Easily editable) ---
const contactInfo = [
    { icon: <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />, text: "nahid96hossain@gmail.com", href: "mailto:nahid96hossain@gmail.com" },
    { icon: <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />, text: " 01864322827", href: "mobile: 01864322827" },
];

// --- Main Contact Component ---
const Contact: React.FC = () => {
    const contactContainerRef = useRef(null);
    const cursorRef = useRef(null);
    const tl = useRef(null);
    // Quick references for ultra-smooth mouse tracking
    const xTo = useRef(null);
    const yTo = useRef(null);
    const [copied, setCopied] = useState(false);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const text3Ref = useRef(null);
    const text4Ref = useRef(null);

    const email = "nahid96hossain@gmail.com";

    useEffect(() => {
        // Initialize GSAP quickTo shortcuts after component mounts
        if (cursorRef.current) {
            xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" });
            yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" });
        }
    }, []);

    const handleMouseMove = (e) => {
        if (!contactContainerRef.current || !xTo.current || !yTo.current) return;

        // Get boundaries of the card container
        const rect = contactContainerRef.current.getBoundingClientRect();

        // Calculate precise mouse coordinates relative to this container
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Define the offset (distance) you want maintained from the pointer.
        const gap = 20;

        // Push the offset coordinates to the GSAP pipeline.
        // Adding 'gap' pushes the text 20px to the right and 20px down from the pointer tip.
        gsap.to(cursorRef.current, {
            x: mouseX + gap,
            y: mouseY + gap,
            duration: 0.6,       // Time it takes to travel to the point
            delay: 0.08,         // Literal time delay before moving (e.g., 80ms behind your wrist)
            ease: "power2.out",
            overwrite: "auto"    // Crucial: Kills previous mouse moves so animations don't stack up
        });
    };

    const handleMouseEnter = (e) => {
        if (!cursorRef.current || !contactContainerRef.current) return;
        const q = gsap.utils.selector(contactContainerRef);

        // Snap to the cursor position immediately on initial entry 
        // so it doesn't do a giant lag jump from the top-left (0,0) corner
        const rect = contactContainerRef.current.getBoundingClientRect();
        const initX = e.clientX - rect.left + 20;
        const initY = e.clientY - rect.top + 20;
        gsap.set(cursorRef.current, { x: initX, y: initY });

        // Fade and scale up the text smoothly over 0.4 seconds
        gsap.to(cursorRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
        });
        if (!tl.current) {
            tl.current = gsap.timeline({ paused: true })
                .to(q('.overlay'), {
                    height: '100%',
                    duration: 0.4,
                    ease: 'power2.out'
                }, 0)
                .fromTo(q('.char'),
                    { opacity: 0, y: 15 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        stagger: 0.03,
                        ease: 'power1.out'
                    },
                    0.1
                );
        }
        tl.current.play();
    };


    const handleMouseLeave = () => {
        gsap.to(cursorRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
        if (tl.current) {
            tl.current.reverse();
        }
    };

    const handleCopy = async () => {
        try {
            // 1. Copy text to user's native clipboard
            await navigator.clipboard.writeText(email);
            setCopied(true);

            // 2. Add a sweet little GSAP visual pop feedback on click
            gsap.fromTo(cursorRef.current,
                { scale: 0.8 },
                { scale: 1, duration: 0.3, ease: "back.out(2)" }
            );

            // 3. Reset the text back to "Copy Text" after 1.5 seconds
            setTimeout(() => {
                setCopied(false);
            }, 1500);

        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    useGSAP(() => {

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: contactContainerRef.current,
                start: "top center",
                end: "bottom center",
                toggleActions: "play reverse play reverse",
            },
        });

        tl.from(text1Ref.current, {
            opacity: 0,
            yPercent: 100,
            duration: 2,
            ease: "power2.out"
        }, 0.03);
        tl.from(text2Ref.current, {
            opacity: 0,
            yPercent: 100,
            duration: 2,
            ease: "power2.out"
        }, 0.03);
        tl.from(text3Ref.current, {
            opacity: 0,
            yPercent: 100,
            duration: 2,
            ease: "power2.out"
        }, 0.03);
        tl.from(text4Ref.current, {
            opacity: 0,
            yPercent: 100,
            duration: 2,
            ease: "power2.out"
        }, 0.03);

    }, []);


    return (
        <section id="contact" ref={contactContainerRef} className="relative py-20 md:py-20  ">
            <div className="container mx-auto rounded-[100px] px-5 md:px-0">
                <div className='my-20 md:my-40'>
                    <div>
                        <div className='overflow-hidden'>
                            <h2 ref={text1Ref} className="text-[10vw] md:text-[6vw] leading-none font-bold">
                                Want to
                            </h2>
                        </div>
                        <div className='overflow-hidden'>
                            <h2 ref={text2Ref} className="text-[10vw] md:text-[6vw] leading-none font-bold">
                                know more
                            </h2>
                        </div>
                        <div className='overflow-hidden'>
                            <h2 ref={text3Ref} className="text-[10vw] md:text-[6vw] leading-none font-bold">
                                about me
                            </h2>
                        </div>
                    </div>
                    <div className='overflow-hidden'>
                        <p ref={text4Ref} className='text-2xl font-bold'>Feel Free to contact. I am ready to build something impactful</p>
                    </div>
                </div>

                <div
                    ref={contactContainerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    onClick={handleCopy}
                    className='relative rounded-xl overflow-hidden border p-5 cursor-pointer'
                >
                    <div
                        ref={cursorRef}
                        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full pointer-events-none scale-0 opacity-0 z-40 whitespace-nowrap shadow-md"
                    >
                        {copied ? 'Awesome! Copied! ✓' : 'Copy Email'}
                    </div>
                    {/* Background White Overlay (Starts at height 0) */}
                    <div className='overlay absolute left-0 bottom-0 w-full h-0 bg-white z-0 pointer-events-none' />

                    {/* Main Content (Wrapped in z-10 so it stays above the overlay) */}
                    <div className='relative z-10'>
                        <div className='flex justify-between items-center'>
                            <Image
                                src="/icon-right-arrow.svg"
                                alt="Contact Image"
                                width={30}
                                height={30}
                                className='w-10 md:w-20 h-auto'
                            />
                            <h4 className='text-[4vw] md:text-[2vw] font-extrabold'>Book a Discovery Call</h4>
                        </div>

                        {/* Email Display Container */}
                        <h4 className='absolute left-0 bottom-0 top-0 m-auto z-10 text-[4vw] leading-none font-extrabold text-black select-none pointer-events-none min-h-[5vw] flex flex-wrap'>
                            {email.split("").map((char, index) => (
                                <span
                                    key={index}
                                    className="char inline-block opacity-0"
                                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                                >
                                    {char}
                                </span>
                            ))}
                        </h4>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default Contact;