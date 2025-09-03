import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'School Management System',
  description: 'Manage and organize school information efficiently',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="navbar">
          <div className="container">
            <div className="nav-brand">
              <h1>🏫 School Management System</h1>
            </div>
            <div className="nav-links">
              <a href="/">Home</a>
              <a href="/addSchool">Add School</a>
              <a href="/showSchools">Show Schools</a>
            </div>
          </div>
        </nav>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}