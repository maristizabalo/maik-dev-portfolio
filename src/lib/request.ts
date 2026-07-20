import { createHash } from "crypto";

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    headers.get("x-real-ip")?.trim() ||
    "0.0.0.0"
  );
}

export function hashValue(value: string): string {
  const salt = process.env.ANALYTICS_SALT || "development-salt";
  return createHash("sha256")
    .update(`${value}:${salt}`)
    .digest("hex")
    .slice(0, 32);
}

export function getGeo(headers: Headers) {
  const city = headers.get("x-vercel-ip-city");
  return {
    country: headers.get("x-vercel-ip-country"),
    region: headers.get("x-vercel-ip-country-region"),
    city: city ? decodeURIComponent(city) : null,
    timezone: headers.get("x-vercel-ip-timezone"),
  };
}
