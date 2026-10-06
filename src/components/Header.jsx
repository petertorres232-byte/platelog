import './Header.css'
import Navigation from './Navigation'

function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo" aria-hidden="true">🍽️</span>
        <h1 className="header__title">PlateLog</h1>
      </div>
      <p className="header__tagline">Track what you eat, one plate at a time.</p>
      <Navigation />
    </header>
  )
}

export default Header