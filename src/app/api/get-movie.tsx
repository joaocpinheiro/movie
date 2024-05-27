import { BASE_URL } from '../utils/const'

// interface Genre {
//   id: number
//   name: string
// }

export type PropGenres = {
  id: number
  name: string
}

export async function getMovie(): Promise<PropGenres[] | undefined> {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en`,
    )
    const data = await response.json()
    console.log(data.genres)
    return data.genres
  } catch (e) {
    console.log(e)
  }
}
