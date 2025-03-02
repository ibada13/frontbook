'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

import NavLink from '@/components/NavLink'
import Dropdown from '@/components/Dropdown'
import ResponsiveNavLink, { ResponsiveNavButton } from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { GiBookStorm } from 'react-icons/gi'
import { UserType } from '@/types/User'
import { useAuth } from '@/hooks/auth'
import { RiDropdownList } from 'react-icons/ri'
import { MdOutlineArrowDropDown } from 'react-icons/md'

const Navigation = ({ user }: { user: UserType }) => {
  const pathname = usePathname()
  const { logout } = useAuth({})
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-black border-b border-red-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/books/1">
                <GiBookStorm className="text-red-500 hover:text-red-900 transition-all duration-300" size={65} />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:flex sm:items-center sm:gap-x-10">
              <NavLink active={pathname === "/books/1"} href="/books/1">الرئيسية</NavLink>
              <NavLink active={pathname.startsWith("/books/popular")} href="/books/popular">أشهر الكتب</NavLink>
              <Dropdown
              align="left"
              width={48}
              trigger={
                <button className="flex items-center justify-center text-sm font-medium text-red-400 hover:text-red-700 transition duration-150">
                  <div>كتبي</div>
                  <div className="ml-1">
                    <MdOutlineArrowDropDown  className='fill-current h-4 w-4'/>
                  </div>
                </button>
              }
              >{!user&&
                  <p className='text-center font-semibold '>
                    <Link href={"/login"} className='hover:text-red-500 transition-colors duration-150' > تسجيل الدخول </Link>
  لإستعمال هذه الميزات </p>
                }
                <DropdownButton >
              <NavLink active={pathname.startsWith("/books/favorite")} href="/books/favorite">كتبي المفضلة</NavLink>
                  
              </DropdownButton>
              <DropdownButton >
              <NavLink active={pathname.startsWith("/books/saved")} href="/books/saved">كتبي المحفوظة</NavLink>
                  
                </DropdownButton>
                <DropdownButton  >
                <NavLink active={pathname === "/books/readed"} href="/books/readed">كتبي التي قرأتها</NavLink>
                  
                </DropdownButton>
                <DropdownButton  >
                <NavLink active={pathname === "/books/published"} href="/books/published">كتبي التي نشرتها</NavLink>
                  
                </DropdownButton>
            </Dropdown>
              <Dropdown
              align="left"
              width={48}
              trigger={
                <button className="flex items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-700 transition duration-150">
                  <div>إعدادت الكتب</div>
                  <div className="ml-1">
                    <MdOutlineArrowDropDown  className='fill-current h-4 w-4'/>
                  </div>
                </button>
              }
              >
                  
                {!user&&(
                  <p className='text-center font-semibold '>يمكنك نشر الكتب إذا قمت ب
                  <Link className='hover:text-red-500 duration-150 transition-colors' href={"/login"}>تسجيل الدخول</Link>
                  </p>
                
                )}
                {user&&(
                
                <>
                <DropdownButton >
              <NavLink active={pathname === "/books/pending-delete"} href="/books/pending-delete">الكتب التي طالبت بحدفها</NavLink>
                  
              </DropdownButton>
              <DropdownButton >
              <NavLink active={pathname === "/books/pending-approve"} href="/books/pending-approve">الكتب التي طالبت بنشرها</NavLink>
                  
              </DropdownButton>
                </>
                )}
               
           
            </Dropdown>
              {user && user.role < 3 && (
                <>
                  <NavLink active={pathname.startsWith("/books/pending")} href="/books/pending">الكتب المعلقة</NavLink>
                  <NavLink active={pathname.startsWith("/users")} href="/users">الأعضاء</NavLink>
                </>
              )}

              {user && user.role === 1 && (
                <NavLink active={pathname.startsWith("/mods")} href="/mods">المشرفون</NavLink>
              )}
            </div>
          </div>

          {/* User Dropdown */}
          { 

            user?(
          <div className="hidden sm:flex sm:items-center">
            <Dropdown
              align="left"
              width={48}
              trigger={
                <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition duration-150">
                  <div>{user?.name}</div>
                  <div className="ml-1">
                    <MdOutlineArrowDropDown  className='fill-current h-4 w-4'/>
                  </div>
                </button>
              }
              >
              <DropdownButton onClick={logout}>تسجيل الخروج</DropdownButton>
            </Dropdown>
          </div>
        
            ) :
            <Link href={"/login"} className='hover:text-red-500 transition-colors duration-150 text-gray-500 self-center font-semibold text-xl' > تسجيل الدخول </Link>

            }

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex sm:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition duration-150"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {open && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink href="/books/1" active={pathname === "/books/1"}>الرئيسية</ResponsiveNavLink>
            <ResponsiveNavLink href="/books/popular" active={pathname.startsWith("/books/popular")}>أشهر الكتب</ResponsiveNavLink>
            <ResponsiveNavLink href="/books/saved" active={pathname.startsWith("/books/saved")}>كتبي المحفوظة</ResponsiveNavLink>
            <ResponsiveNavLink href="/books/favorite" active={pathname.startsWith("/books/favorite")}>كتبي المفضلة</ResponsiveNavLink>
            <ResponsiveNavLink href="/books/read" active={pathname.startsWith("/books/read") && pathname !== "/books/readed"}>
              كتبي التي أقرئها
            </ResponsiveNavLink>
            <ResponsiveNavLink href="/books/readed" active={pathname === "/books/readed"}>
              كتبي التي قرأتها
            </ResponsiveNavLink>

            {user && user.role < 3 && (
              <>
                <ResponsiveNavLink href="/books/pending" active={pathname.startsWith("/books/pending")}>الكتب المعلقة</ResponsiveNavLink>
                <ResponsiveNavLink href="/users" active={pathname.startsWith("/users")}>الأعضاء</ResponsiveNavLink>
              </>
            )}

            {user && user.role === 1 && (
              <ResponsiveNavLink href="/users/mods" active={pathname.startsWith("/users/mods")}>المشرفون</ResponsiveNavLink>
            )}
          </div>

          {/* User Info & Logout */}
          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="flex flex-col items-center px-4 space-y-3">
              <div className="flex items-center">
                <div className="h-10 w-10 text-gray-400">
                  <svg className="h-full w-full fill-current" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-3 text-center">
                  <div className="font-medium text-base text-gray-800">{user?.name}</div>
                  <div className="font-medium text-sm text-gray-500">{user?.email}</div>
                </div>
              </div>

              <ResponsiveNavButton onClick={logout} className="w-full text-center">
                تسجيل الخروج
              </ResponsiveNavButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
