import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import { mockEntries } from './data/foods'

function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('platelog-entries')
    return saved ? JSON.parse(saved) : mockEntries
  })

  useEffect(() => {
    localStorage.setItem('platelog-entries', JSON.stringify(entries))
  }, [entries])

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route
            path="/"
            element={<HomePage entries={entries} setEntries={setEntries} />}
          />
          <Route path="/history" element={<HistoryPage entries={entries} />} />
        </Routes>
      </main>
      <Footer appName="PlateLog" author="Peter Torres" />
    </div>
  )
}

export default App