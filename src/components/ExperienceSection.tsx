import { experiences } from "@/lib/experience";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Professional <span className="gradient-text-animated">Experience</span></h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {experiences.map((exp) => (
            <div key={exp.company} className="glass-card rounded-xl p-8 hover:border-primary/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                <span className="text-xs font-medium text-primary tracking-wide">{exp.period}</span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">{exp.company}</span>
              </div>
              {exp.group && <p className="text-sm text-muted-foreground mb-2">{exp.group}</p>}
              <h3 className="text-xl font-bold mb-3">{exp.title}</h3>
              {exp.endDate === null && (
                <p className="text-sm text-primary mb-4">Quality Management System</p>
              )}
              {exp.suggestedResponsibilities && (
                <h4 className="text-sm font-semibold mb-3">QMS focus areas</h4>
              )}
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
