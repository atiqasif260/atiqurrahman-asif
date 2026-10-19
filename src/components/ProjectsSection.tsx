import { ShieldCheck, Network, ClipboardCheck, BarChart3 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { qmsProjects } from "@/lib/qms-projects";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-start">
          {projects.map((project) => (
            <div key={project.title} className="glass-card rounded-xl p-8 hover:border-primary/30 transition-colors group">
              <div className="w-12 h-12 mb-4 rounded-xl gradient-bg-subtle flex items-center justify-center group-hover:glow-shadow transition-shadow">
                <project.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.desc}</p>
            </div>
          ))}
          {qmsProjects.map((project, index) => {
            const Icon = index === 0 ? BarChart3 : ClipboardCheck;
            return (
              <article key={project.title} className="glass-card rounded-xl p-6 sm:p-8 hover:border-primary/30 transition-colors group min-w-0">
                <div className="w-12 h-12 mb-4 rounded-xl gradient-bg-subtle flex items-center justify-center group-hover:glow-shadow transition-shadow">
                  <Icon size={22} className="text-primary" aria-hidden />
                </div>
                <h3 className="text-lg font-bold mb-3">{project.title}</h3>
                <dl className="text-sm space-y-2 mb-5">
                  {[
                    ["Organization", project.organization],
                    ["Department", project.department],
                    [index === 0 ? "Role" : "Position", project.role],
                    ...(project.projectType ? [["Project Type", project.projectType]] : []),
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs text-muted-foreground">{label}</dt>
                      <dd className="font-medium mt-0.5">{value}</dd>
                    </div>
                  ))}
                </dl>
                <h4 className="text-sm font-semibold mb-2">Project Objective</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.objective}</p>
                {project.status && (
                  <div className="border-l-2 border-primary pl-3 mt-5">
                    <h4 className="text-sm font-semibold mb-1">Project Status</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.status}</p>
                  </div>
                )}
                <Accordion type="single" collapsible className="mt-4">
                  <AccordionItem value="details" className="border-border">
                    <AccordionTrigger className="text-sm text-primary text-left gap-3" aria-label={`Project details: ${project.title}`}>Project details</AccordionTrigger>
                    <AccordionContent className="space-y-5">
                      <div>
                        <h4 className="font-semibold mb-2">{project.activitiesLabel}</h4>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
                          {project.activities.map((activity) => <li key={activity}>{activity}</li>)}
                        </ul>
                      </div>
                      {project.tools && <div><h4 className="font-semibold mb-2">Tools and Methods</h4><p className="text-muted-foreground leading-relaxed">{project.tools}</p></div>}
                      <div><h4 className="font-semibold mb-2">{project.outcomeLabel}</h4><p className="text-muted-foreground leading-relaxed">{project.outcome}</p></div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
