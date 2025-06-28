import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/footer"

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
    default: "SmartShop - Smart Shopping Made Simple",
    template: "%s | SmartShop"
  },
  description: "Discover amazing products with smart search, personalized recommendations, and friendly price negotiation. Shopping has never been this easy!",
  keywords: [
    "e-commerce",
    "online shopping",
    "smart search",
    "product recommendations",
    "visual search",
    "price negotiation",
    "shopping platform",
    "retail"
  ],
  authors: [{ name: "SmartShop Team" }],
  creator: "SmartShop",
  publisher: "SmartShop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://smartshop.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smartshop.com",
    title: "SmartShop - Smart Shopping Made Simple",
    description: "Discover amazing products with smart search, personalized recommendations, and friendly price negotiation.",
    siteName: "SmartShop",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SmartShop - Smart Shopping Made Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartShop - Smart Shopping Made Simple",
    description: "Discover amazing products with smart search, personalized recommendations, and friendly price negotiation.",
    images: ["/og-image.jpg"],
    creator: "@smartshop",
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
        <meta name="theme-color" content="#f97316" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
