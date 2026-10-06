import './Footer.css'

function Footer({ appName, author }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>
        &copy; {year} {appName}. Built by {author}.
      </p>
    </footer>
  )
}

export default Footer