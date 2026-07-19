import type { Metadata } from 'next'
import './globals.css'
import AdminProviders from '@/components/AdminProviders'

export const metadata: Metadata = {
  metadataBase: new URL('https://onelapstudio.app'),
  applicationName: 'OneLap Studio',
  title: 'OneLap Studio — Building Apps That Feel Alive',
  description:
    'OneLap Studio is an indie software development studio crafting premium digital products — from AI-powered platforms to sleek mobile apps — with modern technology and obsessive attention to detail.',
  keywords: [
    'software development',
    'web development',
    'mobile apps',
    'AI development',
    'SaaS',
    'UI/UX design',
    'startup studio',
    'OneLap Studio',
  ],
  authors: [{ name: 'OneLap Studio' }],
  openGraph: {
    title: 'OneLap Studio — Building Apps That Feel Alive',
    description:
      'An indie software development studio crafting premium digital products with modern technology.',
    url: 'https://onelapstudio.app',
    type: 'website',
    locale: 'en_US',
    siteName: 'OneLap Studio',
    images: [
      {
        url: '/logo.jpeg',
        width: 800,
        height: 800,
        alt: 'OneLap Studio Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneLap Studio — Building Apps That Feel Alive',
    description:
      'An indie software development studio crafting premium digital products with modern technology.',
    images: ['/logo.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      'msvalidate.01': '5F8B3FFF22017DD3D48A0F93CA315B17',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://onelapstudio.app/#website',
        url: 'https://onelapstudio.app/',
        name: 'OneLap Studio',
        alternateName: ['OneLapStudio', 'OneLap'],
        description:
          'An indie software development studio crafting premium digital products with modern technology.',
      },
      {
        '@type': 'Organization',
        '@id': 'https://onelapstudio.app/#organization',
        name: 'OneLap Studio',
        url: 'https://onelapstudio.app/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://onelapstudio.app/logo.jpeg',
        },
      },
    ],
  }

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="msvalidate.01" content="5F8B3FFF22017DD3D48A0F93CA315B17" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white antialiased">
        <AdminProviders>{children}</AdminProviders>
        {/* Grain overlay */}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  )
}
