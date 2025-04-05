import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Função middleware para controle de autenticação
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar se é uma página de autenticação
  const isAuthPage = pathname.startsWith('/auth/');

  // Verificar se é uma rota pública (API, recursos estáticos, etc)
  const isPublicPath = ['/api/auth', '/_next', '/favicon.ico', '/public'].some(
    (path) => pathname.startsWith(path),
  );

  // Obter o token da sessão
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // Se o usuário acessar a raiz e estiver logado, redirecionar para o dashboard
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Se for uma página de autenticação e o usuário já estiver autenticado, redirecionar para o dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Se não for uma página de autenticação nem uma rota pública e o usuário não estiver autenticado, redirecionar para login
  if (!isAuthPage && !isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/signIn', request.url));
  }

  return NextResponse.next();
}

// Exportação padrão da função middleware
export default middleware;

// Configurar quais caminhos o middleware deve ser executado
export const config = {
  matcher: [
    /*
     * Faz o match para todas as rotas, exceto:
     * 1. /api/auth/* (autenticação do NextAuth)
     * 2. /_next/* (arquivos do Next.js)
     * 3. /favicon.ico, /sitemap.xml (arquivos estáticos)
     */
    '/((?!api/auth|_next|favicon.ico|sitemap.xml).*)',
  ],
};
