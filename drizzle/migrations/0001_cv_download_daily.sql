-- Aggregate-only daily download counts. One row per day per counter;
-- never any per-visitor rows: no IP addresses, user agents, visitor IDs,
-- or timestamps of individual downloads are stored.
CREATE TABLE public.cv_download_daily (
  day date PRIMARY KEY,
  download_count bigint NOT NULL DEFAULT 0
);

-- Security definer increment now bumps the grand total and the daily total
-- together, so daily figures always sum to the overall count.
CREATE OR REPLACE FUNCTION public.increment_cv_downloads()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.cv_download_counters (counter_key, download_count)
  VALUES ('cv', 1)
  ON CONFLICT (counter_key) DO UPDATE
    SET download_count = public.cv_download_counters.download_count + 1,
        last_incremented_at = now();

  INSERT INTO public.cv_download_daily (day, download_count)
  VALUES (CURRENT_DATE, 1)
  ON CONFLICT (day) DO UPDATE
    SET download_count = public.cv_download_daily.download_count + 1;
END;
$$;

GRANT SELECT ON public.cv_download_daily TO authenticated;
GRANT ALL ON public.cv_download_daily TO service_role;

ALTER TABLE public.cv_download_daily ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view daily download totals"
  ON public.cv_download_daily
  FOR SELECT
  TO authenticated
  USING (true);