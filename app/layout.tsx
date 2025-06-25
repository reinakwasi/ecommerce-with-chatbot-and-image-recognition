import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap"
})

export const metadata: Metadata = {
  title: {
    default: "AI Commerce - Next-Gen Shopping Experience",
    template: "%s | AI Commerce"
  },
  description: "Revolutionary e-commerce platform with AI-powered search, bargaining, and personalized recommendations. Experience the future of shopping.",
  keywords: [
    "e-commerce",
    "AI shopping",
    "artificial intelligence",
    "online shopping",
    "smart search",
    "AI bargaining",
    "product recommendations",
    "visual search"
  ],
  authors: [{ name: "AI Commerce Team" }],
  creator: "AI Commerce",
  publisher: "AI Commerce",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ai-commerce.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-commerce.com",
    title: "AI Commerce - Next-Gen Shopping Experience",
    description: "Revolutionary e-commerce platform with AI-powered search, bargaining, and personalized recommendations.",
    siteName: "AI Commerce",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Commerce - Next-Gen Shopping Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Commerce - Next-Gen Shopping Experience",
    description: "Revolutionary e-commerce platform with AI-powered search, bargaining, and personalized recommendations.",
    images: ["/og-image.jpg"],
    creator: "@aicommerce",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
