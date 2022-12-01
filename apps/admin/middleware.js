/* eslint-disable consistent-return */
import { NextResponse } from 'next/server';
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
  // Code based off of https://supabase.com/docs/guides/auth/auth-helpers/nextjs#auth-with-nextjs-middleware
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();

  // Retrieve the pathname from the request
  const { pathname } = req.nextUrl;

  if (
    pathname === '/login' || // Exclude the login route
    pathname === '/register' // Exclude register route
  ) {
    // Forward request to the page
    return res;
  }

  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if user is authenticated
  if (session) {
    // User is authenticated, check if the user is an admin
    const { data, error } = await supabase.rpc('is_sysadmin', {
      userid: session.user.id,
    });

    if (error) throw error;

    if (data) {
      // The user is an admin, forward request to protected route.
      return res;
    }
  }

  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/login';
  return NextResponse.redirect(redirectUrl);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!_next|api/auth).*)(.+)',
};
