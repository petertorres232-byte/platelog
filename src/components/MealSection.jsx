import './MealSection.css'
import FoodItem from './FoodItem'

function MealSection({ title, entries, onDelete }) {
  return (
    <section className="meal-section">
      <h3 className="meal-section__title">{title}</h3>
      {entries.length === 0 ? (
        <p className="meal-section__empty">Nothing logged yet.</p>
      ) : (
        <ul className="meal-section__list">
          {entries.map((entry) => (
            <FoodItem key={entry.id} entry={entry} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default MealSection