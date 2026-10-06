import { useState } from 'react'
import './FoodSearch.css'

function getNutrientValue(nutrients, nameOrId) {
  if (!nutrients) return 0
  const found = nutrients.find(
    (n) =>
      n.nutrientName?.toLowerCase().includes(String(nameOrId).toLowerCase()) ||
      n.nutrientId === nameOrId
  )
  return found ? Math.round(found.value || 0) : 0
}

function FoodSearch({ onAddEntry }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const apiKey = import.meta.env.VITE_USDA_API_KEY

  const handleInputChange = (e) => {
    setQuery(e.target.value)
    if (error) setError(null)
    if (hasSearched) setHasSearched(false)
  }

  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return

    // Guard: Missing API key
    if (!apiKey) {
      setError('USDA API key is missing. Check your .env file.')
      return
    }

    setLoading(true)
    setError(null)
    setResults([])
    setHasSearched(false)

    try {
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
          query
        )}&pageSize=5&api_key=${apiKey}`
      )

      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          throw new Error('Invalid or expired USDA API key.')
        }
        throw new Error(`Server returned status ${response.status}.`)
      }

      const data = await response.json()
      setResults(data.foods || [])
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while searching.')
    } finally {
      setLoading(false)
      setHasSearched(true)
    }
  }

  function handleSelectFood(food) {
    const nutrients = food.foodNutrients || []

    const calories =
      getNutrientValue(nutrients, 'Energy') ||
      getNutrientValue(nutrients, 1008)
    const protein =
      getNutrientValue(nutrients, 'Protein') ||
      getNutrientValue(nutrients, 1003)
    const carbs =
      getNutrientValue(nutrients, 'Carbohydrate') ||
      getNutrientValue(nutrients, 1005)
    const fat =
      getNutrientValue(nutrients, 'Total lipid (fat)') ||
      getNutrientValue(nutrients, 1004)

    onAddEntry({
      name: food.description,
      mealType: 'Breakfast',
      servingGrams: food.servingSize || null,
      calories,
      protein,
      carbs,
      fat,
      source: 'usda',
      sourceId: food.fdcId,
    })
  }

  return (
    <section className="food-search">
      <h3 className="food-search__title">Search USDA Database</h3>
      <form className="food-search__form" onSubmit={handleSearch}>
        <input
          type="text"
          className="food-search__input"
          placeholder="e.g. Banana, Chicken breast, Eggs..."
          value={query}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="food-search__button"
          disabled={loading || !query.trim()}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="food-search__error">{error}</p>}

      {!loading && hasSearched && results.length === 0 && !error && (
        <p className="food-search__status">No matching foods found.</p>
      )}

      {results.length > 0 && (
        <ul className="food-search__results">
          {results.map((food) => {
            const nutrients = food.foodNutrients || []
            const kcal =
              getNutrientValue(nutrients, 'Energy') ||
              getNutrientValue(nutrients, 1008)

            return (
              <li key={food.fdcId} className="food-search__result-item">
                <div className="food-search__result-info">
                  <span className="food-search__result-name">
                    {food.description}
                  </span>
                  <span className="food-search__result-details">
                    {kcal} kcal per serving
                  </span>
                </div>
                <button
                  type="button"
                  className="food-search__add-btn"
                  onClick={() => handleSelectFood(food)}
                >
                  + Add
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default FoodSearch