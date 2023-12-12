import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import EntrenadorIcon from '@/components/icons/entrenador-icon'
import Providers from '@/lib/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-sgray'>
      <body className={inter.className}>
        <header className='p-4 bg-sgray'>
          <EntrenadorIcon />
        </header>
        {children}
      </body>
    </html>
  )
}
