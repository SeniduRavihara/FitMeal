import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
  const isUnauthorizedPage = request.nextUrl.pathname === "/unauthorized";

  // If user is not signed in and trying to access protected pages, redirect to sign-in
  if (!session && (isAdminPage || isUnauthorizedPage)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If user is signed in and trying to access auth pages, redirect to admin dashboard
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // If user is signed in and trying to access admin pages, check their role
  if (session && isAdminPage) {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error || !profile) {
        console.error("Error fetching user profile:", error);
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      // Check if user has admin privileges
      const isAdmin =
        profile.role === "admin" || profile.role === "super_admin";

      if (!isAdmin) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
