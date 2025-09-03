import mysql from 'mysql2/promise'

let connection = null

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

export async function getConnection() {
  if (!connection) {
    try {
      connection = await mysql.createConnection(dbConfig)
      console.log('Connected to MySQL database')

      // Create table if it doesn't exist
      await createSchoolsTable()

    } catch (error) {
      console.error('Database connection failed:', error)
      throw new Error('Database connection failed')
    }
  }
  return connection
}

async function createSchoolsTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      contact BIGINT NOT NULL,
      image TEXT,
      email_id TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

      INDEX idx_city (city(50)),
      INDEX idx_state (state(50)),
      INDEX idx_created_at (created_at)
    )
  `

  await connection.execute(createTableQuery)
}