'use client'
import Header from "../component/Header";
import Hero from "../component/Hero";
import Projects from "../component/Projects";
import Experience from "../component/Experience";
import Contact from "../component/Contact";
import Footer from "../component/Footer";
import Skills from "../component/Skills";
import AuroraBackground from "../component/AuroraBackground";

export default function Home() {
  return (
    <div className="dark:bg-black">
      <div className="absolute h-full w-full bg-black">
        <AuroraBackground />
      </div>
      <Header />
      <Hero name="Nahid Hossain" title="Front-End Developer" tagline="Engineering clean, efficient code for the modern web" ctaTargetId="#projects" />
      <Skills />
      <Projects />
      <Experience />
      {/* <About />
      <CareerTimeline /> */}
      <Contact />
      <Footer />
      {/* <Suspense>
        <div className="fixed inset-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
            <Scene />
          </Canvas>
        </div>
      </Suspense> */}
    </div>
  );
}
