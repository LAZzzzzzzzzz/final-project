import { useInfiniteQuery } from '@tanstack/react-query'
import { getImages } from '../services/images'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'

const IMAGES_PER_PAGE = 20

function Spinner() {
  return (
    <div
      aria-label="Loading"
      className="h-10 w-10 animate-spin rounded-full border-4 border-stone-300 border-t-stone-900"
      role="status"
    >
      <span className="sr-only">Loading</span>
    </div>
  )
}

export default function ImageListing() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['images'],
    queryFn: ({ pageParam }) =>
      getImages({
        page: pageParam,
        perPage: IMAGES_PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < IMAGES_PER_PAGE) {
        return;
      }

      return allPages.length + 1
    },
  })

  const images = data?.pages.flatMap((page) => page) ?? []

  const sentinelRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  })

  if (isLoading) {
    return (
      <section className="mx-auto mt-6 max-w-6xl">
        <div className="flex min-h-[18rem] flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-stone-200/80 bg-white/70">
          <Spinner />
          <p className="text-sm text-stone-500">Loading images...</p>
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="mx-auto mt-6 max-w-6xl rounded-[1.75rem] border border-red-200 bg-red-50/80 p-6 text-red-950">
        <h2 className="text-lg font-semibold">Unable to load images.</h2>
        <p className="mt-2 text-sm text-red-800">
          {error.message || 'Error'}
        </p>
        <button
          className="mt-4 rounded-full border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-900 transition hover:bg-red-100"
          onClick={() => void refetch()}
          type="button"
        >
          Try again
        </button>
      </section>
    )
  }

  return (
    <section className="mx-auto mt-6 max-w-6xl">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.72rem] font-medium tracking-[0.18em] text-stone-500">
            IMAGE FEED
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-stone-950">
            Latest photos
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {images.map((image) => (
          <article
            key={image.id}
            className="col-span-12 overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white/85 transition hover:-translate-y-0.5 sm:col-span-6 lg:col-span-3"
          >
            <div className="aspect-[4/5] overflow-hidden bg-stone-200">
              <img
                alt='image'
                className="h-full w-full object-cover"
                src={image.urls.small}
              />
            </div>
            <div className="space-y-1 p-4">
              <h3 className="line-clamp-2 text-sm font-medium text-stone-900">
                {image.description || 'Untitled image'}
              </h3>
              <p className="text-sm text-stone-500">{image.user.name}</p>
            </div>
          </article>
        ))}

      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <div ref={sentinelRef} className="h-1 w-full" />
        {isFetchingNextPage ? (
          <>
            <Spinner />
            <p className="text-sm text-stone-500">Loading more images...</p>
          </>
        ) : null}
      </div>
    </section>
  )
}
