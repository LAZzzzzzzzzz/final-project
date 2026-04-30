import { useState } from 'react'
import Header from './components/Header'
import ImageListing from './components/ImageListing'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim()
  const debouncedQuery = useDebounce(normalizedQuery, 400)

  return (
    <main className="min-h-screen bg-stone-100 px-5 py-6 text-stone-950 sm:px-6 sm:py-8 lg:px-8">
      <div>
        <Header query={query} onQueryChange={setQuery} />
        <ImageListing query={debouncedQuery} />
      </div>
    </main>
  )
}

export default App
