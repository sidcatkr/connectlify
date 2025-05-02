import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Connectlify",
  description: "Welcome to Connectlify",
  icons: {
    icon: "/connectlify.svg",
    shortcut: "/connectlify.svg",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" }
    ],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
