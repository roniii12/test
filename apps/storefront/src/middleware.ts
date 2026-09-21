import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "localhost:3000";

  // Skip NEXT internal, public files, and API routes
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/media") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Rewrite: mygan.co.il/about → /mygan.co.il/about (internal)
  url.pathname = `/${hostname}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|media|api).*)"],
};
