import { Search as SearchIcon } from 'lucide-react'

export default function Header() {
  return (
    <header className="mx-auto grid max-w-6xl gap-7 rounded-[2rem] border border-stone-300/70 bg-white/80 p-6 backdrop-blur md:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.95fr)] md:items-end md:p-8 lg:p-10">
      <div className="space-y-5">
        <div className="inline-flex items-center rounded-full border border-stone-300 bg-stone-50 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-stone-500">
          Photo Archive
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-[-0.08em] text-stone-950 sm:text-5xl lg:text-7xl">
            Find Images.
          </h1>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-stone-300/80 bg-stone-50/90 p-4">
        <label
          className="mb-3 block text-[0.72rem] font-medium uppercase tracking-[0.18em] text-stone-500"
          htmlFor="photo-search"
        >
          Search Photos
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-stone-400">
            <SearchIcon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
          </span>
          <input
            id="photo-search"
            className="w-full rounded-[1.15rem] border border-stone-200 bg-white py-4 pl-11 pr-4 text-sm text-stone-900 outline-none transition focus:border-stone-400 focus:ring-4 focus:ring-stone-200/70 sm:text-base"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>
    </header>
  )
}
