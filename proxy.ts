import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. FAST PATH: Early return for static assets and known public paths
  const isStaticAsset = 
    path.startsWith('/_next') || 
    path.startsWith('/static') || 
    path.startsWith('/images') ||
    path.startsWith('/api') ||
    path.includes('.') ||
    path === '/favicon.ico' ||
    path === '/manifest.json' ||
    path === '/sw.js';

  if (isStaticAsset) {
    return NextResponse.next();
  }

  // 2. Initialize Supabase only if we need to check auth
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tlrmxgptetlfdekxegyp.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  let user = null;
  try {
    const { data: { user: foundUser } } = await supabase.auth.getUser();
    user = foundUser;
  } catch (e) {
    console.error('Supabase auth error in proxy:', e);
  }

  // 3. Define public routes that don't require authentication
  const isPublicRoute = 
    path === '/' ||
    path === '/auth' ||
    path.startsWith('/auth/') ||
    path.startsWith('/admin') ||
    path.startsWith('/terms');

  // 4. Redirect Logic
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  if (user && (path === '/auth' || path.startsWith('/auth/signin'))) {
    const url = request.nextUrl.clone()
    url.pathname = '/feed'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|api|static).*)',
  ],
}
