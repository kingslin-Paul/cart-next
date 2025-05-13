import React from 'react'
import './sidebar.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House, LayoutDashboard, ShoppingCart } from 'lucide-react'

type SidebarProps={
  isOpen:boolean
}

function Sidebar({ isOpen }: SidebarProps) {

  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navLinkClass = (path: string) =>
    isActive(path) ? 'text-primary font-semibold bg-[#cce7e9]' : 'text-gray-600'

    const handleCloseSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar && overlay) {
      sidebar.classList.add('-translate-x-full');
      sidebar.classList.remove('translate-x-0');
      overlay.classList.add('-translate-x-full');
      overlay.classList.remove('translate-x-0');
    }
  };

  
  return (
    <>
    <div id="sidebar" className={`w-36 bg-[#E6F3F4] shadow-md h-full transition-all duration-300 absolute sm:relative sm:translate-x-0 -translate-x-full z-50 ${isOpen?'translate-x-0':'-translate-x-full'}`}>
          <ul className="flex flex-col p-4 gap-2 text-sm text-[#006A71]">
            <li>
              <Link href="/home" onClick={handleCloseSidebar}>
                <span
                  className={`px-2 py-1 flex gap-1 items-center rounded-md cursor-pointer hover:bg-[#cce7e9] hover:font-medium transition-colors duration-200 ${navLinkClass('/home')}`}>
                  <LayoutDashboard size={18} color="#48A6A7"/>
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/cart" onClick={handleCloseSidebar}>
                <span
                  className={`flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-[#cce7e9] hover:font-medium transition-colors duration-200 ${navLinkClass('/cart')}`}>
                  <ShoppingCart size={18} color="#48A6A7" />
                  Cart
                </span>
              </Link>
            </li>
          </ul>
    </div>
    {/* <div className={`bgvlack sm:hidden -translate-x-full transition-all duration-300 ${isOpen?'translate-x-0':'-translate-x-full'}`}></div> */}

   {/* Backdrop for mobile
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 sm:hidden z-40"
        />
      )} */}

       {/* Overlay for mobile */}
      <div
        id="overlay"
        onClick={handleCloseSidebar}
        className={`fixed inset-0 bg-black bg-opacity-30 sm:hidden transition-all duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      > </div>

    </>
  )
}

export default Sidebar