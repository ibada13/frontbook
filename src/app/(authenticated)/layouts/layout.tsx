'use client'
import { ReactNode } from 'react'
import { useAuth } from '@/hooks/auth'
import Navigation from '@/components/Layouts/Navigation'
import Paginator from '@/components/Layouts/Paginator'
import { GiBookStorm } from "react-icons/gi";
const AppLayout = ({ children , path, totalPages , middleware ,currentPage }: { children: ReactNode,path?:string , totalPages?:number|null , middleware:string,currentPage:number }) => {
  const { user } = useAuth({ middleware: middleware })

  return (
    <div className="min-h-screen bg-black ">
      <Navigation user={user} />

      {/* Page Content */}
      <main className='flex justify-center items-center bg-black mt-8'>{children}</main>
      { 
      totalPages&&path?
      <Paginator currentPage={currentPage} totalPages={totalPages} path={path} />
      :null
      }
    </div>
  )
}

export default AppLayout
