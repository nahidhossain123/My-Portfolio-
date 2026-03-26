// components/SmoothScrollProvider.tsx
'use client';

import React, { useRef, useEffect, createContext, useContext } from 'react';
import Lenis from 'lenis'

// Define the type for the context value
interface LenisContextType {
    lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextType>({ lenis: null });

// Custom hook to easily access the Lenis instance anywhere
export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProviderProps {
    children: React.ReactNode;
}

const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis instance
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            // Add other configuration options here
        });

        lenisRef.current = lenis;

        // Scroll animation loop using requestAnimationFrame
        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        // Cleanup on unmount
        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // The wrapper div is crucial in Next.js/React to ensure Lenis handles the scrollable container.
    return (
        <LenisContext.Provider value={{ lenis: lenisRef.current }}>
            {children}
        </LenisContext.Provider>
    );
};

export default SmoothScrollProvider;