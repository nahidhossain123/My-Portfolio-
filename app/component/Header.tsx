// Header.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useLenis } from './SmoothScrollProvider';
import Lenis from 'lenis'


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
    // useEffect(() => {
    //     document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    //     return () => { document.body.style.overflow = 'unset'; };
    // }, [isMenuOpen]);


    return (
        <header className={`fixed w-full z-50 transition-colors duration-300 opacity-0 animate-header-in backdrop-blur-2xl`}>
            <div className="w-full">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* --- Left: Logo --- */}
                        <div className="flex-shrink-0">
                            <a href="#hero" className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300 hover:text-indigo-500">
                                NAHID.DEV
                            </a>
                        </div>

                        {/* --- Right: Controls (Theme Toggle and Menu Button ONLY) --- */}
                        <div className="flex items-center space-x-4">

                            {/* REMOVED: The entire desktop navigation <nav className="hidden md:flex..."> block is gone. */}

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                aria-label="Toggle Dark/Light Mode"
                                className="p-2 rounded-full text-gray-700 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-500 transition-colors duration-300 relative z-10"
                            >
                                <ThemeIcon className="w-6 h-6" />
                            </button>

                            {/* Menu Button (Now the sole navigation trigger) */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Open Navigation Menu"
                                className="p-2 rounded-full text-gray-900 dark:text-white hover:text-indigo-500 transition-colors duration-300 relative z-10"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Mobile Menu Overlay (Remains the same, now serves all screen sizes) --- */}
            {isMenuOpen && (<div className={`flex w-full`}
            >
                <nav className="flex flex-wrap gap-5 space-y-8 p-10">
                    {navItems.map((item, index) => (
                        <a
                            key={item.label}
                            onClick={() => {
                                setIsMenuOpen(false)
                                if (lenisRef.current) {
                                    lenisRef.current.scrollTo(item.href);
                                }
                            }
                            }
                            className={`md:text-7xl sm:text-6xl font-extrabold text-[#656F83] border-b-6 border-transparent hover:border-b-gray-900 dark:text-white hover:text-gray-900 transition-colors duration-300 
                transform translate-x-10
                ${isMenuOpen ? 'animate-slide-in' : ''}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
                <div className='w-[50%]'>

                </div>
            </div>)}
        </header>
    );
};

export default Header;