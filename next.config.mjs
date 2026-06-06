/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  async redirects() {
    return [
      {
        source: "/teams/usa",
        destination: "/teams/united-states",
        permanent: true,
      },
      {
        source: "/cities/new-york-new-jersey-world-cup-2026-guide",
        destination: "/cities/new-york-new-jersey",
        permanent: true,
      },
      {
        source: "/cities/los-angeles-world-cup-2026-guide",
        destination: "/cities/los-angeles",
        permanent: true,
      },
      {
        source: "/cities/miami-world-cup-2026-guide",
        destination: "/cities/miami",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
