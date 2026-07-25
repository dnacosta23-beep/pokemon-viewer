import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302')
        if (!response.ok) {
          throw new Error('could not load pokemon')
        }

        const data = await response.json()

        const pokemonWithImages = data.results.map((item) => {
        const id = item.url.split('/').filter(Boolean).pop()

        return {
        id,
        name: item.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      }
      })

        setPokemon(pokemonWithImages)
      } catch (error) {
        console.error('Error fetching Pokemon:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  const filteredPokemon = pokemon.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase())
)

  return (
      <div className="app">
      <header className="header">
        <h1>Pokémon Viewer</h1>
        <p>A simple React app powered by the PokéAPI.</p>
      </header>

      <main className="main-content">

        <div className="search-container">
        <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
       />
        </div>

        {loading && <p className="message">Loading Pokémon...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <section className="pokemon-grid">
            {filteredPokemon.map((item) => (
              <article className="pokemon-card" key={item.id}>
                <img src={item.image} alt={item.name} />

                <p className="pokemon-number">
                  #{String(item.id).padStart(3, '0')}
                </p>

                <h2>{item.name}</h2>
              </article>
            ))}
          </section>
        )}

        {!loading && !error && filteredPokemon.length === 0 && (
        <p className="message">
        No Pokémon found.
        </p>
       )}    
      </main>

      <footer className="footer">
        <p>Pokémon data provided by the PokéAPI.</p>
      </footer>
    </div>
  )
}

export default App
