'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

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
    <form onSubmit={handleSearch}>
      <input placeholder="Buscar Filme..." id="q" name="q" type="text" />
    </form>
  )
}
