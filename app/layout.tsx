import { Inter } from "next/font/google"
import "./globals.css"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "NewsFlash",
  description: "Kõik sinu uudised ühes kohas"
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={inter.className}
    >
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col">{children}</main>
      </body>
    </html>
  )
}
