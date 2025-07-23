/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
  // NÃO ponhas output: 'export'
  // NÃO uses next-pwa aqui por enquanto
};

module.exports = nextConfig;
