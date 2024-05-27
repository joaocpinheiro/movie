import React from 'react'
import { NavBar } from '@/components/navBar'
import { Sidebar } from '@/components/sidebar'
import { SearchContent } from '@/components/searchContent'

const Discover = () => {
  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-1 sm:grid-cols-[300px,1fr]">
        <Sidebar />
        <SearchContent />
      </div>
    </div>
  )
}

export default Discover
