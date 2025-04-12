
# PawPals - Backend Setup Instructions

## Database Setup

1. Start your XAMPP Lite server with MySQL
2. Open phpMyAdmin (usually at http://localhost/phpmyadmin)
3. Create a new database called `pawpals`
4. Import the `database_setup.sql` file to create tables and add sample data

## Backend API

For the backend API, you'll need to create a simple NodeJS server. Here's how:

1. Create a new directory for your backend (e.g., `pawpals-backend`)
2. Initialize a new Node.js project:
   ```
   npm init -y
   ```
3. Install required packages:
   ```
   npm install express mysql2 cors jsonwebtoken bcrypt dotenv
   ```
4. Create an `.env` file with your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=pawpals
   JWT_SECRET=your_secret_key
   ```
5. Create server files (main structure):
   - `server.js` - Main server file
   - `routes/` - API route definitions
   - `controllers/` - Business logic
   - `models/` - Database models

6. Implement API endpoints:
   - Authentication: `/api/auth/login` and `/api/auth/signup`
   - Pets: `/api/pets/lost`, `/api/pets/adopt`, `/api/pets`
   - Products: `/api/products`, `/api/products/:id`, `/api/products/category/:category`

## Connecting Frontend to Backend

1. Make sure your backend server is running (default on port 3000)
2. The frontend is already configured to connect to `http://localhost:3000/api`
3. If you use a different port, update the `API_URL` in `src/services/dbService.ts`

## Security Notes

- In a production environment, you would need to:
  - Use proper password hashing (already set up in SQL with placeholder)
  - Implement proper JWT authentication
  - Set up HTTPS
  - Add rate limiting
  - Implement proper error handling
