
# PawPals - Pet Adoption & Lost Pet Finder

A React application for pet adoption and lost pet reporting.

## Browser Development Mode

The application currently runs in browser-compatible mode using mock data. The database connection is simulated for frontend development.

## Database Setup (Server Deployment)

For server deployment with a real MySQL database:

1. Install XAMPP or another MySQL server solution
2. Create a database named `pawpals`
3. Import the database schema from `database_setup.sql`
4. Update the `dbConnection.ts` file with your MySQL server credentials

### Database Configuration

When moving to production, replace the mock implementation in `dbConnection.ts` with:

```typescript
import mysql from 'mysql2/promise';

// Connection pool configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Default for XAMPP is empty
  database: 'pawpals',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Simple query executor
export async function executeQuery<T>(query: string, params?: any[]): Promise<T> {
  try {
    const [rows] = await pool.execute(query, params || []);
    return rows as T;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}
```

## Running the Application

```
npm install
npm run dev
```

The application will be available at http://localhost:8080.
