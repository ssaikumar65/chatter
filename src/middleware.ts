import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const isLoginPage = pathname === "/";

    const isAuthenticated = await getToken({ req });
    const protectedRoutes = ["/dashboard"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route),
    );
    if (isLoginPage) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    if (!isAuthenticated && isProtectedRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);
