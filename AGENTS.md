# Project rules

- Keep professional experience in a shared data module consumed by the portfolio and MCP tools so employment dates and current-role status stay consistent.
- Load external fonts through document-head links and use global semantic color tokens for canvas effects so styling stays compatible with the CSS compiler and theme.
- Keep detailed QMS project content in a typed data module and render it through the existing accordion controls so project details remain consistent and scannable.
- Track CV downloads only as an aggregate count in `public.cv_download_counters` (incremented via the `increment_cv_downloads` RPC, read restricted to authenticated users); never add per-visitor analytics rows (IP, user agent, timestamps per event) or third-party trackers.