import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => {
  return (
    <section id="top" className="relative flex items-center overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-3/5 text-center lg:text-left animate-fade-in-up">
            <p className="text-primary font-medium mb-3 tracking-[0.3em] text-xs uppercase flex items-center gap-2 justify-center lg:justify-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))] animate-pulse" />
              Hello, I'm
            </p>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight mb-5">
              Atiqur Rahman Asif
            </h1>
            <p className="text-2xl md:text-3xl font-semibold gradient-text-animated mb-5">QMS Professional &amp; IT Professional</p>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Junior Executive in the QMS Department at A ONE POLAR LIMITED, a concern of Micro Fibre Group. IT Professional & Marketing Strategist with 3+ years of experience in system administration, cybersecurity, SAP, and brand strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button asChild size="lg" className="gradient-bg rounded-full font-semibold glow-shadow"><a href="#contact">Let's Talk <ArrowUpRight /></a></Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-background/30 hover:bg-secondary hover:text-foreground"><a href="/Atiq_Asif_CV.pdf" target="_blank" rel="noopener noreferrer">Download CV <Download /></a></Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground justify-center lg:justify-start mb-10">
              <a href="mailto:atiq.asif260@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors justify-center"><Mail size={14} className="text-primary" /> atiq.asif260@gmail.com</a>
              <span className="flex items-center gap-2 justify-center"><MapPin size={14} className="text-primary" /> Savar, Dhaka, Bangladesh</span>
            </div>
            <dl className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              {[
                { v: "3+", l: "Years in IT" },
                { v: "3", l: "Credentials & Activities" },
                { v: "3.75", l: "CGPA (B.Tech)" },
              ].map((s) => (
                <div key={s.l} className="border-t border-border/70 px-1 pt-4 text-center">
                  <dd className="text-2xl font-bold gradient-text">{s.v}</dd>
                  <dt className="text-xs text-muted-foreground mt-1">{s.l}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:w-2/5 flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative" style={{ animation: "float-slow 6s ease-in-out infinite" }}>
              <span className="absolute -inset-4 rounded-full border border-primary/20" aria-hidden />
              <span className="absolute -inset-7 rounded-full border border-accent/10" aria-hidden />
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
