import { Monitor, Shield, Brain, Users, Globe, Cpu, Database, Languages, MessageSquare, Target } from "lucide-react";

const technicalSkills = [
  { icon: Monitor, label: "System Administration", desc: "Networks, servers, software" },
  { icon: Shield, label: "Cybersecurity", desc: "DDoS prevention, data integrity" },
  { icon: Cpu, label: "Programming", desc: "Python, C++" },
  { icon: Database, label: "SAP", desc: "Administration, ERP, MM, SD" },
  { icon: Globe, label: "Microsoft Office", desc: "Excel, PowerPoint, Outlook" },
  { icon: Brain, label: "Data Analysis", desc: "Digital safety & cyber resilience" },
];

const professionalSkills = [
  { icon: Target, label: "Decision-Making", desc: "Analytical thinking & initiative" },
  { icon: Users, label: "Leadership", desc: "Cross-functional collaboration" },
  { icon: MessageSquare, label: "Communication", desc: "Strong interpersonal skills" },
  { icon: Languages, label: "Languages", desc: "Bengali & English (Fluent)" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Technical <span className="gradient-text">Skills</span></h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">Computer & Technical Skills</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-16">
          {technicalSkills.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="glass-card rounded-xl p-6 text-center hover:border-primary/30 transition-colors group">
              <Icon size={28} className="text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm mb-1">{label}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-center mb-8">Professional <span className="gradient-text">Skills</span></h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {professionalSkills.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="glass-card rounded-xl p-6 text-center hover:border-primary/30 transition-colors group">
              <Icon size={28} className="text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm mb-1">{label}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
