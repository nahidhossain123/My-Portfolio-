'use client'
import Image from "next/image";
import Header from "./component/Header";
import Skills from "./component/Skills";
import Projects from "./component/Projects";
import Contact from "./component/Contact";
import Footer from "./component/Footer";
import Hero from "./component/Hero";
import About from "./component/About";
import CareerTimeline from "./component/CareerTimeline";
import Experience from "./component/Experience";
import AnimatedSVG from "./component/AnimatedLogo";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const MIN_TIME = 3000;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(MIN_TIME - elapsed, 0);

      setTimeout(() => {
        setLoading(false);
      }, remaining);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (loading) {
    return <div className="h-screen w-screen flex justify-center items-center bg-black">
      <AnimatedSVG />
    </div>;
  }
  return (
    <div className="dark:bg-black">
      <Header />
      <Hero name="Nahid Hossain" title="Front-End Developer" tagline="Engineering clean, efficient code for the modern web" ctaTargetId="#projects" />
      <Skills />
      <Projects />
      <Experience />
      {/* <About /> */}
      {/* <CareerTimeline /> */}
      <Contact />
      <Footer />
    </div>
  );
}
