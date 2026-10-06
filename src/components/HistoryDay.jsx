import './HistoryDay.css'
import { formatDateLabel } from '../utils/dates'

function HistoryDay({ date, entries }) {
  const totalCalories = entries.reduce(
    (sum, entry) => sum + entry.calories,
    0
  )

  return (
    <section className="history-day">
      <div className="history-day__header">
        <h3 className="history-day__title">{formatDateLabel(date)}</h3>
        <p className="history-day__total">
          {Math.round(totalCalories * 10) / 10} kcal
        </p>
      </div>
      <p className="history-day__count">
        {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
      </p>

      <ul className="history-day__list">
        {entries.map((entry) => (
          <li key={entry.id} className="history-day__item">
            <span>
              {entry.name}
              <span className="history-day__meal"> · {entry.mealType}</span>
            </span>
            <span className="history-day__kcal">{entry.calories} kcal</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default HistoryDay