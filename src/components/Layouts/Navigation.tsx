import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

import NavLink from '@/components/NavLink'
import Dropdown from '@/components/Dropdown'
import ResponsiveNavLink, {
  ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { GiBookStorm } from 'react-icons/gi'
import { UserType } from '@/types/User'
import { useAuth } from '@/hooks/auth'

const Navigation = ({ user }: { user: UserType }) => {
  const pathname = usePathname()

  const { logout } = useAuth({})
  const [open, setOpen] = useState<boolean>(false)

  return (
    <nav className="bg-black border-red-800 border-b shadow-2xl">
      {/* Primary Navigation Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/books/1">
                <GiBookStorm  className="block  w-auto fill-current text-red-500 text-3xl hover:text-red-900 transition-all duration-300" size={65}/>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="sm:mr-4 sm:gap-x-10     hidden sm:flex sm:justify-around ">
           
              <NavLink active={ pathname === "/books/1"} href="/books/1">الرئيسية</NavLink>
              
              <NavLink active={ pathname.startsWith("/books/popular")} href="/books/popular">أشهر الكتب</NavLink>
                
              <NavLink active={ pathname.startsWith("/books/saved")} href="/books/saved">كتبي المحفوظة</NavLink>
                
<NavLink active={pathname.startsWith("/books/read") && pathname !== "/books/readed"} href="/books/read">
  كتبي التي أقرئها
</NavLink>
              <NavLink active={pathname === "/books/readed"} href="/books/readed">
  كتبي التي قرأتها
</NavLink>

              {user&& user.role<3&&(
              <>
                  <NavLink active={ pathname.startsWith("/books/pending")} href="/books/pending">الكتب المعلقة </NavLink>
                
                <NavLink active={ pathname.startsWith("/users")} href="/users">الأعضاء</NavLink>
              </>
              )
              }
              {user && user.role === 1&&(
                
                
                <NavLink active={ pathname.startsWith("/users/mods")} href="/users/mods">المشرفون</NavLink>
              )
              }

            </div>
          </div>

          {/* Settings Dropdown */}
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <Dropdown
              align="right"
              width={48}
              trigger={
                <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                  <div>{user?.name}</div>

                  <div className="ml-1">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              }>
              {/* Authentication */}
              <DropdownButton onClick={logout}>Logout</DropdownButton>
            </Dropdown>
          </div>

          {/* Hamburger */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setOpen(open => !open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24">
                {open ? (
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Navigation Menu */}
      {open && (
        <div className="block sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
              href="/dashboard"
              active={pathname === '/dashboard'}>
              Dashboard
            </ResponsiveNavLink>
          </div>

          {/* Responsive Settings Options */}
          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-10 w-10 fill-current text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <div className="ml-3">
                <div className="font-medium text-base text-gray-800">
                  {user?.name}
                </div>
                <div className="font-medium text-sm text-gray-500">
                  {user?.email}
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              {/* Authentication */}
              <ResponsiveNavButton onClick={logout}>Logout</ResponsiveNavButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
