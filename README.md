# School Management System

A Next.js application for managing school information with form submission and listing functionality.

## Features

- ✨ Add new schools with comprehensive form validation
- 🏫 Display schools in responsive grid layout
- 📸 Image upload with preview functionality
- 📱 Mobile-responsive design
- 🔍 Search and filter schools
- 🗄️ MySQL database integration

## Tech Stack

- **Frontend**: Next.js 14, React 18, React Hook Form
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **Styling**: Custom CSS with responsive design
- **File Upload**: Multer middleware

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd school-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your database credentials
   ```

4. **Set up MySQL database**
   ```sql
   CREATE DATABASE school_management;
   USE school_management;

   CREATE TABLE schools (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name TEXT NOT NULL,
     address TEXT NOT NULL,
     city TEXT NOT NULL,
     state TEXT NOT NULL,
     contact BIGINT NOT NULL,
     image TEXT,
     email_id TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
school-management-system/
├── app/                    # Next.js App Router
│   ├── addSchool/         # Add school form page
│   ├── showSchools/       # Schools listing page
│   ├── api/               # API routes
│   ├── components/        # React components
│   └── globals.css        # Global styles
├── lib/                   # Utilities
├── public/                # Static assets
└── schoolImages/          # Uploaded images
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Manual Deployment
1. Build the project: `npm run build`
2. Start production server: `npm start`

## Assignment Requirements ✅

- ✅ Next.js framework with React Hook Form
- ✅ MySQL database integration
- ✅ Two pages: addSchool.jsx and showSchools.jsx
- ✅ Form validation (email, required fields)
- ✅ Image upload to schoolImages folder
- ✅ Responsive design (mobile + desktop)
- ✅ E-commerce style grid layout
- ✅ GitHub repository ready
- ✅ Deployment ready