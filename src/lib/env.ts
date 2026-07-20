export function isSupabaseConfigured() {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function getConsolePath() {
  const raw = process.env.CONSOLE_PATH?.trim();
  return (raw && raw.replace(/^\/+/, "")) || "console";
}

export function isAnalyticsEnabled() {
  return process.env.ANALYTICS_ENABLED !== "false";
}
