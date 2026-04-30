import api from './axios'

export type GetImagesParams = {
  page?: number
  perPage?: number
  query?: string
}

export type UnsplashImage = {
  id: string
  alt_description: string | null
  description: string | null
  urls: {
    small: string
    regular: string
  }
  user: {
    name: string
  }
}

type SearchImagesResponse = {
  results: UnsplashImage[]
}

export async function getImages({
  page,
  perPage = 10,
  query,
}: GetImagesParams = {}): Promise<UnsplashImage[]> {
  if (query) {
    const response = await api.get<SearchImagesResponse>('/search/photos', {
      params: {
        page,
        per_page: perPage,
        query,
      },
    })

    return response.data.results
  }

  const response = await api.get<UnsplashImage[]>('/photos', {
    params: {
      page,
      per_page: perPage,
    },
  })

  return response.data
}
