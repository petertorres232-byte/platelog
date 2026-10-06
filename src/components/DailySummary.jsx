import './DailySummary.css'

function roundOneDecimal(value) {
  return Math.round(value * 10) / 10
}

function DailySummary({ entries }) {
  const totals = entries.reduce(
    (sum, entry) => ({
      calories: sum.calories + entry.calories,
      protein: sum.protein + entry.protein,
      carbs: sum.carbs + entry.carbs,
      fat: sum.fat + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )

  const macros = [
    { label: 'Protein', value: totals.protein },
    { label: 'Carbs', value: totals.carbs },
    { label: 'Fat', value: totals.fat },
  ]

  return (
    <section className="summary" aria-label="Daily summary">
      <div className="summary__top">
        <div>
          <p className="summary__calories">
            {roundOneDecimal(totals.calories)}
            <span className="summary__unit"> kcal</span>
          </p>
          <p className="summary__label">Total calories</p>
        </div>
        <div className="summary__count">
          <p className="summary__calories">{entries.length}</p>
          <p className="summary__label">
            {entries.length === 1 ? 'entry' : 'entries'}
          </p>
        </div>
      </div>

      <ul className="summary__macros">
        {macros.map((macro) => (
          <li key={macro.label} className="summary__macro">
            <span className="summary__macro-value">
              {roundOneDecimal(macro.value)} g
            </span>
            <span className="summary__label">{macro.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DailySummary