CREATE TABLE public.recruiter_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  organization text NOT NULL,
  role text NOT NULL DEFAULT '',
  message text NOT NULL,
  slack_notified boolean NOT NULL DEFAULT false
);
GRANT INSERT ON public.recruiter_leads TO anon;
GRANT ALL ON public.recruiter_leads TO service_role;
ALTER TABLE public.recruiter_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can submit recruiter leads"
  ON public.recruiter_leads
  FOR INSERT
  TO anon
  WITH CHECK (
    length(btrim(full_name)) BETWEEN 1 AND 100
    AND length(btrim(email)) BETWEEN 3 AND 255
    AND length(btrim(organization)) BETWEEN 1 AND 160
    AND length(role) <= 160
    AND length(btrim(message)) BETWEEN 1 AND 3000
  );