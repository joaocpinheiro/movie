import { MovieDetailsContent } from '@/components/movieDetailsContent'
import { NavBar } from '@/components/navBar'
import { Sidebar } from '@/components/sidebar'
import React from 'react'

const MovieDetails = () => {
  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-1 sm:grid-cols-[300px,1fr]">
        <Sidebar />
        <MovieDetailsContent />
      </div>
    </div>
  )
}

export default MovieDetails
