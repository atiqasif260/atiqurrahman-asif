// Google Search Console performance proxy
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE_URL = "https://atiqurrahman-asif.lovable.app/";

function daysAgo(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

async function query(body: Record<string, unknown>, lovableKey: string, gscKey: string) {
  const url = `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gscKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(`GSC ${res.status}: ${JSON.stringify(data)}`);
    (err as Error & { statusCode?: number }).statusCode = res.status;
    throw err;
  }
  return data;
}

const ALLOWED_DAYS = [7, 28, 90] as const;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GSC_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!GSC_KEY) throw new Error("GOOGLE_SEARCH_CONSOLE_API_KEY is not configured");

    const body = await req.json().catch(() => ({}));
    const daysRaw = (body as { days?: unknown }).days ?? 28;
    const days = Number(daysRaw);
    if (!ALLOWED_DAYS.includes(days as (typeof ALLOWED_DAYS)[number])) {
      return new Response(
        JSON.stringify({ error: "Invalid 'days' value. Allowed: 7, 28, 90." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const startDate = daysAgo(days);
    const endDate = daysAgo(1);
    const base = { startDate, endDate, rowLimit: 100 };

    const [totals, byDate, byQuery, byPage, byCountry, byDevice] = await Promise.all([
      query({ ...base, dimensions: [] }, LOVABLE_API_KEY, GSC_KEY),
      query({ ...base, dimensions: ["date"] }, LOVABLE_API_KEY, GSC_KEY),
      query({ ...base, dimensions: ["query"], rowLimit: 25 }, LOVABLE_API_KEY, GSC_KEY),
      query({ ...base, dimensions: ["page"], rowLimit: 25 }, LOVABLE_API_KEY, GSC_KEY),
      query({ ...base, dimensions: ["country"], rowLimit: 15 }, LOVABLE_API_KEY, GSC_KEY),
      query({ ...base, dimensions: ["device"] }, LOVABLE_API_KEY, GSC_KEY),
    ]);

    return new Response(
      JSON.stringify({
        site: SITE_URL,
        range: { startDate, endDate, days },
        totals: totals.rows?.[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 },
        byDate: byDate.rows ?? [],
        byQuery: byQuery.rows ?? [],
        byPage: byPage.rows ?? [],
        byCountry: byCountry.rows ?? [],
        byDevice: byDevice.rows ?? [],
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("gsc-performance error", detail);
    return new Response(
      JSON.stringify({ error: "Failed to fetch Search Console data. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
