import './globals.css'
import type { Metadata } from 'next'
import { Inter as FontSans } from "next/font/google"
import { Toaster } from 'react-hot-toast';
 
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
 
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata: Metadata = {
  title: 'Choco-panel',
  description: 'Mange your vps-apps',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
          >
             <Toaster />
            {children}
          </ThemeProvider>
      </body>
    </html>
  )
}
