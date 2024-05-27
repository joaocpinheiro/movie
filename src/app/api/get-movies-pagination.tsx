import { BASE_URL } from '../utils/const'

export interface results {
  id: number
  poster_path: string
  title: string
  release_date: string
  adult: boolean
}

export interface moviesResponse {
  results: results[]
  total_pages: number
  page: number
}

export async function getMoviePagination(
  id: string,
  page: number,
): Promise<moviesResponse | undefined> {
  try {
    const url = new URL(`${BASE_URL}/movie/${id}`)
    const params = new URLSearchParams({
      api_key: process.env.NEXT_PUBLIC_API_KEY!,
      page: page.toString(),
    })

    url.search = params.toString()
    const response = await fetch(url.toString())
    const data = await response.json()
    console.log(data)
    return data
  } catch (e) {
    console.log(e)
  }
}
