import gsap from 'gsap';
import React, { useRef } from 'react'

const SiteLogo = ({ firstName = "Nahid", lastName = "Hossain", testStyle = 'text-xl' }) => {
    const logoRef = useRef<HTMLDivElement>(null)
    const animateWave = () => {
        if (!logoRef.current) return;

        const letters = logoRef.current.querySelectorAll(".letter");

        gsap.to(letters, {
            y: -2,
            color: "#000000",
            stagger: {
                each: 0.1,
                repeat: 1,
                yoyo: true,
            },
            duration: 0.2,
            ease: "power2.inOut",
        });
    };
    return (
        <div onMouseEnter={animateWave} ref={logoRef} className={`flex items-center font-bold ${testStyle}`}>
            {firstName.split("").map((char, i) => (
                <span
                    key={i}
                    className="letter inline-block text-white transition-colors"
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
            <span className='mx-2 letter w-3 h-3 inline-block bg-white rounded-lg'></span>
            {lastName.split("").map((char, i) => (
                <span
                    key={i}
                    className="letter inline-block text-white transition-colors"
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </div>
    )
}

export default SiteLogo