import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Rotas que não precisam de autenticação além das padrões do next-auth
const publicRoutes = [
  '/favicon.ico',
  '/sitemap.xml',
  '/robots.txt',
  '/public',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar se é uma rota pública (API auth, recursos estáticos, etc)
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    publicRoutes.some(route => pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  // Páginas de autenticação
  const isAuthPage = pathname.startsWith('/auth/');

  try {
    // Obter o token da sessão
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    // Redirecionamentos com base no estado de autenticação
    if (token) {
      // Usuário autenticado tentando acessar páginas de auth ou raiz
      if (isAuthPage || pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // Usuário não autenticado
    if (!isAuthPage) {
      const searchParams = new URLSearchParams();
      // Armazena a URL atual para redirecionamento após o login
      if (pathname !== '/') {
        searchParams.set('callbackUrl', pathname);
      }
      const signInUrl = new URL('/auth/signIn', request.url);
      signInUrl.search = searchParams.toString();
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // Em caso de erro, redireciona para login
    return NextResponse.redirect(new URL('/auth/signIn', request.url));
  }
}

export const config = {
  // Matcher ignorando arquivos estáticos e rotas de API de autenticação
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js authentication API)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml (SEO file)
     * - robots.txt (SEO file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
