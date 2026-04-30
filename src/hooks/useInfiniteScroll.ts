import { useEffect, useRef } from 'react'

type UseInfiniteScrollOptions = {
  fetchNextPage: () => Promise<unknown>
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
  rootMargin?: string
}

export function useInfiniteScroll({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  rootMargin = '320px',
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const sentinelNode = sentinelRef.current

    if (!sentinelNode || !hasNextPage || isFetchingNextPage) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (entry?.isIntersecting) {
          void fetchNextPage()
        }
      },
      { rootMargin },
    )

    observer.observe(sentinelNode)

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, rootMargin])

  return sentinelRef
}
