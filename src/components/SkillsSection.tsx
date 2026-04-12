import { Monitor, Shield, Brain, Users, Globe, Cpu } from "lucide-react";

const skills = [
  { icon: Monitor, label: "System Administration", desc: "Networks, servers, software" },
  { icon: Shield, label: "Cybersecurity", desc: "DDoS prevention, data integrity" },
  { icon: Cpu, label: "Programming", desc: "Python, C++" },
  { icon: Brain, label: "Strategic Planning", desc: "IT-business alignment" },
  { icon: Users, label: "Team Leadership", desc: "Cross-functional collaboration" },
  { icon: Globe, label: "Microsoft Office", desc: "Excel, PowerPoint, Outlook" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Technical <span className="gradient-text">Skills</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {skills.map(({ icon: Icon, label, desc }) => (
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
