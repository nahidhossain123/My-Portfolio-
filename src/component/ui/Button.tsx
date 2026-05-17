import React, { useRef } from "react";
import gsap from "gsap";

interface ButtonPropsType {
    text: string;
    onClick?: () => void;
}

const Button = ({ text, onClick }: ButtonPropsType) => {
    const btnRef = useRef<HTMLButtonElement>(null);

    const animateWave = () => {
        if (!btnRef.current) return;

        const letters = btnRef.current.querySelectorAll(".letter");

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
        <button
            ref={btnRef}
            onMouseEnter={animateWave}
            onClick={onClick}
            className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full flex"
        >
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className="letter inline-block text-white transition-colors"
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </button>
    );
};

export default Button;