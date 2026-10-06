import { useState } from 'react'
import DailySummary from '../components/DailySummary'
import DateSelector from '../components/DateSelector'
import FoodForm from '../components/FoodForm'
import FoodSearch from '../components/FoodSearch'
import MealFilter from '../components/MealFilter'
import MealSection from '../components/MealSection'
import { MEAL_TYPES } from '../data/mealTypes'
import { formatDateLabel, getToday } from '../utils/dates'

function HomePage({ entries, setEntries }) {
  const today = getToday()
  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedMeal, setSelectedMeal] = useState('All')

  const dayEntries = entries.filter((entry) => entry.date === selectedDate)
  const heading =
    selectedDate === today ? 'Today' : formatDateLabel(selectedDate)

  const visibleMeals =
    selectedMeal === 'All'
      ? MEAL_TYPES
      : MEAL_TYPES.filter((mealType) => mealType === selectedMeal)

  function handleAddEntry(entryData) {
    const newEntry = { ...entryData, id: Date.now(), date: selectedDate }
    setEntries((currentEntries) => [...currentEntries, newEntry])
    setSelectedMeal('All')
  }

  function handleDeleteEntry(id) {
    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== id)
    )
  }

  return (
    <section>
      <h2>{heading}</h2>
      <DateSelector
        selectedDate={selectedDate}
        maxDate={today}
        onDateChange={setSelectedDate}
      />
      <DailySummary entries={dayEntries} />
      <FoodSearch onAddEntry={handleAddEntry} />
      <FoodForm onAddEntry={handleAddEntry} />
      <MealFilter selectedMeal={selectedMeal} onSelectMeal={setSelectedMeal} />
      {visibleMeals.map((mealType) => {
        const mealEntries = dayEntries.filter(
          (entry) => entry.mealType === mealType
        )
        return (
          <MealSection
            key={mealType}
            title={mealType}
            entries={mealEntries}
            onDelete={handleDeleteEntry}
          />
        )
      })}
    </section>
  )
}

export default HomePage