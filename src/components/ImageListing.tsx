import { useInfiniteQuery } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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

type ImageListingProps = {
  query: string
}

export default function ImageListing({ query }: ImageListingProps) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['images', query],
    queryFn: ({ pageParam }) =>
      getImages({
        page: pageParam,
        perPage: IMAGES_PER_PAGE,
        query: query || undefined,
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
  const hasNoResults = !isLoading && !isError && images.length === 0

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
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-stone-500">
            Image Feed
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-stone-950">
            Latest photos
          </h2>
        </div>
        {isFetching && !isFetchingNextPage ? (
          <p className="text-sm text-stone-500">Searching...</p>
        ) : null}
      </div>

      {hasNoResults ? (
        <div className="rounded-[1.75rem] border border-stone-200/80 bg-white/70 p-8 text-center">
          <h3 className="text-lg font-semibold text-stone-900">No results found</h3>
          <p className="mt-2 text-sm text-stone-500">
            Try a broader keyword or a different subject.
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-12 gap-4">
        {images.map((image) => (
          <Dialog key={image.id}>
            <DialogTrigger
              className="col-span-12 overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white/85 text-left transition hover:-translate-y-0.5 sm:col-span-6 lg:col-span-3"
              render={<button type="button" />}
            >
              <div className="aspect-[4/5] overflow-hidden bg-stone-200">
                <img
                  alt={image.alt_description ?? image.description ?? 'Unsplash image'}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  src={image.urls.small}
                />
              </div>
              <div className="space-y-1 p-4">
                <h3 className="line-clamp-2 text-sm font-medium text-stone-900">
                  {image.alt_description ?? image.description ?? 'Untitled image'}
                </h3>
                <p className="text-sm text-stone-500">{image.user.name}</p>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[min(96vw,1400px)] p-5 sm:p-6">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-[1rem] bg-stone-100">
                  <img
                    alt={image.description ?? 'Image'}
                    className="max-h-[88vh] w-full object-contain"
                    src={image.urls.regular}
                  />
                </div>
                <DialogHeader>
                  <DialogTitle>
                    {image.alt_description ?? image.description ?? 'Untitled image'}
                  </DialogTitle>
                  <DialogDescription>Photo by {image.user.name}</DialogDescription>
                </DialogHeader>
              </div>
            </DialogContent>
          </Dialog>
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
