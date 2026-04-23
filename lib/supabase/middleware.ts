import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const needsAuth =
    path.startsWith("/listings/new") ||
    path.startsWith("/my-listings") ||
    /^\/listings\/[^/]+\/edit$/.test(path) ||
    path === "/profile";

    if (!user && needsAuth) {
      // במקום לשכפל את request.nextUrl שעלול להכיל localhost
      // אנחנו בונים URL חדש שמבוסס על הכתובת האמיתית
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://master-ttrip.vercel.app";
      const loginUrl = new URL("/auth/login", baseUrl);
      
      loginUrl.searchParams.set("error", "יש להתחבר כדי להמשיך");
      
      // אופציונלי: לשמור את הדף שהמשתמש ניסה להגיע אליו כדי לחזור אליו אחרי הלוגין
      loginUrl.searchParams.set("next", path); 
      console.log("!!! LOGIN URL !!!", loginUrl);
      return NextResponse.redirect(loginUrl);
    }

  return response;
}
