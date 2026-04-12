import { Mail, MapPin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      <div className="container mx-auto px-6 relative z-10 pt-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-3/5 text-center lg:text-left animate-fade-in-up">
            <p className="text-primary font-medium mb-3 tracking-widest text-sm uppercase">Hello, I'm</p>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-2">
              Atiqur Rahman
            </h1>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 gradient-text">
              Asif
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              IT Professional with 3+ years of experience in system administration, cybersecurity, and strategic IT planning. B.Tech in Computer Science & Engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a href="#contact" className="px-8 py-3 gradient-bg rounded-full font-semibold text-sm text-primary-foreground glow-shadow hover:opacity-90 transition-opacity">
                Let's Talk
              </a>
              <a href="mailto:atiq.asif260@gmail.com" className="px-8 py-3 border border-border rounded-full font-semibold text-sm text-foreground hover:border-primary transition-colors">
                Download CV
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground justify-center lg:justify-start">
              <span className="flex items-center gap-2"><Mail size={14} className="text-primary" /> atiq.asif260@gmail.com</span>
              <span className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> Savar, Dhaka, Bangladesh</span>
            </div>
          </div>
          <div className="lg:w-2/5 flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full gradient-bg-subtle border border-primary/20 glow-shadow p-1.5">
              <img src={profilePhoto} alt="Atiqur Rahman Asif" className="w-full h-full rounded-full object-cover object-top" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
