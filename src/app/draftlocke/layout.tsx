import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Homie DraftLocke",
    description: "Homie DraftLocke",
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div id="root">{children}</div>
    )
  }