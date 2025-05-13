'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import './header.css'

type HeaderProps={
  toggleSidebar:()=>void
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinkClass = (path: string) =>
    isActive(path) ? 'text-primary font-semibold' : 'text-gray-600';

  return (
    <header className="flex items-center justify-between p-4 pl-10 sm:pl-4 border-b border-border bg-white relative shadow-sm gap-5 z-50">
        <div onClick={toggleSidebar} className='absolute left-2 block sm:hidden cursor-pointer'>
            <Menu color='#006A71' size={20}/>
        </div>
      <Link href="/">
        <span className="text-xl lg:text-2xl  font-bold text-primary">Cart</span>
      </Link>

      <div className='relative h-fit'>
        {/* <Search className='absolute top-1/4 left-[6px]' color='#A9A9A9' size={20}/> */}
        <Search className="absolute top-1/4 left-[6px] text-[#A9A9A9] w-4 h-4 sm:w-5 sm:h-5"/>
      <input type="text" placeholder='Search the products' id="default-input" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-1.5 pl-[26px] sm:p-2.5 sm:pl-7 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary outline-none w-full sm:w-[300px] lg:w-96" />
      </div>

      <nav className="flex items-center gap-4 md:gap-5 lg:gap-6">
        {/* <div className='group cursor-pointer'>
        <Link href="/home">
          <span className={`hover:text-primary text-xs md:text-sm lg:text-base ${navLinkClass('/home')}`}>Home</span>
        </Link>
        <div className={`h-[2px] bg-primary mt-1 transition-all duration-300 ease-in-out ${isActive('/home') ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
        </div> */}
        

        {/* <div className='group cursor-pointer mt-1 lg:mt-0'>
        <Link href="/cart">
          <span className={`hover:text-primary text-xs md:text-sm lg:text-base ${navLinkClass('/cart')} flex items-center gap-1`}>
            <ShoppingCart color='#48A6A7' size={20} />
            Cart
          </span>
        </Link> 
        <div className={`h-[2px] bg-primary mt-1 transition-all duration-300 ease-in-out ${isActive('/cart') ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
        </div> */}
        
        <User className="w-6 h-6 text-gray-600 hover:text-primary cursor-pointer" />
      </nav>
    </header>
  );
}
