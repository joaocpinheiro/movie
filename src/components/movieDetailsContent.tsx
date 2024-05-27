'use client'

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { Loading } from './Loading'
import { IoMdClose } from 'react-icons/io'
import Image from 'next/image'
import { BASE_IMG_URL } from '@/app/utils/const'
import { Footer } from './footer'
import { Genres } from './genres'
import { BsPlayFill } from 'react-icons/bs'
import ReactPlayer from 'react-player/youtube'

export interface Result {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}
export interface Videos {
  results: Result[]
}
export interface Genre {
  id: number
  name: string
}
export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}
export interface Root {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: string
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  videos: Videos
}

export const MovieDetailsContent = () => {
  const [movie, setMovie] = useState<Root | undefined>()
  const [showPlayer, setShowPlayer] = useState(false)
  const [trailer, setTrailer] = useState('')

  const router = useRouter()
  const params = useParams()

  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos`,
      )
      .then((res) => {
        console.log(res.data)
        setMovie(res.data)
      })
  }, [params.id])

  useEffect(() => {
    const trailerIndex = movie?.videos?.results?.findIndex(
      (element) => element.type === 'Trailer',
    )

    const trailerURL = `https://www.youtube.com/watch?v=${movie?.videos?.results[trailerIndex!]?.key}`
    setTrailer(trailerURL)
  }, [movie])

  const startPlayer = () => {
    mainRef?.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    setShowPlayer(true)
  }

  return (
    <main
      className="bg-secondary max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] p-8 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-primary relative"
      ref={mainRef}
    >
      {movie === null && <Loading />}

      <div
        className="text-textColor hover:text-white absolute right-0 top-0 m-2 cursor-pointer"
        onClick={router.back}
      >
        <IoMdClose size={28} />
      </div>

      <div className="flex justify-center items-center pt-4 md:pt-0">
        <div className="grid  max-w-[1200px] gap-12">
          <div className="flex">
            <Image
              src={`${BASE_IMG_URL}${movie?.poster_path}`}
              alt={movie ? movie.title : ''}
              priority={true}
              width={300}
              height={300}
            />

            <div className="space-y-6 md:space-y-3 text-textColor ml-5">
              <div className="uppercase text-[26px] md:text-[34px] font-medium pr-4 text-white">
                {movie?.title}
              </div>

              <div className="flex gap-4 flex-wrap">
                {movie?.genres?.map((genre, index) => {
                  return (
                    <Genres
                      key={genre.id}
                      index={index}
                      length={movie.genres.length}
                      name={genre.name}
                      id={genre.id}
                    />
                  )
                })}
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                <div>Language: {movie?.original_language.toUpperCase()}</div>
                <div>Release: {movie?.release_date}</div>
                <div>Runtime: {movie?.runtime}</div>
                <div>Rating: {movie?.vote_average}</div>
              </div>

              <div className="pt-14 space-y-2 pr-4">
                <div>Overview:</div>
                <div>{movie?.overview}</div>
              </div>

              <div
                className="inline-block pt-6 cursor-pointer"
                onClick={startPlayer}
              >
                <div className="flex gap-2 items-center bg-white text-black px-4 py-2 mb-6 hover:bg-[#b4b4b4]">
                  <BsPlayFill size={24} />
                  <h2>Watch Trailer</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${showPlayer ? 'opacity-100 z-50' : 'opacity-0 -z-10'}`}
        >
          <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
            <span className="font-semibold">Playing Trailer</span>
            <div
              className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
              onClick={() => setShowPlayer(false)}
            >
              <IoMdClose className="h-5" />
            </div>
          </div>
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url={trailer}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: '0', left: '0' }}
              controls={true}
              playing={showPlayer}
            />
          </div>
        </div>
      </div>
      <div className="pt-auto">
        <Footer />
      </div>
    </main>
  )
}
