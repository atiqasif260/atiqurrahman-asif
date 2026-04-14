const experiences = [
  {
    period: "04/2023 — Present",
    title: "Executive, IT Department",
    company: "Ztrios Technologies LTD",
    tasks: [
      "System Administration: Install, configure, and maintain networks and software systems",
      "Strategic Planning: Align IT initiatives with business goals and develop strategies",
      "Security & Data Integrity: Implement and manage security policies & data backups",
      "Technical Support: Resolve user hardware/software issues and provide technical assistance",
      "Vendor Management: Negotiate contracts and collaborate with external vendors",
      "Budgeting & Reporting: Determine IT equipment needs and manage the budget",
      "Project Management: Lead IT projects, such as system upgrades or migrations",
    ],
  },
  {
    period: "02/2022 — 03/2023",
    title: "Jr. Executive, IT Department",
    company: "Circle Network",
    tasks: [
      "System Administration: Install, configure, and maintain networks and software systems",
      "Technical Support: Networking (LAN/WAN), server management, and security protocols",
      "Security & Data Integrity: Implement and manage security policies & data backups",
      "Technical Support: Resolve user hardware/software issues and provide technical assistance",
      "Budgeting & Reporting: Determine IT equipment needs and manage the budget",
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
