'use client'

import { PropGenres, getMovie } from '@/app/api/get-movie'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SidebarLink } from './sidebarLink'
import { title } from './mobNav'

export const Sidebar = () => {
  const [genres, setGenres] = useState<PropGenres[] | undefined>()
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const searchParams = useSearchParams()
  const params = useParams()
  const genreFromSearchParams = searchParams.get('genre')

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getMovie()
      if (data) {
        setGenres(data)
      }
      console.log(data)
    }
    fetchGenres()
  }, [])

  useEffect(() => {
    if (genreFromSearchParams && typeof selectedGenre === 'string') {
      setSelectedGenre(genreFromSearchParams.toString())
      return
    }

    setSelectedGenre(params.id.toString())
  }, [genreFromSearchParams, params.id, selectedGenre])

  return (
    <div className="bg-primary px-10 max-h-[calc(100vh-77px)] pb-6 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-primary hidden sm:block">
      <div className="flex flex-col gap-4 pt-4">
        <p className="sidebarTitle">Discover</p>

        {title.map((item, i) => (
          <SidebarLink
            key={i}
            selectedGenre={selectedGenre}
            link={item.link}
            text={item.text}
          />
        ))}

        <div className="flex flex-col gap-4 pt-4">
          <p className="sidebarTitle">Genres</p>
          {genres &&
            genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/genres/${genre.id}?genre=${genre.name.toLocaleLowerCase()}`}
                className="w-fit"
              >
                <p
                  className={`sidebarLink ${genre.name.toLowerCase() === selectedGenre ? 'sidebarActive' : ''}`}
                >
                  {genre.name}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
