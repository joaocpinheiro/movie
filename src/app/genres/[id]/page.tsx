import { GenresContent } from '@/components/genresContent'
import { NavBar } from '@/components/navBar'
import { Sidebar } from '@/components/sidebar'

const Genres = () => {
  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-1 sm:grid-cols-[300px,1fr]">
        <Sidebar />
        <GenresContent />
      </div>
    </div>
  )
}

export default Genres
