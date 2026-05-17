// Header.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useLenis } from './SmoothScrollProvider';
import Lenis from 'lenis'
import IconButton from './icon/IconButton';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Button from './ui/Button';
import SiteLogo from './SiteLogo';


// --- Typescript Interfaces & Data (omitted for brevity) ---
interface HeaderProps { theme?: 'light' | 'dark'; toggleTheme?: () => void; navItems?: { label: string; href: string }[]; }
const defaultNavItems = [
    { label: 'HOME', href: '#hero' },
    // { label: 'ABOUT', href: '#about' }, 
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    // { label: 'EDUCATION', href: '#education' },
    { label: 'CONTACTS', href: '#contact' },];


const Header: React.FC<HeaderProps> = ({
    theme,
    toggleTheme,
    navItems = defaultNavItems
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const ThemeIcon = theme === 'dark' ? Sun : Moon;
    const { lenis } = useLenis();
    const lenisRef = useRef<Lenis | null>(null);
    const navRef = useRef<HTMLElement>(null);


    useEffect(() => {
        const lenis = new Lenis({
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            duration: 1.2,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        // Animate navigation in
        tl.from(navRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.8,
        }, 0);
    }, {})

    return (
        <header className={`fixed w-full z-50`}>
            <div className="w-full">
                <nav ref={navRef} className="flex justify-between items-center px-8 py-6 md:px-16 md:py-8">
                    <SiteLogo />
                    <div className="hidden md:flex gap-8 text-sm text-gray-300">
                        <a href="#about" className="hover:text-pink-400 duration-300">About</a>
                        <a href="#experience" className="hover:text-pink-400 duration-300">Experience</a>
                        <a href="#works" className="hover:text-pink-400 duration-300">Works</a>
                    </div>
                    <Button text='Get In Touch' />
                </nav>
            </div>
        </header>
    );
};

export default Header;