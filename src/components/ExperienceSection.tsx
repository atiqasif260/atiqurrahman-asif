import { experiences } from "@/lib/experience";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Professional <span className="gradient-text-animated">Experience</span></h2>
        <ol className="relative max-w-3xl mx-auto border-l border-primary/20 ml-3 md:mx-auto space-y-10">
          {experiences.map((exp) => {
            const current = exp.endDate === null;
            return (
              <li key={exp.company} className="relative pl-8 md:pl-10">
                <span
                  className={`absolute -left-[9px] top-8 w-4 h-4 rounded-full border-2 border-primary ${current ? "bg-primary shadow-[0_0_14px_hsl(var(--primary))] animate-pulse" : "bg-background"}`}
                  aria-hidden
                />
                <div className={`glass-card rounded-xl p-6 md:p-8 ${current ? "ai-border" : ""}`}>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-xs font-medium text-primary tracking-wide px-2.5 py-1 rounded-full bg-primary/10">{exp.period}</span>
                    {current && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full gradient-bg text-primary-foreground">Current</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  <p className="text-sm text-foreground/80 mt-1">{exp.company}</p>
                  {exp.group && <p className="text-xs text-muted-foreground mt-0.5">{exp.group}</p>}
                  {exp.suggestedResponsibilities && (
                    <h4 className="text-xs uppercase tracking-widest text-primary font-semibold mt-5 mb-3">QMS focus areas</h4>
                  )}
                  <ul className={`space-y-2 ${exp.suggestedResponsibilities ? "" : "mt-5"}`}>
                    {exp.tasks.map((task, i) => {
                      const [label, ...rest] = task.split(":");
                      const desc = rest.join(":").trim();
                      return (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1">▹</span>
                          <span>
                            {desc ? (<><span className="text-foreground font-medium">{label}:</span> {desc}</>) : task}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default ExperienceSection;
