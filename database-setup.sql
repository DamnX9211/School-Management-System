-- School Management System Database Setup
-- Run this in your MySQL database

-- Create the database
CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

-- Create the schools table with exact specifications from assignment
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_city ON schools(city(50));
CREATE INDEX idx_state ON schools(state(50));
CREATE INDEX idx_email ON schools(email_id(100));

-- Insert some sample data for testing
INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES
('Springfield Elementary School', '123 Main Street, Downtown Area', 'Springfield', 'Illinois', 5551234567, 'info@springfield-elementary.edu', NULL),
('Riverside High School', '456 River Road, Waterfront District', 'Riverside', 'California', 5559876543, 'contact@riverside-high.edu', NULL),
('Oakwood Academy', '789 Oak Avenue, Heritage Park', 'Oakwood', 'New York', 5555551234, 'admissions@oakwood-academy.edu', NULL),
('Sunset Valley School', '321 Sunset Drive, Valley Heights', 'Valley City', 'Texas', 5551112222, 'info@sunsetvalley.edu', NULL),
('Maple Grove Institute', '654 Maple Street, Grove District', 'Grove City', 'Ohio', 5553334444, 'contact@maplegrove.edu', NULL);

-- Verify the setup
SELECT 'Database setup completed successfully!' as status;
SELECT COUNT(*) as total_schools FROM schools;
SELECT * FROM schools;