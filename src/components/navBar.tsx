'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { MobNav } from './mobNav'

export function NavBar() {
  const router = useRouter()

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const query = data.q
    router.push(`/search/${query}?page=1`)
  }

  return (
    <div className="bg-primary">
      <div className="flex justify-between items-center py-4 px-2 md:px-10">
        <Link className="hidden md:block" href="/discover/now_playing">
          <h2 className="text-[30px]">Movieverse</h2>
        </Link>

        <form className="space-x-4 hidden md:block" onSubmit={handleSearch}>
          <input
            placeholder="Buscar Filme..."
            id="q"
            name="q"
            type="text"
            className="bg-secondary px-4 py-2 outline-none placeholder:text-textColor rounded-md"
          />
          <button className="bg-secondary text-textColor py-2 px-4 hover:bg-textColor hover:text-white rounded-md">
            Buscar
          </button>
        </form>
        <MobNav />
      </div>
    </div>
  )
}
