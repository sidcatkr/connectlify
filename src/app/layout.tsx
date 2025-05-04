import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import ClientOnly from "@/components/ClientOnly"
import CustomCursor from "@/components/CustomCursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lunive",
  description: "Being fancy",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <CustomCursor />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
