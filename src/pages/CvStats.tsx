import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Download, FileText, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const CHART_DAYS = 30;

const CvStats = () => {
  const [sessionChecked, setSessionChecked] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [total, setTotal] = useState<number | null>(null);
  const [lastIncrement, setLastIncrement] = useState<string | null>(null);
  const [daily, setDaily] = useState<{ day: string; count: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "CV Download Stats | Atiqur Rahman Asif";

    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSignedIn(!!session);
      setSessionChecked(true);
      if (!session) return;

      const since = new Date();
      since.setDate(since.getDate() - (CHART_DAYS - 1));
      const sinceIso = since.toISOString().slice(0, 10);

      const [counterRes, dailyRes] = await Promise.all([
        supabase
          .from("cv_download_counters")
          .select("download_count, last_incremented_at")
          .eq("counter_key", "cv")
          .maybeSingle(),
        supabase
          .from("cv_download_daily")
          .select("day, download_count")
          .gte("day", sinceIso)
          .order("day", { ascending: true }),
      ]);

      const err = counterRes.error ?? dailyRes.error;
      if (err) {
        setError(err.message);
        return;
      }

      if (counterRes.data) {
        setTotal(counterRes.data.download_count);
        setLastIncrement(counterRes.data.last_incremented_at);
      }

      // Fill the full window with zeros so the chart shows quiet days too.
      const counts = new Map(
        (dailyRes.data ?? []).map((r) => [r.day, r.download_count]),
      );
      const series: { day: string; count: number }[] = [];
      for (let i = 0; i < CHART_DAYS; i++) {
        const d = new Date();
        d.setDate(d.getDate() - (CHART_DAYS - 1 - i));
        const day = d.toISOString().slice(0, 10);
        series.push({ day, count: counts.get(day) ?? 0 });
      }
      setDaily(series);
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

  const chartData = useMemo(
    () =>
      daily.map((d) => ({
        ...d,
        label: new Date(`${d.day}T00:00:00Z`).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          timeZone: "UTC",
        }),
      })),
    [daily],
  );

  const chartTotal = daily.reduce((sum, d) => sum + d.count, 0);

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
                Privacy-friendly analytics: only aggregate totals are stored —
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
            <Card className="glass-card p-6 md:p-8">
              <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Downloads by day</h2>
                  <p className="text-sm text-muted-foreground">Daily download counts, last {CHART_DAYS} days</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {chartTotal} in this period
                </p>
              </div>
              <ChartContainer
                config={{ downloads: { label: "Downloads", color: "hsl(var(--primary))" } }}
                className="h-64 w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 11 }}
                      interval={4}
                      tickMargin={8}
                    />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" name="Downloads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CvStats;
