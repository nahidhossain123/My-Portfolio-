'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SiteLogo from './SiteLogo';

const Loader = ({ onFinish }: { onFinish: () => void }) => {
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {


        const handleLoad = () => {
            const tl = gsap.timeline({
                onComplete: () => {

                    onFinish();
                },
            });

            tl.to(loaderRef.current, {
                y: '-100%',
                duration: 1.2,
                ease: 'power4.inOut',
            });
        };

        // 🔥 wait for full load
        if (document.readyState === 'complete') {
            setTimeout(() => {
                handleLoad();
            }, 1000);
        } else {
            // window.addEventListener('load', handleLoad);
        }

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 bg-gray-500 z-99 flex items-center justify-center"
        >
            <SiteLogo />
        </div>
    );
};

export default Loader;