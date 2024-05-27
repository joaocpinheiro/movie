'use client'
import { getGenresPagination } from '@/app/api/get-genres-pagination'
import { results } from '@/app/api/get-movies-pagination'
import { Card } from '@/components/card'
import { Loading } from '@/components/Loading'
import { Footer } from '@/components/footer'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export const GenresContent = () => {
  const [title, setTitle] = useState('')
  const [movies, setMovies] = useState<results[] | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const mainRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  useEffect(() => {
    mainRef?.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    const id = params.id.toString()
    const genre = searchParams.get('genre')
    const page = searchParams.get('page')

    setTitle(`Filmes de ${genre}`)

    const fetchMovies = async () => {
      const data = await getGenresPagination(id, currentPage)
      if (data) {
        setMovies(data.results)
        setCurrentPage(data.page)
        setTotalPage(data.total_pages)
        console.log(data)
      }
    }
    fetchMovies()
    console.log(currentPage, page)
  }, [params.id, searchParams])

  const handlePageChange = (button: string) => {
    let page = ''
    if (button === 'prev') {
      page = `page=${currentPage - 1}`
      setCurrentPage((state) => state - 1)
    } else {
      page = `page=${currentPage + 1}`
      setCurrentPage((state) => state + 1)
    }
    router.push(
      `/genres/${params.id}?genre=${searchParams.get('genre')}&${page}`,
    )
  }
  return (
    <>
      <main
        className="bg-secondary max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] p-8 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-primary relative"
        ref={mainRef}
      >
        <h2 className="text[24px] tracking-[2px]">{title}</h2>

        {movies?.length === 0 && <Loading />}

        <div className="grid gap-8 moviesGrid place-items-center mt-8">
          {movies &&
            movies.map((movie) => (
              <Card
                key={movie.id}
                img={movie.poster_path}
                id={movie.id}
                title={movie.title}
                releaseDate={movie.release_date}
              />
            ))}
        </div>

        <div className="flex justify-center gap-16 py-6 pt-16">
          <button
            onClick={() => handlePageChange('prev')}
            className={`bg-purple-900 p-2 px-8 hover:bg-purple-950 ${currentPage === 1 && 'hidden'}`}
          >
            Prev
          </button>
          <button
            onClick={() => handlePageChange('next')}
            className={`bg-purple-900 p-2 px-8 hover:bg-purple-950 ${currentPage === totalPage && 'hidden'}`}
          >
            Next
          </button>
        </div>
        <div className="pb-20">
          <Footer />
        </div>
      </main>
    </>
  )
}
