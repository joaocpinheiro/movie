/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
  redirects() {
    return [
      {
        source: '/',
        destination: '/discover/now_playing',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
