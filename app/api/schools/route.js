import { NextRequest, NextResponse } from 'next/server'
import { getConnection } from '../../../lib/database'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// GET - Fetch all schools
export async function GET() {
  try {
    const connection = await getConnection()
    const [rows] = await connection.execute(
      'SELECT * FROM schools ORDER BY created_at DESC'
    )
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    )
  }
}

// POST - Create a new school
export async function POST(request) {
  try {
    const formData = await request.formData()

    const schoolData = {
      name: formData.get('name'),
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      contact: formData.get('contact'),
      email_id: formData.get('email_id')
    }

    // Validate required fields
    const requiredFields = ['name', 'address', 'city', 'state', 'contact', 'email_id']
    for (const field of requiredFields) {
      if (!schoolData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Handle image upload
    const imageFile = formData.get('image')
    let imageName = null

    if (imageFile && imageFile.size > 0) {
      // Validate image
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
      if (!validTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { error: 'Invalid image type. Only JPG, JPEG, PNG allowed.' },
          { status: 400 }
        )
      }

      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Image size must be less than 5MB' },
          { status: 400 }
        )
      }

      // Save image
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Ensure directory exists
      const uploadDir = path.join(process.cwd(), 'public', 'schoolImages')
      await mkdir(uploadDir, { recursive: true })

      // Generate unique filename
      const timestamp = Date.now()
      const extension = path.extname(imageFile.name)
      imageName = `school_${timestamp}${extension}`

      const filepath = path.join(uploadDir, imageName)
      await writeFile(filepath, buffer)
    }

    // Save to database
    const connection = await getConnection()
    const [result] = await connection.execute(
      `INSERT INTO schools (name, address, city, state, contact, email_id, image) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        schoolData.name,
        schoolData.address,
        schoolData.city,
        schoolData.state,
        schoolData.contact,
        schoolData.email_id,
        imageName
      ]
    )

    return NextResponse.json(
      { message: 'School added successfully', id: result.insertId },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating school:', error)
    return NextResponse.json(
      { error: 'Failed to add school' },
      { status: 500 }
    )
  }
}