import './MealFilter.css'
import { MEAL_TYPES } from '../data/mealTypes'

const OPTIONS = ['All', ...MEAL_TYPES]

function MealFilter({ selectedMeal, onSelectMeal }) {
  return (
    <div className="meal-filter" role="group" aria-label="Filter by meal">
      {OPTIONS.map((option) => {
        const isSelected = selectedMeal === option
        return (
          <button
            key={option}
            type="button"
            className={
              isSelected
                ? 'meal-filter__button meal-filter__button--active'
                : 'meal-filter__button'
            }
            onClick={() => onSelectMeal(option)}
            aria-pressed={isSelected}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default MealFilter