import { Briefcase, Shield, Code, TrendingUp } from "lucide-react";

const highlights = [
  { icon: Briefcase, title: "3+ Years", desc: "IT & Marketing Experience" },
  { icon: Shield, title: "Cybersecurity", desc: "Google Certified" },
  { icon: Code, title: "B.Tech CSE", desc: "CGPA 3.75/4.00" },
  { icon: TrendingUp, title: "SAP Certified", desc: "SAP BTP by SAP Sapphire" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">About <span className="gradient-text-animated">Me</span></h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          A dynamic and purposeful professional with 3+ years of combined experience in the IT Department. Blending ability in software engineering with a solid foundation in Marketing. Adept at bridging the gap between technical development & brand strategy with a keen eye for innovation and user-focused solutions. Skilled at maintaining clear communication, cross-functional collaboration, and delivering high impact under pressure.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card rounded-xl p-8 text-center hover:border-primary/30 transition-colors group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl gradient-bg-subtle flex items-center justify-center group-hover:glow-shadow transition-shadow">
                <Icon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-1">{title}</h3>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
