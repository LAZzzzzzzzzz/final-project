import Header from './components/Header'
import ImageListing from './components/ImageListing'

function App() {
  return (
    <main className="min-h-screen bg-stone-100 px-5 py-6 text-stone-950 sm:px-6 sm:py-8 lg:px-8">
      <div>
        <Header />
        <ImageListing />
      </div>
    </main>
  )
}

export default App
