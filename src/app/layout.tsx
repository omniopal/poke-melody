import type { Metadata } from 'next';
import '../index.css';
import { GoogleAnalytics } from '@next/third-parties/google'
import { Rammetto_One } from 'next/font/google';

export const metadata: Metadata = {
    title: "PokéMelody",
    description: "PokéMelody",
}

const branding = {
  '--color-primary': 'hsl(198, 50%, 10%)',
  '--color-secondary': 'hsl(198, 50%, 90%)',
  '--color-tertiary': 'hsl(258, 80%, 80%)',
  '--color-accent': 'hsl(138, 80%, 80%)',
} as React.CSSProperties;

const rammettoOne = Rammetto_One({
  variable: '--test',
  subsets: ['latin'],
  weight: '400',
});

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
          <div style={{ ...branding }} className={rammettoOne.variable} id="root">{children}</div>
          <GoogleAnalytics gaId={`${process.env.GOOGLE_ANALYTICS_ID}`}/>
        </body>
        </html>

    )
  }