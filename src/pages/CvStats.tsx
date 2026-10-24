import { useEffect, useState } from "react";
import { Download, FileText, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CvStats = () => {
  const [sessionChecked, setSessionChecked] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [total, setTotal] = useState<number | null>(null);
  const [lastIncrement, setLastIncrement] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "CV Download Stats | Atiqur Rahman Asif";

    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSignedIn(!!session);
      setSessionChecked(true);
      if (!session) return;

      const { data, error: err } = await supabase
        .from("cv_download_counters")
        .select("download_count, last_incremented_at")
        .eq("counter_key", "cv")
        .maybeSingle();

      if (err) {
        setError(err.message);
      } else if (data) {
        setTotal(data.download_count);
        setLastIncrement(data.last_incremented_at);
      }
    };

    void load();
  }, []);

  const fmt = (iso: string | null) =>
    iso
      ? new Date(iso).toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center container mx-auto px-6 py-24">
        {!sessionChecked ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : !signedIn ? (
          <Card className="glass-card p-8 max-w-md w-full text-center space-y-4">
            <Lock className="mx-auto text-primary" size={32} aria-hidden />
            <h1 className="text-2xl font-bold">Sign in to view stats</h1>
            <p className="text-muted-foreground text-sm">
              CV download totals are private. Sign in to see this dashboard.
            </p>
            <Button asChild className="gradient-bg rounded-full font-semibold glow-shadow">
              <a href="/login?next=/cv-stats">Sign in</a>
            </Button>
          </Card>
        ) : error ? (
          <Card className="glass-card p-8 max-w-md w-full text-center space-y-2">
            <p className="text-destructive text-sm">Could not load stats.</p>
            <p className="text-muted-foreground text-xs break-all">{error}</p>
          </Card>
        ) : (
          <div className="w-full max-w-5xl space-y-8">
            <header className="text-center space-y-2">
              <p className="text-primary font-medium tracking-[0.3em] text-xs uppercase">Portfolio</p>
              <h1 className="text-3xl md:text-4xl font-extrabold gradient-text">CV Download Stats</h1>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                Privacy-friendly analytics: only the total number of downloads is stored —
                no IP addresses, device details, or visitor records of any kind.
              </p>
            </header>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass-card p-8 text-center">
                <Download className="mx-auto mb-3 text-primary" size={28} aria-hidden />
                <p className="text-5xl font-bold gradient-text">{total ?? "—"}</p>
                <p className="text-sm text-muted-foreground mt-2">Total CV downloads</p>
              </Card>
              <Card className="glass-card p-8 text-center">
                <FileText className="mx-auto mb-3 text-primary" size={28} aria-hidden />
                <p className="text-lg font-semibold">Atiqur-Rahman-Asif-CV.pdf</p>
                <p className="text-sm text-muted-foreground mt-2">Last counted: {fmt(lastIncrement)}</p>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CvStats;
