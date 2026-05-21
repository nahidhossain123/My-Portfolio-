import React from 'react';
import { Github, Linkedin, Twitter, Dribbble, LucideIcon } from 'lucide-react';
import SiteLogo from './SiteLogo';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);


/**
 * Interface for a single social link item
 */
interface SocialLink {
    name: string;
    url: string;
    Icon: LucideIcon; // Type for a Lucide icon component
}

// --- 2. Social Links Data (Replace URLs with your links) ---

const socialLinks: SocialLink[] = [
    {
        name: "GitHub",
        url: "https://github.com/nahidhossain123",
        Icon: Github,
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/nahid-hossain-05/",
        Icon: Linkedin,
    },
    // Add more as needed, e.g., Medium, Personal Blog
];


// --- 3. Footer Component ---

const Footer: React.FC = () => {
    const footerRef = React.useRef<HTMLDivElement>(null);
    const currentYear = new Date().getFullYear();
    const socialLinksRef = React.useRef<HTMLDivElement>(null);
    const siteLogoRef = React.useRef<HTMLDivElement>(null);
    const copyrightRef = React.useRef<HTMLDivElement>(null);

    useGSAP(() => {

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 60%",
                end: "bottom center",
                toggleActions: "play reverse play reverse",
            },
        });

        tl.from(socialLinksRef.current, {
            opacity: 0,
            yPercent: 100,
            duration: 1,
            ease: "power2.out"
        }, 0.03);
        tl.from(siteLogoRef.current, {
            opacity: 0,
            yPercent: 100,
            duration: 1,
            ease: "power2.out"
        }, 0.03);
        tl.from(copyrightRef.current, {
            opacity: 0,
            yPercent: 100,
            duration: 1,
            ease: "power2.out"
        }, 0.03);
    }, []);


    return (
        <footer ref={footerRef} className="bg-neutral-950 dark:bg-neutral-950 py-40">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={socialLinksRef} className="flex justify-center space-x-6 mb-6 overflow-hidden">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Connect on ${link.name}`}
                            // Tailwind classes for styling the icon and hover effect
                            className="text-gray-400 hover:text-indigo-500 transition-colors duration-300"
                        >
                            <link.Icon className="w-7 h-7" />
                        </a>
                    ))}
                </div>
                <div ref={siteLogoRef} className="flex justify-center mb-6 overflow-hidden">
                    <SiteLogo testStyle="!text-[5vw] !font-extrabold" />
                </div>
                {/* Copyright Text */}
                <div ref={copyrightRef} className="text-center text-gray-500 dark:text-gray-400 text-sm italic overflow-hidden">
                    <p>
                        &copy; {currentYear}  All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;