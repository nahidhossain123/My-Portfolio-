'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText, { ExpandableHero, HeroSection, HeroText } from './SplitText';
import LottieAnimated from './TestJuanMora';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameLeftRef = useRef<HTMLHeadingElement>(null);
  const nameRightRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);



  return (
    <div className="min-h-screen relative px-16">
      <div className="flex justify-between space-y-6 pt-40">
        <h1 className='font-extrabold text-[5vw]'>
          HEY!
        </h1>
        <h1 className='font-extrabold text-[5vw]'>
          I'M
        </h1>
      </div>
      <div className="text-lg max-w-2xl mt-10">
        I'm a web and mobile app developer with a passion for creating intuitive and engaging digital experiences. With expertise in React, React Native, and Node.js, I specialize in building responsive and user-friendly applications that solve real-world problems. Let's work together to bring your ideas to life!
      </div>
      <LottieAnimated />

      {/* Scroll indicator */}
      <div className="flex justify-center mt-20 md:mt-32 pb-8">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

    </div>
  );
}