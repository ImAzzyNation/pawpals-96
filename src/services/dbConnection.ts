
// Import only what can be used in both browser and Node environments
import { Pet, User, Product } from '../services/dbService';

// For Node.js environment only (server-side)
let mysql: any;
let fs: any;
let path: any;
let uuidv4: any;

// Only import Node.js modules on the server side
if (typeof window === 'undefined') {
  // Server-side imports
  mysql = require('mysql2/promise');
  fs = require('fs');
  path = require('path');
  const { v4 } = require('uuid');
  uuidv4 = v4;
}

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pawpals',
};

// Media storage configuration
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'public/uploads';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Handle file uploads - browser-safe implementation
export const saveMedia = async (file: File): Promise<string> => {
  try {
    // For browser environment, use a different approach
    if (typeof window !== 'undefined') {
      // In browser, return a temporary URL
      console.log('Simulating file upload in browser:', file.name);
      return URL.createObjectURL(file);
    }
    
    // Server-side file handling
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds the limit');
    }
    
    const fileExtension = path.extname(file.name);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    
    // Ensure upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
    
    // Write file to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    
    return `/uploads/${fileName}`;
  } catch (error) {
    console.error('Error saving media:', error);
    throw error;
  }
};

// Browser-safe mock data for client-side rendering
const mockLostPets: Pet[] = [
  {
    id: 'mock1',
    name: 'Max',
    image: '/placeholder.svg',
    breed: 'Golden Retriever',
    age: '3 years',
    location: 'Downtown',
    type: 'lost',
    date: '2025-04-10',
    description: 'Friendly golden retriever with a blue collar',
    contactName: 'John Smith',
    contactEmail: 'john@example.com',
    contactPhone: '555-1234'
  },
  {
    id: 'mock2',
    name: 'Bella',
    image: '/placeholder.svg',
    breed: 'Siamese Cat',
    age: '2 years',
    location: 'Westside',
    type: 'lost',
    date: '2025-04-11',
    description: 'White and brown Siamese cat with blue eyes',
    contactName: 'Emma Jones',
    contactEmail: 'emma@example.com',
    contactPhone: '555-5678'
  }
];

const mockAdoptionPets: Pet[] = [
  {
    id: 'mock3',
    name: 'Charlie',
    image: '/placeholder.svg',
    breed: 'Labrador Mix',
    age: '1 year',
    location: 'Eastside Shelter',
    type: 'adopt',
    description: 'Energetic and playful labrador mix looking for a loving home',
    shelter: 'Eastside Animal Shelter',
    adoptionFee: '$150'
  },
  {
    id: 'mock4',
    name: 'Luna',
    image: '/placeholder.svg',
    breed: 'Tabby Cat',
    age: '8 months',
    location: 'Downtown Rescue',
    type: 'adopt',
    description: 'Sweet tabby cat that loves to cuddle',
    shelter: 'Downtown Animal Rescue',
    adoptionFee: '$90'
  }
];

const mockProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Premium Dog Food',
    image: '/placeholder.svg',
    price: 29.99,
    rating: 4.5,
    category: 'Food',
    description: 'High-quality dog food with all essential nutrients',
    isSale: false
  },
  {
    id: 'prod2',
    name: 'Cat Scratching Post',
    image: '/placeholder.svg',
    price: 24.99,
    rating: 4.2,
    category: 'Accessories',
    description: 'Durable scratching post for cats',
    isSale: true,
    salePercentage: 15
  }
];

// Database connection class
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private pool: any = null;
  private connected: boolean = false;
  
  private constructor() {
    console.log('Initializing database connection...');
    this.initializeConnection();
  }
  
  // Initialize connection pool
  private async initializeConnection() {
    try {
      // In a browser environment, we'll simulate the connection
      if (typeof window !== 'undefined') {
        console.log('Running in browser, simulating database connection');
        this.connected = true;
        return;
      }
      
      // Server-side MySQL connection
      this.pool = mysql.createPool({
        ...dbConfig,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      
      // Test the connection
      await this.pool.getConnection();
      this.connected = true;
      console.log('Database connection successful');
    } catch (error) {
      console.error('Database connection error:', error);
      this.connected = false;
    }
  }
  
  // Singleton pattern
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
  
  // Check if connected
  public isConnected(): boolean {
    return this.connected;
  }
  
  // Execute query - browser-safe implementation
  public async executeQuery<T>(query: string, params?: any[]): Promise<T> {
    if (typeof window !== 'undefined') {
      console.log('Simulating query execution in browser:', query, params);
      // Return mock data based on query type for browser testing
      return [] as unknown as T;
    }
    
    if (!this.pool) {
      throw new Error('Database connection not initialized');
    }
    
    try {
      console.log('Executing query:', query);
      const [results] = await this.pool.execute(query, params || []);
      return results as unknown as T;
    } catch (error) {
      console.error('Query execution error:', error);
      throw error;
    }
  }
  
  // Helper for lost pets
  public async getLostPets(): Promise<Pet[]> {
    try {
      if (typeof window !== 'undefined') {
        console.log('Fetching lost pets (browser simulation)');
        // Return mock data in browser environment
        return mockLostPets;
      }
      
      const query = `
        SELECT 
          id, name, image, breed, age, location, 'lost' as type, 
          date, description, contact_name as contactName, 
          contact_email as contactEmail, contact_phone as contactPhone
        FROM lost_pets
      `;
      
      return this.executeQuery<Pet[]>(query);
    } catch (error) {
      console.error('Error fetching lost pets:', error);
      return [];
    }
  }
  
  // Helper for adoption pets
  public async getAdoptionPets(): Promise<Pet[]> {
    try {
      if (typeof window !== 'undefined') {
        console.log('Fetching adoption pets (browser simulation)');
        // Return mock data in browser environment
        return mockAdoptionPets;
      }
      
      const query = `
        SELECT 
          id, name, image, breed, age, location, 'adopt' as type,
          description, shelter, adoption_fee as adoptionFee
        FROM adoption_pets
      `;
      
      return this.executeQuery<Pet[]>(query);
    } catch (error) {
      console.error('Error fetching adoption pets:', error);
      return [];
    }
  }
  
  // Helper to add a new pet
  public async addPet(petData: {
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
  }): Promise<{ insertId: number }> {
    try {
      if (typeof window !== 'undefined') {
        console.log('Adding pet (browser simulation):', petData);
        return { insertId: Math.floor(Math.random() * 1000) };
      }
      
      const { type, ...data } = petData;
      let table, query, params;
      
      if (type === 'lost') {
        table = 'lost_pets';
        const { name, image, breed, age, location, description, date_reported, contact_name, contact_email, contact_phone } = data;
        query = `
          INSERT INTO ${table} 
          (name, image, breed, age, location, description, date, contact_name, contact_email, contact_phone)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        params = [name, image, breed, age, location, description, date_reported, contact_name, contact_email, contact_phone];
      } else {
        table = 'adoption_pets';
        const { name, image, breed, age, location, description, shelter, adoption_fee } = data;
        query = `
          INSERT INTO ${table} 
          (name, image, breed, age, location, description, shelter, adoption_fee)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        params = [name, image, breed, age, location, description, shelter, adoption_fee];
      }
      
      const result = await this.executeQuery<{ insertId: number }>(query, params);
      return result;
    } catch (error) {
      console.error('Error adding pet:', error);
      throw error;
    }
  }
  
  // Get user by email
  public async getUserByEmail(email: string): Promise<User | null> {
    try {
      if (typeof window !== 'undefined') {
        console.log('Getting user by email (browser simulation):', email);
        // Return mock user for testing
        if (email === "test@example.com") {
          return {
            id: "user_1",
            firstName: "Test",
            lastName: "User",
            email: "test@example.com",
            password: "hashedpassword" // In a real app, this would be properly hashed
          };
        }
        return null;
      }
      
      const query = `
        SELECT id, first_name as firstName, last_name as lastName, email, password
        FROM users
        WHERE email = ?
      `;
      
      const users = await this.executeQuery<User[]>(query, [email]);
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }
  
  // Add a new user
  public async addUser(userData: Omit<User, 'id'>): Promise<{ insertId: number }> {
    try {
      if (typeof window !== 'undefined') {
        console.log('Adding user (browser simulation):', userData);
        return { insertId: Math.floor(Math.random() * 1000) };
      }
      
      const { firstName, lastName, email, password } = userData;
      const query = `
        INSERT INTO users 
        (first_name, last_name, email, password)
        VALUES (?, ?, ?, ?)
      `;
      
      return this.executeQuery<{ insertId: number }>(query, [firstName, lastName, email, password]);
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }
  
  // Get products
  public async getProducts(): Promise<Product[]> {
    try {
      if (typeof window !== 'undefined') {
        console.log('Fetching products (browser simulation)');
        return mockProducts;
      }
      
      const query = `
        SELECT 
          id, name, image, price, rating, category, description, 
          is_sale as isSale, sale_percentage as salePercentage
        FROM products
      `;
      
      return this.executeQuery<Product[]>(query);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }
}

// Create a singleton instance
const db = DatabaseConnection.getInstance();

// Export functions to match previous usage
export async function executeQuery<T>(query: string, params?: any[]): Promise<T> {
  return db.executeQuery(query, params);
}

export async function getLostPets(): Promise<Pet[]> {
  return db.getLostPets();
}

export async function getAdoptionPets(): Promise<Pet[]> {
  return db.getAdoptionPets();
}

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
}): Promise<{ insertId: number }> {
  return db.addPet(petData);
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return db.getUserByEmail(email);
}

export async function addUser(userData: Omit<User, 'id'>): Promise<{ insertId: number }> {
  return db.addUser(userData);
}

export async function getProducts(): Promise<Product[]> {
  return db.getProducts();
}

// Export the database instance for direct access if needed
export { db };
