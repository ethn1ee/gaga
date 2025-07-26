import { env } from "@/env";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { isValidCategory } from "./lib/utils";

const protectedRoutes = ["profile", "new"];
const publicOnlyRoutes = ["sign-in", "sign-up", "verify-email"];
const allowedRoutes = [
  "search",
  "feature-requests",
  "verify-affiliation",
  "post",
];

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { pathname } = request.nextUrl;
  const basePath = pathname.split("/")[1];

  if (protectedRoutes.some((route) => basePath === route)) {
    if (!session) {
      const signInUrl = new URL("/sign-in", env.NEXT_PUBLIC_BASE_URL);
      signInUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }

  if (publicOnlyRoutes.some((route) => basePath === route)) {
    if (session) {
      return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_BASE_URL));
    }
    return NextResponse.next();
  }

  if (allowedRoutes.some((route) => basePath === route)) {
    return NextResponse.next();
  }

  console.log("Invalid route:", basePath);

  if (!isValidCategory(pathname.split("/").slice(1))) {
    return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_BASE_URL));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|.well-known|manifest.webmanifest|sitemap.xml|robots.txt).*)",
  ],
};
