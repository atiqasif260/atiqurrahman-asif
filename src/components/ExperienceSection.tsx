const experiences = [
  {
    period: "04/2023 — Present",
    title: "Executive, IT Department",
    company: "Ztrios Technologies LTD",
    tasks: [
      "System administration: install, configure, and maintain networks & software",
      "Strategic planning aligned with business goals",
      "Security & data integrity management",
      "Technical support, vendor management & budget reporting",
      "Lead IT projects including system upgrades and migrations",
    ],
  },
  {
    period: "02/2022 — 03/2023",
    title: "Jr. Executive, IT Department",
    company: "Circle Network",
    tasks: [
      "Networking (LAN/WAN), server management & security protocols",
      "System administration and technical support",
      "Security policies, data backups & integrity management",
      "IT equipment budgeting and reporting",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Professional <span className="gradient-text">Experience</span></h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {experiences.map((exp) => (
            <div key={exp.company} className="glass-card rounded-xl p-8 hover:border-primary/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                <span className="text-xs font-medium text-primary tracking-wide">{exp.period}</span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">{exp.company}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{exp.title}</h3>
              <ul className="space-y-2">
                {exp.tasks.map((task, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
