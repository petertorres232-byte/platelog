import './FoodItem.css'

function FoodItem({ entry, onDelete }) {
  return (
    <li className="food-item">
      <div className="food-item__main">
        <span className="food-item__name">{entry.name}</span>
        <span className="food-item__details">
          {entry.servingGrams ? `${entry.servingGrams} g · ` : ''}
          {entry.protein}g protein · {entry.carbs}g carbs · {entry.fat}g fat
        </span>
      </div>
      <div className="food-item__actions">
        <span className="food-item__calories">{entry.calories} kcal</span>
        <button
          type="button"
          className="food-item__delete"
          onClick={() => onDelete(entry.id)}
          aria-label={`Delete ${entry.name}`}
        >
          ✕
        </button>
      </div>
    </li>
  )
}

export default FoodItem