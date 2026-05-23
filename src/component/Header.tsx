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
import { useLoader } from '../app/hooks/contextApi/LoaderContenxt';


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
    const startAnimation = useLoader();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const ThemeIcon = theme === 'dark' ? Sun : Moon;
    const { lenis } = useLenis();
    const lenisRef = useRef<Lenis | null>(null);
    const navRef = useRef<HTMLElement>(null);


    // useEffect(() => {
    //     const lenis = new Lenis({
    //         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    //         duration: 1.2,
    //     });

    //     lenisRef.current = lenis;

    //     function raf(time: number) {
    //         lenis.raf(time);
    //         requestAnimationFrame(raf);
    //     }
    //     requestAnimationFrame(raf);

    //     return () => lenis.destroy();
    // }, []);

    const tl = useRef<GSAPTimeline | null>(null);
    useGSAP(() => {
        tl.current = gsap.timeline({ paused: true })
        tl.current.from(navRef.current, {
            yPercent: 100,
            opacity: 0,
            duration: 1
        })

    }, [])

    useEffect(() => {
        if (startAnimation) {
            console.log('Animation')
            tl.current?.play();
        }
    }, [startAnimation]);

    return (
        <header className={`fixed w-full z-50`}>
            <div className="w-full">
                <nav ref={navRef} className="flex justify-center md:justify-between items-center px-8 py-6 md:px-16 md:py-8">
                    <SiteLogo />
                    <div className="hidden md:flex items-center  text-gray-300">
                        <a href="#about" className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full flex">About</a>
                        <span className='mx-1 letter w-6 h-6 inline-block bg-white rounded-lg'></span>
                        <a href="#works" className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full flex">Works</a>
                    </div>
                    <div className='hidden md:block'>
                        <Button text='Get In Touch' />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;