import { ShieldCheck, Network } from "lucide-react";

const projects = [
  {
    icon: ShieldCheck,
    title: "Prevention of DDoS & Professional Cyber Security",
    desc: "Researched and implemented strategies for DDoS attack prevention and professional-grade cybersecurity measures.",
  },
  {
    icon: Network,
    title: "Cisco Certified Entry Networking Technician (CCENT)",
    desc: "Completed Cisco CCENT certification program covering networking fundamentals, routing, and switching.",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="gradient-text-animated">Projects</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {projects.map((project) => (
            <div key={project.title} className="glass-card rounded-xl p-8 hover:border-primary/30 transition-colors group">
              <div className="w-12 h-12 mb-4 rounded-xl gradient-bg-subtle flex items-center justify-center group-hover:glow-shadow transition-shadow">
                <project.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
