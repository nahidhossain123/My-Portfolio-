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
    const planeRef = useRef(null);

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
        }, 0.03).from(planeRef.current, {
            opacity: 0,
            xPercent: 100,
            duration: 2,
            ease: "power2.out"
        }, 0.03);

    }, []);

    return (
        <section id="contact" ref={contactContainerRef} className="relative py-20 md:py-20 overflow-hidden">
            <div className="container mx-auto rounded-[100px] px-5 md:px-0">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                    <div className='my-20 md:my-40'>
                        <div>
                            <div className='overflow-hidden'>
                                <h2 ref={text1Ref} className="text-[20vw] md:text-[6vw] leading-none font-bold">
                                    Want to
                                </h2>
                            </div>
                            <div className='overflow-hidden'>
                                <h2 ref={text2Ref} className="text-[20vw] md:text-[6vw] leading-none font-bold">
                                    know more
                                </h2>
                            </div>
                            <div className='overflow-hidden'>
                                <h2 ref={text3Ref} className="text-[20vw] md:text-[6vw] leading-none font-bold">
                                    about me
                                </h2>
                            </div>
                        </div>
                        <div className='overflow-hidden'>
                            <p ref={text4Ref} className='text-2xl font-bold'>Feel Free to contact. I am ready to build something impactful</p>
                        </div>
                    </div>

                    <div ref={planeRef} className={`inline-block w-[40vw] md:w-[25vw] h-auto`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 160 113"
                            className="w-full h-full rotate-y-180"
                        >
                            {/* Background Cream/Paper Fill */}
                            <path
                                className="text-amber-100/90" /* Tailwind fallback color */
                                fill={'currentColor'}
                                d="M39.558 57.852c-6.279 2.745-9.301 18.233-10.028 25.633l30.128-4.658 9.611 11.807c1.55-.215 4.934-.889 6.075-1.871 1.425-1.228 13.074-8.424 14.008-9.05.748-.5 18.168-7.136 26.784-10.391l15.87-7.03 18.692-2.263 2.661-1.609c-.27-.63-2.732-3.014-10.426-7.497-7.693-4.484-51.767-15.092-72.842-19.835-1.816-.042-6.327.1-9.837 1-3.51.901-9.217 7.65-11.632 10.91l2.728 8.855 1.363 4.427c-1.769-.62-6.877-1.174-13.155 1.572Z"
                            />

                            {/* Sketch / Line Art Elements */}
                            <g className="text-stone-800" fill={'currentColor'}>
                                <path d="M58.124 44.003c9.422 1.341 18.924 2.08 28.37 3.22 4.692.565 9.37 1.248 14.057 1.87 4.717.63 9.428 1.284 14.11 2.124 2.615.47 5.21 1.033 7.804 1.609 1.331.294 2.658.593 3.99.877 1.119.237 2.283.297 3.276.93.449.285.738.728.674 1.28-.054.468-.394 1.019-.901 1.116-3.711.688-7.455.61-11.201.348-3.746-.262-7.576-.647-11.381-.778-8.233-.277-16.475-.187-24.706.143-8.296.337-16.605.488-24.9.83-3.896.158-7.79.46-11.684.609-1.671.064-3.37.11-4.898.832-.496.234-1.08.711-1.543 1.21a12.753 12.753 0 0 0-1.45 1.912c-3.568 5.658-5.716 12.52-6.206 19.11-.061.798-.092 1.592-.098 2.392l-2.156-1.54c8.29-1.693 16.634-3.086 24.925-4.774 8.29-1.688 16.517-3.51 24.761-5.35 8.189-1.828 16.388-3.61 24.584-5.412 8.198-1.8 16.374-3.682 24.596-5.376 4.066-.838 8.169-1.79 12.289-2.32 3.535-.453 7.217-.27 10.606-1.21.781-.218 1.575-.508 2.182-.822l-.236 2.688c-1.343-1.272-2.597-2.108-4.212-3.017-1.751-.985-3.574-1.826-5.421-2.61-3.651-1.549-7.358-3-11.037-4.477-8.566-3.435-17.386-6.206-26.313-8.529-8.97-2.336-18.06-4.208-27.19-5.801-2.145-.376-4.298-.705-6.44-1.1-1.97-.368-3.986-.78-5.944-.884-.972-.052-1.968-.052-2.931.1-.203.031-.065.011-.021.007-.123.024-.247.048-.373.078-.205.05-.408.108-.605.173-.478.16-.727.274-1.049.445-1.702.899-3.234 2.177-4.646 3.375-1.412 1.197-3.15 2.462-4.466 3.652-.725.66-1.324 1.31-1.72 2.117-.047.096-.2.535-.113.233-.047.168-.081.336-.12.506-.053.25.004-.254.002.004-.003.078-.007.151-.006.227 0 .208.023.413.037.62.03.333.016.094.002.022.02.107.043.212.072.32.041.164.081.323.13.483.138.445.3.882.476 1.31.336.812.566 1.25.995 2.133.758 1.566 1.329 3.112 1.818 4.774.377 1.282-.113 2.736-1.662 2.785-.916.03-1.718-.73-1.747-1.644-.03-.916.73-1.718 1.644-1.747l.085-.003-.86.265.057-.032-.588.637-.057.473c-.001.51-.034.623-.094.34-.037-.06-.048-.157-.073-.221-.063-.192-.137-.386-.196-.58-.123-.4-.2-.809-.34-1.203-.125-.363-.27-.715-.422-1.065-.034-.08-.07-.154-.104-.234-.118-.266.1.208-.027-.059l-.307-.645c-.79-1.628-1.706-3.285-2.059-5.074-.19-.956-.27-1.915-.055-2.873.232-1.032.796-1.954 1.428-2.785 1.232-1.624 3-2.736 4.552-4.017 1.445-1.194 3.09-2.692 4.742-3.855 1.653-1.163 3.573-2.074 5.672-2.36 2.098-.286 4.276-.023 6.355.301 2.04.314 4.066.727 6.1 1.066 9.262 1.539 18.485 3.346 27.598 5.603 9.198 2.28 18.274 5.03 27.13 8.399 3.963 1.507 7.874 3.152 11.81 4.731 3.935 1.579 7.481 3.106 10.774 5.47a19.189 19.189 0 0 1 2.034 1.668c.733.698.766 2.167-.236 2.688-3.401 1.769-7.238 2.004-10.997 2.255-3.942.263-7.572 1.007-11.499 1.784-8.231 1.633-16.414 3.495-24.606 5.31-8.264 1.834-16.542 3.608-24.803 5.45-8.24 1.838-16.484 3.678-24.75 5.4-8.328 1.73-16.695 3.226-25.051 4.79-1.028.19-2.058.39-3.087.59-1.03.2-2.172-.36-2.157-1.541.052-3.578.616-7.165 1.506-10.627.882-3.433 2.102-6.807 3.776-9.933 1.675-3.127 3.737-6.634 7.508-7.656 1.773-.478 3.629-.545 5.452-.597 1.975-.058 3.94-.222 5.915-.325 8.47-.449 16.946-.521 25.422-.819 8.408-.295 16.806-.492 25.217-.269 3.983.108 7.94.35 11.907.743 3.822.378 7.655.73 11.502.528a27.955 27.955 0 0 0 2.774-.29l-.571 2.448c-.744-.51-1.552-.56-2.507-.774-1.163-.292-2.317-.599-3.475-.905-2.34-.614-4.68-1.228-7.038-1.769-4.546-1.043-9.156-1.824-13.759-2.584s-9.287-1.62-13.951-2.299c-4.664-.678-9.3-1.239-13.95-1.858-5.28-.7-10.535-1.485-15.765-2.507-.154-.03-.098-.259.053-.237l-.01-.016Z"></path>
                                <path d="M142.136 61.06c-.812.03-1.492.397-2.175.8-.683.405-1.399.757-2.137 1.07-1.623.689-3.277 1.248-4.956 1.783-3.305 1.054-6.584 2.163-9.822 3.422-3.237 1.259-6.481 2.6-9.721 3.91-3.24 1.309-6.531 2.453-9.814 3.636-6.425 2.313-12.765 4.802-18.785 8.05a87.771 87.771 0 0 0-4.474 2.586c-1.105.687-2.211 1.37-3.22 2.195-.335.275.25-.216-.093.079l-.318.27c-.221.189-.44.373-.66.563-.555.469-1.11.937-1.688 1.372-.896.677-1.982 1.427-3.136 1.516-1.154.09-2.176-.61-3.033-1.298-.856-.687-1.676-1.562-2.436-2.419-.664-.751-1.316-1.52-1.977-2.277-.662-.756-1.358-1.538-1.95-2.362-.276-.384-2.865-3.592-3.096-4.003-.25-.45-.35-.857-.448-1.354-.074-.388.215-.838.66-.709.362.105.75.18 1.077.376.371.224.72.509 1.067.772.714.547 3.676 3.969 4.323 4.59.647.622 1.273 1.322 1.892 2.001.69.761 1.398 1.508 2.141 2.222a13.2 13.2 0 0 0 1.082.952c.077.057.386.255.01.015.083.05.163.107.248.162.132.077.769.359.23.146.062.026.14.043.208.048-.51-.059-.29-.019-.158-.032-.562.051-.051-.034.115-.08.352-.1-.32.179.024-.008.108-.06.217-.116.32-.175.269-.155.532-.326.782-.507.478-.337.935-.698 1.385-1.067.116-.094.227-.187.342-.281.374-.309-.232.198.132-.113.282-.24.566-.476.848-.716 2.233-1.87 4.857-3.291 7.416-4.66 6.06-3.252 12.442-5.79 18.921-8.06 3.288-1.153 6.58-2.294 9.865-3.459 3.284-1.165 6.538-2.415 9.825-3.572 3.612-1.27 7.259-2.402 10.975-3.321 1.84-.454 3.69-.889 5.514-1.392 1.525-.42 3.085-1.33 4.713-.992.183.038.15.31-.032.32l.014.001Z"></path>
                                <path d="M38.835 44.547c-1.89-.238-3.803-.109-5.7.029a61.971 61.971 0 0 0-5.849.728c-4.411.755-8.83 1.458-13.248 2.178-1.383.224-2.759.471-4.152.648-1.393.176-2.748.21-4.15.2-.587-.003-1.009-.92-.373-1.215 1.151-.535 2.275-1.016 3.493-1.378 1.219-.362 2.443-.617 3.685-.846 2.556-.472 5.13-.85 7.707-1.197 4.04-.541 8.165-.91 12.248-.815 2.197.05 4.4.377 6.473 1.108a.29.29 0 0 1-.133.564v-.004Z"></path>
                                <path d="M49.984 34.63c-2.052.176-4.088.505-6.148.594-2.001.09-4.01.185-6.01.323-4.02.283-8.029.665-12.06.72-.588.01-.683-.78-.164-.986 3.88-1.528 8.013-2.017 12.155-2.125a85.687 85.687 0 0 1 6.121.053c2.075.092 4.116.496 6.166.798.368.053.278.595-.065.624l.005-.002Z"></path>
                                <path d="M31.283 60.387c-3.484.153-6.976.615-10.4 1.237-1.759.32-3.518.583-5.259 1.02-.83.206-1.665.391-2.5.58-.834.19-1.722.265-2.598.377-.694.088-.836-.856-.37-1.202.733-.546 1.442-1.013 2.295-1.361.79-.32 1.607-.594 2.433-.795 1.856-.445 3.79-.86 5.694-1.014 3.605-.285 7.214-.148 10.77.52.364.068.295.621-.065.638Z"></path>
                                <path d="M59.976 66.82c-6.44 1.917-13.217 1.8-19.865 2.201-6.649.402-12.93 1.295-19.285 2.518-3.589.69-7.147 1.624-10.794 1.95-.601.054-.749-.748-.325-1.055 2.65-1.925 5.88-2.898 9.052-3.564 3.329-.7 6.709-1.16 10.084-1.546 3.18-.361 6.378-.71 9.574-.874 3.39-.179 6.799-.12 10.192-.082 3.75.04 7.532.096 11.278-.084.311-.014.388.454.09.54l-.001-.003Z"></path>
                                <path d="M57.223 88.522c-3.43.813-6.8 1.73-10.137 2.866a85.788 85.788 0 0 1-5.037 1.538c-.91.249-1.815.473-2.748.62-.933.148-1.844.06-2.764.045-1.042-.017-1.178-1.337-.288-1.724.891-.387 1.682-.865 2.579-1.16.832-.27 1.682-.481 2.528-.706 1.733-.462 3.468-.906 5.23-1.246 3.457-.663 7.103-1.281 10.613-.748.261.041.272.457.016.518l.008-.003Z"></path>
                                <path d="M42.022 51.51c-4.905.488-9.675 1.894-14.585 2.306-.703.059-1.096-1.056-.424-1.376 1.115-.537 2.229-.993 3.425-1.311a32.435 32.435 0 0 1 4.125-.807c2.5-.332 5.111-.474 7.546.3.49.156.429.838-.092.89l.005-.002Z"></path>
                                <path d="M145.037 74.082c-2.367-.53-4.759.198-7.052.76-2.683.66-5.375 1.214-8.03 1.991-2.59.757-5.15 1.681-7.806 2.193-1.183.229-2.375.43-3.563.642-.834.148-1.089.182-1.858.32-.701.125-1.401.255-2.107.364-.545.087.285-.056-.265.046-.167.029-.334.058-.504.092a25.28 25.28 0 0 1-1.372.229c-.598.08-1.12.17-1.73.285-1.226.233-2.359.465-3.514.96-.271.115-.44-.257-.282-.45.688-.852 1.61-1.591 2.504-2.218 1.038-.73 2.307-1.292 3.515-1.66 2.519-.767 5.13-1.102 7.721-1.517l.476-.079c-.266.042.069-.012.133-.023.364-.062.732-.126 1.099-.18.491-.075-.299.056.184-.03.099-.017.193-.032.291-.053.328-.061.651-.125.977-.193 1.514-.327 3.02-.664 4.537-.965 1.602-.317 3.212-.61 4.834-.817 1.336-.172 2.678-.28 4.013-.456 2.603-.346 5.462-.681 7.979.275.286.106.102.55-.183.489l.003-.005Z"></path>
                            </g>
                        </svg>
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