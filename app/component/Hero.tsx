'use client'
import React, { useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Lenis from 'lenis'

// --- 1. Define Props (if you pass data from parent component) ---
interface HeroProps {
  name: string;
  title: string;
  tagline: string;
  // This could be the ID of the next section, e.g., '#about' or '#projects'
  ctaTargetId: string;
}

// --- 2. Main Hero Component ---
const Hero: React.FC<HeroProps> = ({ name, title, tagline, ctaTargetId }) => {
  // const { lenis } = useLenis();
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
  return (
    // min-h-screen ensures it's full screen height
    // flex and items-center/justify-center center the content
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-center relative"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20">

        {/* --- Main Content --- */}
        <p className="text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400 font-medium mb-3">
          Hi, I'm
        </p>

        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          {name}
        </h1>

        <h2 className="text-2xl sm:text-3xl font-light text-gray-700 dark:text-gray-300 mb-8">
          {title}
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          {tagline}
        </p>

        {/* --- Call to Action Button --- */}
        <a
          onClick={() => {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(ctaTargetId, { duration: 1.5, offset: -70 });
            }
          }
          }
          className="inline-flex items-center space-x-2 px-8 py-3 text-lg font-bold rounded-full 
                     bg-indigo-600 text-white shadow-xl transition-all duration-300 
                     hover:bg-indigo-700 hover:shadow-2xl transform hover:scale-105"
        >
          <span>View My Work</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </a>

      </div>

      {/* --- Scroll Indicator (Optional) --- */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <a
          href={ctaTargetId}
          aria-label="Scroll down to the next section"
          className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 transition-colors duration-300"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

// --- Example Usage ---
/*
<Hero 
  name="Jane Doe" 
  title="Full Stack Web Developer"
  tagline="Building modern, responsive, and performant web applications with a focus on React and Node.js."
  ctaTargetId="#projects" // Links to the projects section
/>
*/

export default Hero;