import { env } from "@/env";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/new"];
const publicOnlyRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!session) {
      const signInUrl = new URL("/sign-in", env.NEXT_PUBLIC_BASE_URL);
      signInUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  if (publicOnlyRoutes.some((route) => pathname.startsWith(route))) {
    if (session) {
      return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_BASE_URL));
    }
  }

  // if (!isValidPath(pathname.split("/").slice(1))) {
  //   return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_BASE_URL));
  // }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
