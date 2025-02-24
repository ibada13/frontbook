import React, { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'

interface NavLinkProps extends LinkProps {
  active?: boolean
  children: ReactNode
}

const NavLink = ({ active = false, href, children, ...props }: NavLinkProps) => (
  <Link
    href={href}
    {...props}
    className={`inline-flex items-center  pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
      active
        ? 'border-indigo-400 text-gray-300 focus:border-indigo-700 font-bold'
        : 'border-transparent text-red-500 hover:text-red-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 transition-all duration-300'
    }`}
  >
    {children}
  </Link>
)

export default NavLink
