import crypto from "crypto";

export const isAnalyticsEnabled = () => process.env.ANALYTICS_ENABLED === "true";

export const getBogotaDateParts = (date = new Date()) => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}:${parts.second}`,
  };
};

export const detectDevice = (userAgent = "") => {
  const ua = userAgent.toLowerCase();

  if (!ua) return "unknown";
  if (/ipad|tablet|kindle|silk/.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android.*mobile|windows phone/.test(ua)) return "mobile";
  if (/macintosh|windows|linux|x11|cros/.test(ua)) return "desktop";

  return "unknown";
};

export const detectBrowser = (userAgent = "") => {
  const ua = userAgent.toLowerCase();

  if (!ua) return "unknown";
  if (ua.includes("edg/")) return "Edge";
  if (ua.includes("opr/") || ua.includes("opera")) return "Opera";
  if (ua.includes("chrome/") && !ua.includes("chromium")) return "Chrome";
  if (ua.includes("safari/") && !ua.includes("chrome/")) return "Safari";
  if (ua.includes("firefox/")) return "Firefox";

  return "Other";
};

export const detectOs = (userAgent = "") => {
  const ua = userAgent.toLowerCase();

  if (!ua) return "unknown";
  if (ua.includes("windows")) return "Windows";
  if (ua.includes("android")) return "Android";
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ios")) return "iOS";
  if (ua.includes("mac os") || ua.includes("macintosh")) return "macOS";
  if (ua.includes("linux")) return "Linux";

  return "Other";
};

export const getClientIp = (headers) => {
  const forwardedFor = headers.get("x-forwarded-for");
  const realIp = headers.get("x-real-ip");
  const candidate = forwardedFor?.split(",")[0]?.trim() || realIp?.trim() || null;

  if (!candidate || candidate === "::1" || candidate === "127.0.0.1") {
    return null;
  }

  return candidate;
};

export const hashIp = (ip) => {
  if (!ip) return null;

  const salt = process.env.ANALYTICS_ADMIN_TOKEN || "local-analytics-salt";
  return crypto.createHash("sha256").update(`${ip}:${salt}`).digest("hex").slice(0, 16);
};

export const getCountry = (headers) => {
  return headers.get("x-vercel-ip-country") || headers.get("cf-ipcountry") || null;
};

export const createVisitId = () => {
  if (crypto.randomUUID) return crypto.randomUUID();
  return crypto.randomBytes(16).toString("hex");
};

export const timingSafeTokenEqual = (received, expected) => {
  if (!received || !expected) return false;

  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);

  if (receivedBuffer.length !== expectedBuffer.length) return false;

  return crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
};
