import type { Metadata } from 'next';
import './pokemon.css';
import { Rammetto_One } from 'next/font/google';
import React from 'react';

export const metadata: Metadata = {
    title: "PokéMelody",
    description: "PokéMelody",
    // other: {
    //   "link": [
    //     { rel: "preconnect", href: "https://fonts.googleapis.com" },
    //     { rel: "preconnect", href: "https://fonts.gstatic.com" crossorigin },
    //     { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bagel+Fat+One&display=swap" }
    //   ]
    // }
}

// const bagelFatOne = Bagel_Fat_One({
//   variable: '--test',
//   subsets: ['latin'],
//   weight: '400',
// });

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
      <div style={{ ...branding }} className={rammettoOne.variable} id="root">{children}</div>
    )
  }