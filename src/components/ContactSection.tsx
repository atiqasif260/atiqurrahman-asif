import { Mail, Phone, MapPin, Instagram, Linkedin, Github } from "lucide-react";

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/atiq.asif260/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/atiqurrahman-asif/" },
  { icon: Github, label: "GitHub", href: "https://github.com/atiqasif260" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In <span className="gradient-text">Touch</span></h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-12">
          Interested in collaborating or have an opportunity? Feel free to reach out — I'd love to hear from you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          <a href="mailto:atiq.asif260@gmail.com" className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors group">
            <Mail size={24} className="text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-sm mb-1">Email</h3>
            <p className="text-xs text-muted-foreground">atiq.asif260@gmail.com</p>
          </a>
          <a href="tel:+8801999443965" className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors group">
            <Phone size={24} className="text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-sm mb-1">Phone</h3>
            <p className="text-xs text-muted-foreground">+880 1999 443965</p>
          </a>
          <div className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors group">
            <MapPin size={24} className="text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-sm mb-1">Location</h3>
            <p className="text-xs text-muted-foreground">Savar, Dhaka-1344</p>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-6"><span className="gradient-text">Social Media</span></h3>
        <div className="justify-center gap-4 flex flex-row">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full gradient-bg-subtle border border-primary/20 flex items-center justify-center hover:glow-shadow hover:border-primary/50 transition-all group"
              aria-label={label}
            >
              <Icon size={20} className="text-primary group-hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
