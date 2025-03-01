import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "TTR Maze Helper",
    description: "Toontown Rewritten Maze Helper",
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