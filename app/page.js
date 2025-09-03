import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="hero-section text-center mb-12">
        <h1>Welcome to School Management System</h1>
        <p>Manage and organize school information efficiently with our modern web application.</p>

        <div className="action-buttons">
          <Link href="/addSchool" className="btn btn-primary">
            Add New School
          </Link>
          <Link href="/showSchools" className="btn btn-secondary">
            View All Schools
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📝 Add Schools</h3>
            <p>Easy form to add new schools with comprehensive validation</p>
          </div>
          <div className="feature-card">
            <h3>📋 View Schools</h3>
            <p>Browse schools in a beautiful, responsive grid layout</p>
          </div>
          <div className="feature-card">
            <h3>📸 Image Upload</h3>
            <p>Upload and manage school images with preview functionality</p>
          </div>
          <div className="feature-card">
            <h3>📱 Responsive</h3>
            <p>Works perfectly on all devices - mobile, tablet, and desktop</p>
          </div>
        </div>
      </div>
    </div>
  )
}