'use client'
import Link from 'next/link'

interface propTypes {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  selectedGenre: string
  link: string
  text: string
}

export const SidebarLink = ({
  setIsOpen,
  selectedGenre,
  link,
  text,
}: propTypes) => {
  return (
    <Link
      className="w-fit"
      href={`/discover/${link}`}
      onClick={() => (setIsOpen !== undefined ? setIsOpen(false) : undefined)}
    >
      <p
        className={`sidebarLink ${selectedGenre === link ? 'sidebarActive' : ''}`}
      >
        {text}
      </p>
    </Link>
  )
}
