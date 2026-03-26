'use client';
import { useState, useEffect } from 'react';
import AnimatedLogo from '../AnimatedLogo';
import { cn } from '@/src/utils';


export default function SplashScreen({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    if (!shouldRender) return <>{children}</>;
    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 z-40 flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out",
                    !isVisible ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
            >
                <AnimatedLogo />
            </div>
            {/* Pre-render children in the background so they are ready when logo fades */}
            <div className={!isVisible ? "opacity-100" : "opacity-0"}>
                {children}
            </div>
        </>
    );
}