import { Briefcase, Shield, Code, TrendingUp, ClipboardCheck } from "lucide-react";

const highlights = [
  { icon: Briefcase, title: "3+ Years", desc: "IT & Marketing Experience" },
  { icon: Shield, title: "Cybersecurity", desc: "Google Certified" },
  { icon: Code, title: "B. Tech CSE", desc: "CGPA 3.75/4.00" },
  { icon: TrendingUp, title: "SAP Certified", desc: "SAP BTP by SAP Sapphire" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">About <span className="gradient-text-animated">Me</span></h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Currently working as a Junior Executive in the Quality Management System (QMS) Department at A ONE POLAR LIMITED, a concern of Micro Fibre Group. Bringing 3+ years of IT experience from Ztrios Technologies LTD and Circle Network, alongside a B.Tech in Computer Science & Engineering and a foundation in marketing. Combining technical knowledge with quality-focused processes, clear communication, and cross-functional collaboration.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
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
        <div className="max-w-5xl mx-auto mt-6 py-7 border-y border-primary/25 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <ClipboardCheck size={32} className="text-primary shrink-0" aria-hidden />
          <div>
            <h3 className="text-xl font-bold mb-2">Quality Management System (QMS)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Quality Assurance | Documentation Control | ISO Standards | Continuous Improvement</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
