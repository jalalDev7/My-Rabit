import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import "react-loading-skeleton/dist/skeleton.css"
import { Toaster } from '@/components/ui/toaster'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Rabit | More than link',
  description: 'Get more benefit from your links',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='light'>
      <Providers>
      <body  className={cn('min-h-screen font-sans antialiased  grainy', inter.className)}>
        <Toaster />
        {children}
      </body>
      </Providers>
    </html>
  )
}
