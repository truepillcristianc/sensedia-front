'use client'

import Icon from '@/components/icons/icon'
import { usePathname } from 'next/navigation'
import Breadcrumb from '@/components/icons/breadcrumb'
import Help from '@/components/icons/help'
import GridIcon from '@/components/icons/grid'
import Providers from '@/lib/providers'
import Dialog from '@/components/common/dialog'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathnames = usePathname().split('/').slice(1)
  return (
    <Providers>
      <Dialog />
      <div className='bg-white p-3 flex justify-between align-middle items-center text-sgray-75 text-sm'>
        <div className='flex gap-x-2 items-center'>
          <Icon className="text-spurple" />
          <span className='font-bold text-spurple'>
            BIENVENIDO
          </span>
          {pathnames.map((p, i) => p && (
            <span key={p} className='flex gap-x-2 items-center'>
              <Breadcrumb />
              <Link href={`/${pathnames.slice(0, i + 1).join('/')}`}>{p}</Link>
            </span>
          ))}
        </div>
        <div className='flex gap-x-4 justify-end items-center'>
          <Help />
          <GridIcon />
          <div className='border-l-2 border-sgray-25 px-2 flex items-center gap-x-2'>
            <div className='rounded-full text-white h-8 w-8 bg-spurple flex justify-center items-center'>
              UN
            </div>
            Nombre de Usuario
          </div>
        </div>
      </div>
      {children}
    </Providers>
  )
}
