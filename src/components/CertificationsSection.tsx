import { Award } from "lucide-react";

const certifications = [
  {
    title: "Cyber Security Certificate",
    issuer: "Google.org",
  },
  {
    title: "SAP Business Technology Platform (BTP)",
    issuer: "SAP Sapphire",
  },
  {
    title: "One World Festival Participation",
    issuer: "Lovely Professional University",
  },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Certifications & <span className="gradient-text">Activities</span>
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {certifications.map((cert) => (
            <div key={cert.title} className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors flex items-center gap-4">
              <div className="w-10 h-10 shrink-0 rounded-lg gradient-bg-subtle flex items-center justify-center">
                <Award size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{cert.title}</h3>
                <p className="text-xs text-muted-foreground">Issued by {cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
