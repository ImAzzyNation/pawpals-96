
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

// Helper for lost pets
export async function getLostPets() {
  return executeQuery<any[]>(`
    SELECT * FROM pets WHERE type = 'lost' ORDER BY date_reported DESC
  `);
}

// Helper for adoption pets
export async function getAdoptionPets() {
  return executeQuery<any[]>(`
    SELECT * FROM pets WHERE type = 'adopt' ORDER BY created_at DESC
  `);
}

// Helper to add a new pet
export async function addPet(petData: {
  name: string;
  image: string;
  breed: string;
  age: string;
  location: string;
  type: 'lost' | 'adopt';
  description: string;
  date_reported?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  shelter?: string;
  adoption_fee?: string;
}) {
  const fields = Object.keys(petData).join(', ');
  const placeholders = Object.keys(petData).map(() => '?').join(', ');
  const values = Object.values(petData);
  
  return executeQuery<any>(
    `INSERT INTO pets (${fields}) VALUES (${placeholders})`,
    values
  );
}
