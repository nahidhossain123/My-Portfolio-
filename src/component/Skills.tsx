'use client';
// Skills.tsx
import React, { Suspense, useEffect, useRef, useState } from 'react';
import MySkillScene from './MySkillScene';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import GlobalCanvas from './ViewCanvas';

const Skills: React.FC = () => {
    const sectionRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const modelRef = useRef({ value: -4 })
    const [modelReady, setModelReady] = React.useState(false);
    const skillsText = "4+ years Of Experience, Building Strong Skills".split(" ");
    const [text, setText] = React.useState('Click');
    const clickText = 'Another Click';
    const clickTextRef = useRef<HTMLSpanElement[]>([])
    const lettersRef = useRef<HTMLSpanElement[]>([])
    const clickOverlayRef = useRef<HTMLDivElement>(null)
    const hoverRef = useRef<HTMLSpanElement>(null)
    // const svgRef = useRef<HTMLDivElement>(null)
    // const pathRef = useRef()

    const [isModal, setIsModal] = useState(false)

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

    const btnRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (!btnRef.current) return
        const el = btnRef.current
        const clickOverlay = clickOverlayRef.current

        const hoverEl = hoverRef.current

        const tl = gsap.timeline({ paused: true })

        tl.to(clickTextRef.current, {
            opacity: 0,
        })
        tl.to(lettersRef.current, {
            y: "-9vw",
            duration: 0.3,
            stagger: {
                each: 0.1,
                from: "end", // 👈 starts from last element
            },
        }, 0)
        tl.fromTo(clickOverlay, {
            y: "100%",
            opacity: 1,
            scale: 0.5,
            duration: 1,
            ease: "expo.out",
        },
            {
                y: "0%",
                opacity: 1,
                scale: 1.6,
                duration: 1,
                ease: "expo.out",
            }

            , 0.2).to(hoverEl, {
                opacity: 1,
                duration: 0.1,
                ease: "expo.out",
            }, 0.3)

        const enter = () => tl.play()
        const leave = () => tl.reverse()



        el.addEventListener("mouseenter", enter)
        el.addEventListener("mouseleave", leave)

        return () => {
            el.removeEventListener("mouseenter", enter)
            el.removeEventListener("mouseleave", leave)
        }
    }, [])

    const onClick = () => {
        const tl = gsap.timeline()
        const hoverEl = hoverRef.current

        tl.to(hoverEl, {
            opacity: 0,
            duration: 0.5,
            ease: 'power1.inOut',
        })

        tl.fromTo(clickTextRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "expo.out",
            stagger: 0.1,
        }, {
            opacity: 1,
            duration: 0.5,
            ease: "expo.out",
            stagger: 0.1,
        })

    }

    // useEffect(() => {
    //     const path = pathRef.current

    //     const length = path.getTotalLength()

    //     // initial hidden state
    //     gsap.set(path, {
    //         strokeDasharray: length,
    //         strokeDashoffset: length,
    //     })

    //     // animate on scroll
    //     gsap.to(path, {
    //         strokeDashoffset: 0,
    //         ease: "none",
    //         scrollTrigger: {
    //             trigger: svgRef.current,
    //             start: "top 80%",
    //             end: "bottom 20%",
    //             scrub: 1.5, // smooth scroll sync
    //         },
    //     })
    // }, [])
    const handleModal = () => {
        setIsModal(!isModal)
    }

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="h-screen bg-gray-50 dark:bg-black py-40"
        >
            <div className=" flex justify-center items-center">
                <h2
                    ref={text1Ref}
                    className="absolute top-32 z-40 text-[16vw]  md:text-[10vw] space-y-5 leading-none font-bold flex flex-wrap gap-x-6 container mx-auto px-5 md:px-0"
                >
                    {skillsText.map((word, i) => (
                        <span key={i} className="word opacity-20">
                            {word}
                        </span>
                    ))}.
                    <button
                        ref={btnRef}
                        onClick={onClick}
                        className="relative overflow-hidden w-[40vw] h-[20vw] md:w-[26vw] md:h-[10vw] rounded-full font-bold bg-white"
                    >
                        {/* Default */}
                        <div className="absolute z-20 inset-0 flex items-center justify-center text-black">
                            {'Click'.split('').map((letter, i) => (
                                <span key={i}
                                    ref={(el) => { if (el) lettersRef.current[i] = el; }}
                                    className="default text-[10vw] leading-none will-change-transform">
                                    {letter}
                                </span>
                            ))}
                        </div>
                        <div ref={clickOverlayRef} className="absolute rounded-full inset-0 flex items-center justify-center bg-gray-600 text-black text-[10vw] leading-none will-change-transform" />



                        {/* Hover */}
                        <span ref={hoverRef} className="absolute inset-0 flex items-center justify-center text-white text-[2vw] leading-none opacity-0 will-change-transform">
                            Who is little curious?
                        </span>
                        {/* Hover */}
                        <div className="absolute inset-0 flex items-center justify-center text-white text-[2vw] leading-none will-change-transform">
                            {
                                clickText.split('').map((word, i) => (
                                    <span ref={(e) => {
                                        if (e) {
                                            clickTextRef.current[i] = e
                                        }
                                    }} key={i} className="will-change-transform opacity-0">
                                        {word}
                                    </span>
                                ))
                            }
                        </div>

                    </button>
                </h2>
            </div>
            {/* <div ref={svgRef}>
                <svg className="w-full h-auto" height="485" viewBox="0 0 1283 485" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        ref={pathRef}
                        d="M258 0V145C262.321 225.345 211 429 0 429M285 0V145C286.879 252.494 284.061 306.888 339 361C389.966 406.193 451 419 530 424C609 429 689 421 678 283C667 145 1181.34 181.55 940 283C698.661 384.45 869.57 461.259 1052 474C1174.61 467.02 1222.18 447.253 1275 388" stroke="white" strokeWidth="20" />
                </svg>
            </div> */}
            <Suspense>
                <GlobalCanvas>
                    <MySkillScene yRef={modelRef} onClick={handleModal} />
                </GlobalCanvas>
            </Suspense>
            {isModal && (<div className=" md:hidden fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white p-6 rounded">
                    <h2>Modal Title</h2>
                    <p>Canvas object clicked</p>

                    <button
                        onClick={() => {
                            setIsModal(false)
                        }}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>)}
        </section >
    );
};

export default Skills;