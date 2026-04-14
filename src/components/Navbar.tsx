import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold gradient-text">Atiq Asif</a>
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="px-5 py-2 gradient-bg rounded-full text-sm font-medium text-primary-foreground">
            Contact
          </a>
        </div>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/30 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
