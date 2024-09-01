// Importa o módulo 'path' que é necessário para configurar os caminhos de estilos.
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: 'http://127.0.0.1:5000/api/',
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
};

module.exports = nextConfig;
