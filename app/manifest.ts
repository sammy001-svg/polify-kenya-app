import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PoliFy Kenya',
    short_name: 'PoliFy',
    description: 'AI-Powered Civic Intelligence for Kenya',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#01605A',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/polify-logo-v3.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
