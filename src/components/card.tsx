'use client'
import { BASE_IMG_URL } from '@/app/utils/const'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { CardSkeleton } from './cardSkeleton'

interface propsType {
  img: string
  id: number
  title: string
  releaseDate: string
}

export const Card = ({ img, id, title, releaseDate }: propsType) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className="group bg-primary h-[450px] md:h-335px] w-full">
      {!loaded && !error && <CardSkeleton />}
      {error && <CardSkeleton error />}

      <Link
        className={`${!loaded && error && 'hidden'}`}
        href={`/details/${id}`}
      >
        <div className="relative h-[450px] md:h-335px] w-full">
          <Image
            className="object-cover h-[450px] md:h-335px] w-full"
            src={`${BASE_IMG_URL}${img}`}
            alt="movie poster"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            priority={true}
            fill={true}
          />
          <div className="absolute bg-primary w-full bottom-0 px-4 py-2 text-center transition-all duration-500 opacity-0 group-hover:opacity-100">
            {title}
            <p>{releaseDate}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
