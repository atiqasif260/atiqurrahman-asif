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
            <p className="text-primary font-medium mb-3 tracking-[0.3em] text-xs uppercase flex items-center gap-2 justify-center lg:justify-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))] animate-pulse" />
              Hello, I'm
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-2 text-glow">
              Atiqur Rahman
            </h1>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 gradient-text-animated">
              Asif
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              IT Professional & Marketing Strategist with 3+ years of experience in system administration, cybersecurity, SAP, and brand strategy. B.Tech in Computer Science & Engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a href="#contact" className="relative px-8 py-3 gradient-bg rounded-full font-semibold text-sm text-primary-foreground glow-shadow-strong hover:scale-105 hover:opacity-95 transition-all overflow-hidden group">
                <span className="relative z-10">Let's Talk</span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </a>
              <a href="/Atiq_Asif_CV.pdf" download="Atiq_Asif_CV.pdf" className="px-8 py-3 rounded-full font-semibold text-sm text-foreground border border-border hover:border-primary hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)] transition-all">
                Download CV
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground justify-center lg:justify-start">
              <span className="flex items-center gap-2"><Mail size={14} className="text-primary" /> atiq.asif260@gmail.com</span>
              <span className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> Savar, Dhaka, Bangladesh</span>
            </div>
          </div>
          <div className="lg:w-2/5 flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative" style={{ animation: "float-slow 6s ease-in-out infinite" }}>
              <span className="absolute inset-0 rounded-full border border-primary/40" style={{ animation: "pulse-ring 2.8s ease-out infinite" }} />
              <span className="absolute inset-0 rounded-full border border-accent/30" style={{ animation: "pulse-ring 2.8s ease-out infinite", animationDelay: "1.4s" }} />
              <div className="ai-border w-64 h-64 md:w-80 md:h-80 rounded-full gradient-bg-subtle glow-shadow-strong p-1.5">
                <img src={profilePhoto} alt="Atiqur Rahman Asif" className="w-full h-full rounded-full object-cover object-center relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
