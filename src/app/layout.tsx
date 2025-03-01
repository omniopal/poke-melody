import type { Metadata } from 'next';
import '../index.css';
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
    title: "Jacob's Games",
    description: "My Mario Game Collection",
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <html lang="en">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <link 
              rel="stylesheet"
              href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
              integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
              crossOrigin=""
            />
            <script
              src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
              integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
              crossOrigin="">
            </script>
          </head>
        <body>
            <div id="root">{children}</div>
            <GoogleAnalytics gaId={`${process.env.GOOGLE_ANALYTICS_ID}`}/>
        </body>
        </html>

    )
  }