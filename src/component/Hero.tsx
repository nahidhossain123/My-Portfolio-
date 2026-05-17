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
        <h1 className='font-bold text-2xl '>
          <span>Web & Mobile</span>
          <span className='ml-22 block'>App Developer</span>
        </h1>
        <h3 className='font-bold text-xl max-w-[400px]'>
          Frontend developer crafting animated, responsive, and immersive user interfaces using React, GSAP, and modern web technologies.
        </h3>
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