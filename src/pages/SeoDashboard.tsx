import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ArrowLeft, MousePointerClick, Eye, Percent, TrendingUp } from "lucide-react";

type Row = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number };
type Data = {
  site: string;
  range: { startDate: string; endDate: string; days: number };
  totals: { clicks: number; impressions: number; ctr: number; position: number };
  byDate: Row[];
  byQuery: Row[];
  byPage: Row[];
  byCountry: Row[];
  byDevice: Row[];
};

const RANGE_OPTIONS = [7, 28, 90] as const;

const formatNumber = (n: number) => new Intl.NumberFormat("en-US").format(Math.round(n));
const formatPct = (n: number) => `${(n * 100).toFixed(2)}%`;
const formatPos = (n: number) => n.toFixed(1);

const SeoDashboard = () => {
  const [days, setDays] = useState<number>(28);
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    supabase.functions
      .invoke("gsc-performance", { body: { days } })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setError(error.message);
        else if ((data as { error?: string })?.error) setError((data as { error: string }).error);
        else setData(data as Data);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [days]);

  const chartData = useMemo(
    () =>
      data?.byDate.map((r) => ({
        date: r.keys?.[0] ?? "",
        clicks: r.clicks,
        impressions: r.impressions,
      })) ?? [],
    [data],
  );

  return (
    <main className="min-h-screen bg-background px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Link to="/" className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to portfolio
            </Link>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Search Performance</h1>
            <p className="mt-1 text-muted-foreground">
              Live Google Search Console data for {data?.site ?? "your site"}
              {data && (
                <span className="ml-1">
                  · {data.range.startDate} → {data.range.endDate}
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            {RANGE_OPTIONS.map((d) => (
              <Button key={d} variant={d === days ? "default" : "outline"} size="sm" onClick={() => setDays(d)}>
                {d}d
              </Button>
            ))}
          </div>
        </header>

        {error && (
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Couldn't load data</CardTitle>
              <CardDescription className="break-all">{error}</CardDescription>
            </CardHeader>
          </Card>
        )}

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Clicks" value={data ? formatNumber(data.totals.clicks) : null} icon={<MousePointerClick className="h-4 w-4" />} loading={loading} />
          <MetricCard label="Impressions" value={data ? formatNumber(data.totals.impressions) : null} icon={<Eye className="h-4 w-4" />} loading={loading} />
          <MetricCard label="Avg. CTR" value={data ? formatPct(data.totals.ctr) : null} icon={<Percent className="h-4 w-4" />} loading={loading} />
          <MetricCard label="Avg. Position" value={data ? formatPos(data.totals.position) : null} icon={<TrendingUp className="h-4 w-4" />} loading={loading} />
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Clicks & Impressions</CardTitle>
            <CardDescription>Daily search performance over the selected range</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-72 w-full" />
            ) : chartData.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted-foreground">No data for this period yet.</p>
            ) : (
              <ChartContainer
                config={{
                  clicks: { label: "Clicks", color: "hsl(var(--primary))" },
                  impressions: { label: "Impressions", color: "hsl(var(--muted-foreground))" },
                }}
                className="h-72 w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="cl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="im" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v: string) => v.slice(5)} />
                    <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area yAxisId="right" type="monotone" dataKey="impressions" stroke="hsl(var(--muted-foreground))" fill="url(#im)" strokeWidth={2} />
                    <Area yAxisId="left" type="monotone" dataKey="clicks" stroke="hsl(var(--primary))" fill="url(#cl)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Breakdowns</CardTitle>
            <CardDescription>Top queries, pages, countries, and devices</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="queries">
              <TabsList className="grid w-full grid-cols-4 md:w-auto">
                <TabsTrigger value="queries">Queries</TabsTrigger>
                <TabsTrigger value="pages">Pages</TabsTrigger>
                <TabsTrigger value="countries">Countries</TabsTrigger>
                <TabsTrigger value="devices">Devices</TabsTrigger>
              </TabsList>
              <TabsContent value="queries">
                <BreakdownTable rows={data?.byQuery} loading={loading} label="Query" />
              </TabsContent>
              <TabsContent value="pages">
                <BreakdownTable rows={data?.byPage} loading={loading} label="Page" truncate />
              </TabsContent>
              <TabsContent value="countries">
                <BreakdownTable rows={data?.byCountry} loading={loading} label="Country" uppercase />
              </TabsContent>
              <TabsContent value="devices">
                <BreakdownTable rows={data?.byDevice} loading={loading} label="Device" capitalize />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

const MetricCard = ({
  label,
  value,
  icon,
  loading,
}: {
  label: string;
  value: string | null;
  icon: React.ReactNode;
  loading: boolean;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      <span className="text-muted-foreground">{icon}</span>
    </CardHeader>
    <CardContent>
      {loading || value === null ? <Skeleton className="h-8 w-24" /> : <div className="text-3xl font-bold">{value}</div>}
    </CardContent>
  </Card>
);

const BreakdownTable = ({
  rows,
  loading,
  label,
  truncate,
  uppercase,
  capitalize,
}: {
  rows?: Row[];
  loading: boolean;
  label: string;
  truncate?: boolean;
  uppercase?: boolean;
  capitalize?: boolean;
}) => {
  if (loading) return <Skeleton className="mt-4 h-64 w-full" />;
  if (!rows || rows.length === 0) return <p className="py-8 text-center text-sm text-muted-foreground">No data.</p>;
  return (
    <div className="mt-4 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{label}</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
            <TableHead className="text-right">Impressions</TableHead>
            <TableHead className="text-right">CTR</TableHead>
            <TableHead className="text-right">Position</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, i) => {
            const key = r.keys?.[0] ?? "";
            const display = uppercase ? key.toUpperCase() : capitalize ? key.charAt(0).toUpperCase() + key.slice(1) : key;
            return (
              <TableRow key={`${key}-${i}`}>
                <TableCell className={truncate ? "max-w-xs truncate font-medium" : "font-medium"} title={key}>
                  {display}
                </TableCell>
                <TableCell className="text-right">{formatNumber(r.clicks)}</TableCell>
                <TableCell className="text-right">{formatNumber(r.impressions)}</TableCell>
                <TableCell className="text-right">{formatPct(r.ctr)}</TableCell>
                <TableCell className="text-right">{formatPos(r.position)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SeoDashboard;
