-- Aggregate-only download counter. No rows are ever created per visitor:
-- no IP addresses, user agents, timestamps of individual downloads, or
-- any other personal data is stored. Only a single total per counter.
CREATE TABLE public.cv_download_counters (
  counter_key text PRIMARY KEY,
  download_count bigint NOT NULL DEFAULT 0,
  last_incremented_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.cv_download_counters (counter_key, download_count)
VALUES ('cv', 0);

-- Security definer so anon visitors can increment the total without
-- gaining any direct read/write access to the table.
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
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_cv_downloads() TO anon, authenticated;
GRANT SELECT ON public.cv_download_counters TO authenticated;
GRANT ALL ON public.cv_download_counters TO service_role;

ALTER TABLE public.cv_download_counters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view download totals"
  ON public.cv_download_counters
  FOR SELECT
  TO authenticated
  USING (true);