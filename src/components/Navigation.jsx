import { NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  return (
    <nav className="nav" aria-label="Main navigation">
      <NavLink to="/" end className="nav__link">
        Today
      </NavLink>
      <NavLink to="/history" className="nav__link">
        History
      </NavLink>
    </nav>
  )
}

export default Navigation