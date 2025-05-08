import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HyprSpike Documentation',
  description: 'Created with <3 by randomboi and Shreyash',
  generator: 'beap.studio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
