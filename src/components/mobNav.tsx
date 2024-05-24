'use client'

import { getMovie, PropGenres } from '@/app/api/get-movie'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { MobSidebarLink } from './mobSidebarLink'

interface propsType {
  handleSearch: (e: FormEvent<HTMLFormElement>) => void
}

const title = [
  {
    link: 'now_playing',
    text: 'Now Playing',
  },
  {
    link: 'top_rated',
    text: 'Top Rated',
  },
  {
    link: 'popular',
    text: 'Popular',
  },
  {
    link: 'upcoming',
    text: 'Up Coming',
  },
]

export const MobNav = ({ handleSearch }: propsType) => {
  const [IsOpen, setIsOpen] = useState(false)
  const [genres, setGenres] = useState<PropGenres[] | undefined>()
  const [selectedGenre, setSelectedGenre] = useState('')

  const searchParams = useSearchParams()
  const params = useParams()
  const id = searchParams.get('genre')

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
    if (searchParams.get('genre')) {
      setSelectedGenre(searchParams.get('genre')!)
      return
    }
    setSelectedGenre(params.id.toString())
  }, [id, params.id, searchParams])

  return (
    <>
      <form className="md:hidden flex justify-between w-full">
        <div onClick={() => setIsOpen(true)}>
          <AiOutlineMenu size={30} />
        </div>

        <div className="space-x-4">
          <input
            className="bg-secondary px-4 py-2 outline-none placeholder:text-textColor text-[14px] w-[180px] rounded-md"
            type="text"
            placeholder="Buscar filmes..."
          />

          <button
            type="submit"
            className="bg-secondary rounded-md text-textColor py-2 px-4 hover:bg-textColor hover:text-white text-[14px]"
          >
            Buscar
          </button>
        </div>
      </form>

      <div
        className={`min-h-[100vh] max-h-[100vh] w-full bg-primary fixed left-0 top-0 z-10 overflow-scroll ${IsOpen ? 'block' : 'hidden'}`}
      >
        <div className="sticky top-0 bg-primary py-4 w-full">
          <IoMdClose
            onClick={() => setIsOpen(false)}
            className="absolute top-0 right-0 m-2 mt-7"
            size={28}
          />
          <Link
            className="w-fit"
            href="/discover/now_playing"
            onClick={() => setIsOpen(false)}
          >
            <div className="sidebarTitle text-[28px] text-center">
              MovieVerse
            </div>
          </Link>
        </div>

        <div className="px-4 pb-16">
          <div className="flex flex-col gap-4 pt-4">
            <p className="sidebarTitle">Discover</p>
            {title.map((item, i) => (
              <MobSidebarLink
                key={i}
                setIsOpen={setIsOpen}
                selectedGenre={selectedGenre}
                link={item.link}
                text={item.text}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4 pt-4">
            <p className="sidebarTitle">Genres</p>
            {genres &&
              genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genres/${genre.id}?genre=${genre.name.toLocaleLowerCase()}`}
                  className="w-fit"
                  onClick={() => setIsOpen(false)}
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
    </>
  )
}
