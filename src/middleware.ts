import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/", "/auth/login", "/auth/register"];

const ROLE_MAPPING: Record<"admin" | "user", string[]> = {
  admin: ["/dashboard"],
  user: ["/home"],
};

function getRequiredRole(pathname: string): "admin" | "user" | null {
  for (const role of Object.keys(ROLE_MAPPING) as Array<"admin" | "user">) {
    if (ROLE_MAPPING[role].some(prefix => pathname.startsWith(prefix))) {
      return role;
    }
  }
  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/api/login" || pathname === "/api/register") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { status: 401, message: "Không có token" },
        { status: 401 }
      );
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-payload", JSON.stringify(payload));

      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    } catch {
      return NextResponse.json(
        { status: 401, message: "Token không hợp lệ" },
        { status: 401 }
      );
    }
  }

  const token = req.cookies.get("token")?.value;
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const requiredRole = getRequiredRole(pathname);
    if (requiredRole && payload.role !== requiredRole) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/api/:path*",
  ],
};