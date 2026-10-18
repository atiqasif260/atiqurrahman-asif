import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const Index = () => {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main>
        <HeroSection />
        <Reveal><AboutSection /></Reveal>
        <Reveal><ExperienceSection /></Reveal>
        <Reveal><SkillsSection /></Reveal>
        <Reveal><ProjectsSection /></Reveal>
        <Reveal><EducationSection /></Reveal>
        <Reveal><CertificationsSection /></Reveal>
        <Reveal><ContactSection /></Reveal>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
