/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // 에러있어도 배포
    // !! WARN !!
    // ignoreBuildErrors: true
  }
}

module.exports = nextConfig
