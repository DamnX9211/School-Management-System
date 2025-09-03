"use client"
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddSchool() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm()

  const [submitMessage, setSubmitMessage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const router = useRouter()

  // Watch image field for preview
  const imageFile = watch('image')

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
      if (!validTypes.includes(file.type)) {
        setSubmitMessage('Please select a valid image file (JPG, JPEG, PNG)')
        return
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitMessage('Image size must be less than 5MB')
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
      setSubmitMessage('')
    }
  }

  const onSubmit = async (data) => {
    try {
      setSubmitMessage('')

      // Create FormData for file upload
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('address', data.address)
      formData.append('city', data.city)
      formData.append('state', data.state)
      formData.append('contact', data.contact)
      formData.append('email_id', data.email_id)

      if (data.image && data.image[0]) {
        formData.append('image', data.image[0])
      }

      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitMessage('School added successfully!')
        reset()
        setImagePreview('')

        // Redirect to show schools after 2 seconds
        setTimeout(() => {
          router.push('/showSchools')
        }, 2000)
      } else {
        setSubmitMessage(result.error || 'Failed to add school')
      }
    } catch (error) {
      setSubmitMessage('Error adding school. Please try again.')
    }
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Add New School</h1>
        <p>Fill in the details below to add a new school to the system</p>
      </div>

      {submitMessage && (
        <div className={`alert ${submitMessage.includes('successfully') ? 'alert-success' : 'alert-error'}`}>
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="school-form">
        <div className="form-grid">
          {/* School Name */}
          <div className="form-group">
            <label htmlFor="name">School Name *</label>
            <input
              type="text"
              id="name"
              {...register('name', {
                required: 'School name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
                maxLength: { value: 100, message: 'Name must not exceed 100 characters' }
              })}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email_id">Email Address *</label>
            <input
              type="email"
              id="email_id"
              {...register('email_id', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              className={errors.email_id ? 'error' : ''}
            />
            {errors.email_id && <span className="error-text">{errors.email_id.message}</span>}
          </div>

          {/* Address - Full Width */}
          <div className="form-group full-width">
            <label htmlFor="address">Address *</label>
            <input
              type="text"
              id="address"
              {...register('address', {
                required: 'Address is required',
                minLength: { value: 10, message: 'Address must be at least 10 characters' }
              })}
              className={errors.address ? 'error' : ''}
            />
            {errors.address && <span className="error-text">{errors.address.message}</span>}
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              {...register('city', {
                required: 'City is required',
                minLength: { value: 2, message: 'City must be at least 2 characters' }
              })}
              className={errors.city ? 'error' : ''}
            />
            {errors.city && <span className="error-text">{errors.city.message}</span>}
          </div>

          {/* State */}
          <div className="form-group">
            <label htmlFor="state">State *</label>
            <input
              type="text"
              id="state"
              {...register('state', {
                required: 'State is required',
                minLength: { value: 2, message: 'State must be at least 2 characters' }
              })}
              className={errors.state ? 'error' : ''}
            />
            {errors.state && <span className="error-text">{errors.state.message}</span>}
          </div>

          {/* Contact */}
          <div className="form-group">
            <label htmlFor="contact">Contact Number *</label>
            <input
              type="tel"
              id="contact"
              {...register('contact', {
                required: 'Contact number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit phone number'
                }
              })}
              className={errors.contact ? 'error' : ''}
            />
            {errors.contact && <span className="error-text">{errors.contact.message}</span>}
          </div>

          {/* Image Upload - Full Width */}
          <div className="form-group full-width">
            <label htmlFor="image">School Image *</label>
            <input
              type="file"
              id="image"
              accept="image/jpeg,image/jpg,image/png"
              {...register('image', {
                required: 'School image is required',
                onChange: handleImageChange
              })}
              className={errors.image ? 'error' : ''}
            />
            {errors.image && <span className="error-text">{errors.image.message}</span>}

            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => {
              reset()
              setImagePreview('')
              setSubmitMessage('')
            }}
          >
            Reset Form
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding School...' : 'Add School'}
          </button>
        </div>
      </form>
    </div>
  )
}