import Image from "next/image";
import Header from "./component/Header";
import Skills from "./component/Skills";
import Projects from "./component/Projects";
import Contact from "./component/Contact";
import Footer from "./component/Footer";
import Hero from "./component/Hero";
import About from "./component/About";
import CareerTimeline from "./component/CareerTimeline";

export default function Home() {
  return (
    <div className="dark:bg-black">
      <Header />
      <Hero name="Nahid Hossain" title="Front-End Developer" tagline="Engineering clean, efficient code for the modern web" ctaTargetId="#projects" />
      <Skills />
      <Projects />
      {/* <About /> */}
      {/* <CareerTimeline /> */}
      <Contact />
      <Footer />
    </div>
  );
}
