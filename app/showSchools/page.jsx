"use client"
import { useState, useEffect } from 'react'
import SchoolCard from '../components/SchoolCard'

export default function ShowSchools() {
  const [schools, setSchools] = useState([])
  const [filteredSchools, setFilteredSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState('')

  useEffect(() => {
    fetchSchools()
  }, [])

  useEffect(() => {
    filterSchools()
  }, [schools, searchTerm, selectedState])

  const fetchSchools = async () => {
    try {
      const response = await fetch('/api/schools')
      const data = await response.json()
      setSchools(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching schools:', error)
      setLoading(false)
    }
  }

  const filterSchools = () => {
    let filtered = schools

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(school =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by state
    if (selectedState) {
      filtered = filtered.filter(school => 
        school.state.toLowerCase() === selectedState.toLowerCase()
      )
    }

    setFilteredSchools(filtered)
  }

  const uniqueStates = [...new Set(schools.map(school => school.state))]

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading schools...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1>All Schools</h1>
          <p>Browse through our collection of registered schools</p>
        </div>
        <a href="/addSchool" className="btn btn-primary">
          Add New School
        </a>
      </div>

      {schools.length > 0 && (
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search schools by name, city, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-box">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="filter-select"
            >
              <option value="">All States</option>
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {(searchTerm || selectedState) && (
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedState('')
              }}
              className="btn btn-secondary"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      <div className="results-info">
        <p>
          {filteredSchools.length === 0 && schools.length === 0 
            ? 'No schools found. Add your first school!'
            : `Showing ${filteredSchools.length} of ${schools.length} schools`
          }
        </p>
      </div>

      {filteredSchools.length === 0 && schools.length === 0 ? (
        <div className="empty-state">
          <h2>🏫 No Schools Yet</h2>
          <p>Get started by adding your first school to the system.</p>
          <a href="/addSchool" className="btn btn-primary">
            Add First School
          </a>
        </div>
      ) : filteredSchools.length === 0 ? (
        <div className="empty-state">
          <h2>🔍 No Results Found</h2>
          <p>Try adjusting your search terms or filters.</p>
          <button 
            onClick={() => {
              setSearchTerm('')
              setSelectedState('')
            }}
            className="btn btn-secondary"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="schools-grid">
          {filteredSchools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </div>
  )
}