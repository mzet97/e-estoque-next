module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Define o parser para TypeScript
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'next', // Configurações padrão do Next.js
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended', // Regras recomendadas para TypeScript
    'plugin:prettier/recommended', // Integração do Prettier com o ESLint
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // Personalize suas regras, se necessário
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
