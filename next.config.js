/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DOMAIN: 'http://192.168.1.104',
    NEXTAUTH_URL: "http://192.168.1.104",
    VERCEL_URL:"http://192.168.1.104",
  }
}
module.exports = nextConfig;