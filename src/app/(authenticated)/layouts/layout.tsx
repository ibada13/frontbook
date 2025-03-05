'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/hooks/auth'
import Navigation from '@/components/Layouts/Navigation'
import Paginator from '@/components/Layouts/Paginator'
import Link from 'next/link'
import TextDisplay from '../components/TextDisplay'

interface AppLayoutProps {
  children: ReactNode
  path?: string
  totalPages?: number | null
  middleware?:"auth"|"guest"|"optional"|"limitedguest"|string;
  currentPage?: number
}

const AppLayout = ({ children, path, totalPages, middleware, currentPage }: AppLayoutProps) => {
  const { user, isLoading } = useAuth({ middleware });

  return (
    <div className="min-h-screen bg-black">
      <Navigation user={user} />

      {isLoading ? (
        <TextDisplay text='جارٍ التحميل...'/>

      ) : !user && middleware === "limitedguest" ? (
        <div className="w-full h-[80vh] flex justify-center items-center text-white">
          <div className="w-full h-1/2 flex flex-col items-center justify-around">
            <p className="text-4xl font-bold">يرجي تسجيل الدخول لإستخدام هذه الميزة</p>
            <Link href="/login" className="hover:text-gray-400 text-2xl font-bold transition-colors duration-200">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      ) : (
        <main className="flex justify-center items-center bg-black mt-8">{children}</main>
      )}

      {Boolean(totalPages && path && currentPage) && (
        <Paginator currentPage={currentPage!} totalPages={totalPages!} path={path!} />
      )}
    </div>
  )
}

export default AppLayout
