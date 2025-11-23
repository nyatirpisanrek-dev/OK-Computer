/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com'],
  },
  // Enable Turbopack explicitly; remove custom webpack config for compatibility
  turbopack: {},
}

module.exports = nextConfig
