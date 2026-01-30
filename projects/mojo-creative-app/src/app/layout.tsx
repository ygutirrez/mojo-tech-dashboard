import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MoJo Creative - AI Content Generator',
  description: 'Generate professional social media content for Mosquito Joe franchises',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
