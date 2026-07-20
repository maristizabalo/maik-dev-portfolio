import { SignJWT, jwtVerify } from "jose";

export const CONSOLE_COOKIE = "console_session";

function secret() {
  return new TextEncoder().encode(
    process.env.CONSOLE_JWT_SECRET || "insecure-development-secret-change-me",
  );
}

export async function createSessionToken(): Promise<string> {
  const hours = Number(process.env.CONSOLE_SESSION_HOURS || 12);
  return new SignJWT({ role: "owner" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${hours}h`)
    .sign(secret());
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, secret());
    return true;
  } catch {
    return false;
  }
}
