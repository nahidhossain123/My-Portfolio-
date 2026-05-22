'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LottieAnimated from './TestJuanMora';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameLeftRef = useRef<HTMLHeadingElement>(null);
  const nameRightRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from(text1Ref.current, {
      y: -100,
      opacity: 0,
      duration: 1
    }, 0)
    tl.to(descRef.current, {
      y: 0,
      opacity: 1,
      duration: 1
    }, 0)
  }, [])



  return (
    <div className="min-h-screen relative px-5 md:px-16 bg-neutral-950">
      <div ref={text1Ref} className="flex flex-col md:flex-row justify-between space-y-6 pt-40">
        <h1 className='font-extrabold text-center text-[30vw] md:text-[5vw]'>
          HEY!
        </h1>
        <h2 className='font-extrabold text-center text-[5vw]'>
          I'M
        </h2>
      </div>
      <div ref={descRef} className="hidden md:block text-lg max-w-2xl mt-10 overflow-hidden">
        I'm a web and mobile app developer with a passion for creating intuitive and engaging digital experiences. With expertise in React, React Native, and Node.js, I specialize in building responsive and user-friendly applications that solve real-world problems. Let's work together to bring your ideas to life!
      </div>
      <div className="hidden md:block">
        <LottieAnimated />
      </div>
      <div className="block md:hidden text-lg max-w-2xl mt-10">
        <h2 className='font-extrabold text-center text-[16vw]'>
          Nahid
        </h2>
        <h4 className='font-extrabold text-center text-[4vw]'>
          Web & App Developer
        </h4>
      </div>

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