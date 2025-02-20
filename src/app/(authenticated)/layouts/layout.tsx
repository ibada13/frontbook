'use client'
import { ReactNode } from 'react'
import { useAuth } from '@/hooks/auth'
import Navigation from '@/components/Layouts/Navigation'
import Paginator from '@/components/Layouts/Paginator'
import { GiBookStorm } from "react-icons/gi";
const AppLayout = ({ children , path, totalPages }: { children: ReactNode,path?:string , totalPages?:number|null }) => {
  const { user } = useAuth({ middleware: 'auth' })

  return (
    <div className="min-h-screen bg-black ">
      <Navigation user={user} />

      {/* Page Content */}
      <main className='flex justify-center items-center bg-black mt-8'>{children}</main>
      { 
      totalPages&&path?
      <Paginator totalPages={totalPages} path={path} />
      :null
      }
    </div>
  )
}

export default AppLayout
