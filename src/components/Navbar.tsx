import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    [...navLinks.map((l) => l.href), "#contact"].forEach((h) => {
      const el = document.querySelector(h);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-lg" : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#top" className="text-xl font-bold gradient-text">Atiq Asif</a>
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "location" : undefined}
              className={cn(
                "relative px-3 py-2 text-sm rounded-full transition-colors",
                active === link.href ? "text-foreground bg-primary/10" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="ml-3 gradient-bg rounded-full glow-shadow"><a href="#contact">Contact</a></Button>
        </div>
        <Button id="menu-toggle" variant="ghost" size="icon" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" className="lg:hidden text-foreground hover:bg-secondary" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      {open && (
        <div id="mobile-menu" className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/30 px-6 py-4 space-y-1 max-h-[80svh] overflow-y-auto">
          {[...navLinks, { label: "Contact", href: "#contact" }].map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
