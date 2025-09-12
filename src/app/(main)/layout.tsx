'use client'

import { useState } from 'react'
import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/sidebar'
import { CartProvider } from '../context/CartContext' 

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
    <CartProvider>
    <Header toggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
      <div className="flex h-full relative overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        <main style={{height:'calc(100vh - 75px)'}} className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </CartProvider>
    </>
  )
}
