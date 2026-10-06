import { useState } from 'react'
import './FoodForm.css'
import { MEAL_TYPES } from '../data/mealTypes'

const EMPTY_FORM = {
  name: '',
  mealType: 'Breakfast',
  calories: '',
  protein: '',
  carbs: '',
  fat: '',
}

const OPTIONAL_FIELDS = [
  { name: 'protein', label: 'Protein (g)' },
  { name: 'carbs', label: 'Carbs (g)' },
  { name: 'fat', label: 'Fat (g)' },
]

function validate(formData) {
  const errors = {}

  if (formData.name.trim() === '') {
    errors.name = 'Please enter a food name.'
  }

  const calories = Number(formData.calories)
  if (
    formData.calories.trim() === '' ||
    Number.isNaN(calories) ||
    calories <= 0
  ) {
    errors.calories = 'Calories must be a number greater than 0.'
  }

  OPTIONAL_FIELDS.forEach((field) => {
    const value = formData[field.name]
    if (value && value.trim() !== '') {
      const number = Number(value)
      if (Number.isNaN(number) || number < 0) {
        errors[field.name] = 'Enter 0 or a positive number.'
      }
    }
  })

  return errors
}

function FoodForm({ onAddEntry }) {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })

    // Clear error for this specific field as user types
    if (errors[name]) {
      setErrors((prevErrors) => {
        const updated = { ...prevErrors }
        delete updated[name]
        return updated
      })
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = validate(formData)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      return
    }

    onAddEntry({
      name: formData.name.trim(),
      mealType: formData.mealType,
      servingGrams: null,
      calories: Number(formData.calories),
      protein: Number(formData.protein) || 0,
      carbs: Number(formData.carbs) || 0,
      fat: Number(formData.fat) || 0,
      source: 'manual',
      sourceId: null,
    })

    setFormData({ ...EMPTY_FORM, mealType: formData.mealType })
    setErrors({})
  }

  return (
    <form className="food-form" onSubmit={handleSubmit} noValidate>
      <h3 className="food-form__title">Add food</h3>

      <div className="food-form__grid">
        <div className="food-form__field food-form__field--full">
          <label htmlFor="name">Food name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Turkey sandwich"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className="food-form__error">{errors.name}</p>}
        </div>

        <div className="food-form__field">
          <label htmlFor="mealType">Meal</label>
          <select
            id="mealType"
            name="mealType"
            value={formData.mealType}
            onChange={handleChange}
          >
            {MEAL_TYPES.map((meal) => (
              <option key={meal} value={meal}>
                {meal}
              </option>
            ))}
          </select>
        </div>

        <div className="food-form__field">
          <label htmlFor="calories">Calories (kcal)</label>
          <input
            id="calories"
            name="calories"
            type="number"
            min="0"
            step="any"
            value={formData.calories}
            onChange={handleChange}
            aria-invalid={Boolean(errors.calories)}
          />
          {errors.calories && (
            <p className="food-form__error">{errors.calories}</p>
          )}
        </div>

        {OPTIONAL_FIELDS.map((field) => (
          <div key={field.name} className="food-form__field">
            <label htmlFor={field.name}>{field.label} (optional)</label>
            <input
              id={field.name}
              name={field.name}
              type="number"
              min="0"
              step="any"
              value={formData[field.name]}
              onChange={handleChange}
              aria-invalid={Boolean(errors[field.name])}
            />
            {errors[field.name] && (
              <p className="food-form__error">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>

      <button type="submit" className="food-form__button">
        Add entry
      </button>
    </form>
  )
}

export default FoodForm