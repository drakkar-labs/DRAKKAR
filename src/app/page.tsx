import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Process from "@/components/sections/Process";
import TheLab from "@/components/sections/TheLab";
import AISystems from "@/components/sections/AISystems";
import ProjectsNew from "@/components/sections/ProjectsNew";
import Experiments from "@/components/sections/Experiments";
import Roadmap from "@/components/sections/Roadmap";
import Stack from "@/components/sections/Stack";
import OpenSource from "@/components/sections/OpenSource";
import Chile from "@/components/sections/Chile";
import FinalCTA from "@/components/sections/FinalCTA";
import Preloader from "@/components/ui/Preloader";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Chatbot from "@/components/ui/Chatbot";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Manifesto />
        <Process />
        <TheLab />
        <AISystems />
        <ProjectsNew />
        <Experiments />
        <Roadmap />
        <Stack />
        <OpenSource />
        <Chile />
        <FinalCTA />
      </main>
      <Footer />
      <ScrollToTop />
      <Chatbot />
    </>
  );
}
