import { ArrowUp } from "lucide-react";

const Footer = () => (
  <footer className="py-8 border-t border-border/30">
    <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Atiqur Rahman Asif. All rights reserved.</p>
      <a href="#top" aria-label="Back to top" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        Back to top <ArrowUp size={14} />
      </a>
    </div>
  </footer>
);

export default Footer;
