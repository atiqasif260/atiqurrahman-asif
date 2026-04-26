import { GraduationCap } from "lucide-react";

const education = [
  {
    year: "2021",
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Lovely Professional University (LPU)",
    detail: "CGPA: 3.75/4.00 — Thesis: Design & Development of a PMIS",
  },
  {
    year: "2017",
    degree: "Higher Secondary School Certificate",
    institution: "Savar Model College",
    detail: "Science — GPA 3.83 — Dhaka Board",
  },
  {
    year: "2015",
    degree: "Secondary School Certificate",
    institution: "Savar Cantonment Board Boys High School",
    detail: "Science — GPA 4.29 — Dhaka Board",
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="gradient-text-animated">Education</span>
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu) => (
            <div key={edu.year} className="glass-card rounded-xl p-8 hover:border-primary/30 transition-colors flex gap-6 items-start">
              <div className="w-12 h-12 shrink-0 rounded-xl gradient-bg-subtle flex items-center justify-center">
                <GraduationCap size={22} className="text-primary" />
              </div>
              <div>
                <span className="text-xs font-medium text-primary">{edu.year}</span>
                <h3 className="text-lg font-bold mt-1">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                <p className="text-sm text-muted-foreground mt-1">{edu.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
