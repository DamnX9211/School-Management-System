# School Management System Setup Instructions

## 📋 Prerequisites

Before setting up the project, make sure you have:

- **Node.js** (version 14 or higher)
- **MySQL** (version 5.7 or higher)  
- **Git** (for version control)

## 🚀 Quick Setup

### 1. Project Setup
```bash
# Navigate to project directory
cd school-management-system

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local
```

### 2. Database Setup

#### Option A: Using MySQL Command Line
```bash
# Login to MySQL
mysql -u root -p

# Run the database setup
source database-setup.sql
```

#### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open `database-setup.sql` file
4. Execute the script

### 3. Environment Configuration

Edit `.env.local` with your database credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management

# Application Configuration  
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run the Application

```bash
# Start development server
npm run dev

# Open your browser
# Go to: http://localhost:3000
```

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📤 Deployment

### Deploy to Vercel

   ```
1. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

2. **Database for Production**

   For production, consider these options:
   - **PlanetScale** (MySQL-compatible, recommended)
   - **Railway** (PostgreSQL/MySQL)
   - **AWS RDS** (Professional grade)

### Environment Variables for Production

In Vercel dashboard, add these environment variables:
```
DB_HOST=your-production-db-host
DB_PORT=3306
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
DB_NAME=school_management
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

## 🔧 Troubleshooting

### Common Issues

**Database Connection Error:**
- Verify MySQL is running
- Check credentials in `.env.local`
- Ensure database exists

**Port Already in Use:**
- Change port: `npm run dev -- -p 3001`

**Image Upload Issues:**
- Check `public/schoolImages` directory exists
- Verify file permissions

**Build Errors:**
- Clear cache: `rm -rf .next`
- Reinstall: `rm -rf node_modules && npm install`

## 📁 Project Structure

```
school-management-system/
├── app/                          # Next.js App Router
│   ├── addSchool/               # Add School page (Assignment requirement)
│   │   └── page.jsx            # Form with React Hook Form + validation
│   ├── showSchools/            # Show Schools page (Assignment requirement)  
│   │   └── page.jsx            # E-commerce style grid layout
│   ├── components/             # Reusable components
│   │   └── SchoolCard.jsx      # Individual school card
│   ├── api/                    # API routes
│   │   ├── schools/            # CRUD operations
│   │   └── placeholder-image/  # Default image endpoint
│   ├── layout.js               # Root layout
│   ├── page.js                 # Home page
│   └── globals.css             # Global styles (responsive)
├── lib/                        # Utility functions
│   └── database.js             # MySQL connection
├── public/                     # Static assets
│   └── schoolImages/           # Uploaded school images
├── package.json                # Dependencies and scripts
├── next.config.js              # Next.js configuration
└── .env.local                  # Environment variables
```

## ✅ Assignment Requirements Checklist

- ✅ **Framework**: Next.js with React
- ✅ **Database**: MySQL with `schools` table
- ✅ **Page 1**: `addSchool.jsx` with React Hook Form
- ✅ **Page 2**: `showSchools.jsx` with e-commerce layout  
- ✅ **Form Validation**: Email, phone, required fields
- ✅ **Image Upload**: Store in `schoolImages` folder
- ✅ **Responsive Design**: Mobile and desktop support
- ✅ **Database Fields**: All required fields implemented
- ✅ **GitHub Ready**: Complete project structure
- ✅ **Deployment Ready**: Vercel configuration included

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section
2. Verify all prerequisites are installed
3. Ensure database is running and accessible
4. Check environment variables are correct

---

**Ready to submit!** 🎉

Your complete Next.js School Management System is ready for:
- GitHub repository creation
- Vercel deployment  
- Assignment submission