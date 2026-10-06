import HistoryDay from '../components/HistoryDay'

function HistoryPage({ entries }) {
  const dates = [...new Set(entries.map((entry) => entry.date))]
    .sort()
    .reverse()

  return (
    <section>
      <h2>History</h2>

      {dates.length === 0 ? (
        <p>No entries yet. Add some foods on the Today page.</p>
      ) : (
        dates.map((date) => (
          <HistoryDay
            key={date}
            date={date}
            entries={entries.filter((entry) => entry.date === date)}
          />
        ))
      )}
    </section>
  )
}

export default HistoryPage