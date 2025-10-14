/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    quietDeps: true, // Silence deprecation warnings
    silenceDeprecations: [
      "mixed-decls",
      "legacy-js-api",
      "import",
      "slash-div",
      "global-builtin",
    ],
  },

  async rewrites() {
    const isProd = process.env.NODE_ENV === 'production';
    const apiBase = isProd
      ? 'https://gokite-sit-b2c.convergentechnologies.com'
      : (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000');

    return [
      {
        source: '/api/:path*',
        destination: `${apiBase}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
