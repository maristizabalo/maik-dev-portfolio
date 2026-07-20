export function classifySource(referrer: string | null): string {
  if (!referrer) return "Directo";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    const table: [string, string][] = [
      ["google.", "Google"],
      ["bing.", "Bing"],
      ["linkedin.", "LinkedIn"],
      ["lnkd.in", "LinkedIn"],
      ["github.", "GitHub"],
      ["chatgpt.com", "ChatGPT"],
      ["chat.openai", "ChatGPT"],
      ["claude.ai", "Claude"],
      ["perplexity.", "Perplexity"],
      ["t.co", "X/Twitter"],
      ["twitter.", "X/Twitter"],
      ["x.com", "X/Twitter"],
      ["facebook.", "Facebook"],
      ["instagram.", "Instagram"],
      ["reddit.", "Reddit"],
      ["whatsapp", "WhatsApp"],
      ["mail.", "Correo"],
    ];
    for (const [needle, label] of table) {
      if (host.includes(needle)) return label;
    }
    return "Otro";
  } catch {
    return "Otro";
  }
}

export function parseUtm(search: string) {
  const params = new URLSearchParams(search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
  };
}

export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true;
  return /bot|crawl|spider|slurp|bingpreview|facebookexternal|headless|lighthouse|preview|monitor|pingdom|gtmetrix/i.test(
    userAgent,
  );
}

export function detectDevice(userAgent: string): "mobile" | "tablet" | "desktop" | "unknown" {
  const ua = userAgent.toLowerCase();
  if (!ua) return "unknown";
  if (/ipad|tablet|kindle|silk/.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android.*mobile|windows phone/.test(ua)) return "mobile";
  if (/macintosh|windows|linux|x11|cros/.test(ua)) return "desktop";
  return "unknown";
}

export function detectOs(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes("windows")) return "Windows";
  if (ua.includes("android")) return "Android";
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ios")) return "iOS";
  if (ua.includes("mac os") || ua.includes("macintosh")) return "macOS";
  if (ua.includes("linux")) return "Linux";
  return "Other";
}

export function detectBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes("edg/")) return "Edge";
  if (ua.includes("opr/") || ua.includes("opera")) return "Opera";
  if (ua.includes("chrome/") && !ua.includes("chromium")) return "Chrome";
  if (ua.includes("safari/") && !ua.includes("chrome/")) return "Safari";
  if (ua.includes("firefox/")) return "Firefox";
  return "Other";
}
