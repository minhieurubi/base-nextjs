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
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

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
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next|.*\\..*).*)",
  ],
};