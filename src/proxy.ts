import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { verifySessionToken, CONSOLE_COOKIE } from "@/lib/console/session";
import { getConsolePath } from "@/lib/env";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const consolePath = getConsolePath();

  const isConsolePage =
    pathname === `/${consolePath}` || pathname.startsWith(`/${consolePath}/`);
  const isConsoleApi = pathname.startsWith("/api/console");

  if (isConsolePage || isConsoleApi) {
    const isPublic =
      pathname === `/${consolePath}/login` ||
      pathname === "/api/console/login" ||
      pathname === "/api/console/logout";

    if (!isPublic) {
      const valid = await verifySessionToken(
        request.cookies.get(CONSOLE_COOKIE)?.value,
      );
      if (!valid) {
        if (isConsoleApi) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.redirect(
          new URL(`/${consolePath}/login`, request.url),
        );
      }
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
