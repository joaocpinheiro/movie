import React from 'react'
import { NavBar } from '@/components/navBar'
import { Sidebar } from '@/components/sidebar'

const Discover = () => {
  return (
    <div>
      <h1>Discover</h1>
      <NavBar />
      <div className="grid grid-cols-1 sm:grid-cols-[300px,1fr]">
        <Sidebar />
      </div>
    </div>
  )
}

export default Discover
