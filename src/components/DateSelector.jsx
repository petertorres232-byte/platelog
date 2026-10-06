import './DateSelector.css'
import { addDays, formatDateLabel } from '../utils/dates'

function DateSelector({ selectedDate, maxDate, onDateChange }) {
  const isAtMax = selectedDate >= maxDate

  function handlePickerChange(event) {
    if (event.target.value) {
      onDateChange(event.target.value)
    }
  }

  return (
    <div className="date-selector">
      <button
        type="button"
        className="date-selector__arrow"
        onClick={() => onDateChange(addDays(selectedDate, -1))}
        aria-label="Previous day"
      >
        ‹
      </button>

      <div className="date-selector__center">
        <span className="date-selector__title">
          {formatDateLabel(selectedDate)}
        </span>
        <input
          type="date"
          className="date-selector__picker"
          value={selectedDate}
          max={maxDate}
          onChange={handlePickerChange}
          aria-label="Choose a date"
        />
        {selectedDate !== maxDate && (
          <button
            type="button"
            className="date-selector__today"
            onClick={() => onDateChange(maxDate)}
          >
            Back to today
          </button>
        )}
      </div>

      <button
        type="button"
        className="date-selector__arrow"
        onClick={() => onDateChange(addDays(selectedDate, 1))}
        disabled={isAtMax}
        aria-label="Next day"
      >
        ›
      </button>
    </div>
  )
}

export default DateSelector