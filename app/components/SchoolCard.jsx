export default function SchoolCard({ school }) {
  const defaultImage = "/api/placeholder-image"
  const imageUrl = school.image ? `/schoolImages/${school.image}` : defaultImage

  return (
    <div className="school-card">
      <div className="school-image">
        <img 
          src={imageUrl} 
          alt={school.name}
          onError={(e) => {
            e.target.src = defaultImage
          }}
        />
      </div>

      <div className="school-content">
        <h3 className="school-name">{school.name}</h3>

        <div className="school-details">
          <div className="detail-item">
            <span className="icon">📍</span>
            <span className="text">{school.address}</span>
          </div>

          <div className="detail-item">
            <span className="icon">🏙️</span>
            <span className="text">{school.city}, {school.state}</span>
          </div>

          <div className="detail-item">
            <span className="icon">📞</span>
            <span className="text">{school.contact}</span>
          </div>

          <div className="detail-item">
            <span className="icon">✉️</span>
            <span className="text">{school.email_id}</span>
          </div>
        </div>
      </div>

      <div className="school-actions">
        <button className="btn btn-outline btn-small">
          View Details
        </button>
      </div>
    </div>
  )
}