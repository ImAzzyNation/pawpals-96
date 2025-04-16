
// Import only what can be used in both browser and Node environments
import { Pet, User, Product, Category } from '../services/dbService';

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

// Database configuration - use environment variables if available, otherwise defaults
const dbConfig = {
  host: typeof window === 'undefined' ? process.env.DB_HOST || 'localhost' : 'localhost',
  user: typeof window === 'undefined' ? process.env.DB_USER || 'root' : 'root',
  password: typeof window === 'undefined' ? process.env.DB_PASSWORD || '' : '',
  database: typeof window === 'undefined' ? process.env.DB_NAME || 'pawpals' : 'pawpals',
};

// Media storage configuration
const UPLOAD_DIR = typeof window === 'undefined' ? process.env.UPLOAD_DIR || 'public/uploads' : 'public/uploads';
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
    image_url: '/placeholder.svg',
    breed: 'Golden Retriever',
    age: '3 years',
    location: 'Downtown',
    type: 'lost',
    description: 'Friendly golden retriever with a blue collar',
    date_reported: '2025-04-10',
    contact_name: 'John Smith',
    contact_email: 'john@example.com',
    contact_phone: '555-1234',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 'mock2',
    name: 'Bella',
    image_url: '/placeholder.svg',
    breed: 'Siamese Cat',
    age: '2 years',
    location: 'Westside',
    type: 'lost',
    description: 'White and brown Siamese cat with blue eyes',
    date_reported: '2025-04-11',
    contact_name: 'Emma Jones',
    contact_email: 'emma@example.com',
    contact_phone: '555-5678',
    created_at: new Date(),
    updated_at: new Date()
  }
];

const mockAdoptionPets: Pet[] = [
  {
    id: 'mock3',
    name: 'Charlie',
    image_url: '/placeholder.svg',
    breed: 'Labrador Mix',
    age: '1 year',
    location: 'Eastside Shelter',
    type: 'adopt',
    description: 'Energetic and playful labrador mix looking for a loving home',
    shelter: 'Eastside Animal Shelter',
    adoption_fee: '$150',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 'mock4',
    name: 'Luna',
    image_url: '/placeholder.svg',
    breed: 'Tabby Cat',
    age: '8 months',
    location: 'Downtown Rescue',
    type: 'adopt',
    description: 'Sweet tabby cat that loves to cuddle',
    shelter: 'Downtown Animal Rescue',
    adoption_fee: '$90',
    created_at: new Date(),
    updated_at: new Date()
  }
];

const mockProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Premium Dog Food',
    image_url: '/placeholder.svg',
    price: 29.99,
    rating: 4.5,
    category: 'Food',
    description: 'High-quality dog food with all essential nutrients',
    is_sale: false,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 'prod2',
    name: 'Cat Scratching Post',
    image_url: '/placeholder.svg',
    price: 24.99,
    rating: 4.2,
    category: 'Accessories',
    description: 'Durable scratching post for cats',
    is_sale: true,
    sale_percentage: 15,
    created_at: new Date(),
    updated_at: new Date()
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
          id, name, image_url, breed, age, location, 'lost' as type, 
          description, date_reported, contact_name, 
          contact_email, contact_phone, created_at, updated_at
        FROM pets
        WHERE type = 'lost'
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
          id, name, image_url, breed, age, location, 'adopt' as type,
          description, shelter, adoption_fee, created_at, updated_at
        FROM pets
        WHERE type = 'adopt'
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
    image_url: string;
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
      let query, params;
      
      query = `
        INSERT INTO pets 
        (name, image_url, breed, age, location, type, description, 
         date_reported, contact_name, contact_email, contact_phone, shelter, adoption_fee)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      params = [
        data.name, 
        data.image_url, 
        data.breed, 
        data.age, 
        data.location, 
        type,
        data.description, 
        data.date_reported || null, 
        data.contact_name || null, 
        data.contact_email || null, 
        data.contact_phone || null,
        data.shelter || null,
        data.adoption_fee || null
      ];
      
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
            first_name: "Test",
            last_name: "User",
            email: "test@example.com",
            password: "hashedpassword", // In a real app, this would be properly hashed
            created_at: new Date(),
            updated_at: new Date()
          };
        }
        return null;
      }
      
      const query = `
        SELECT id, first_name, last_name, email, password, created_at, updated_at
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
  public async addUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<{ insertId: number }> {
    try {
      if (typeof window !== 'undefined') {
        console.log('Adding user (browser simulation):', userData);
        return { insertId: Math.floor(Math.random() * 1000) };
      }
      
      const { first_name, last_name, email, password } = userData;
      const query = `
        INSERT INTO users 
        (first_name, last_name, email, password)
        VALUES (?, ?, ?, ?)
      `;
      
      return this.executeQuery<{ insertId: number }>(query, [first_name, last_name, email, password]);
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
          id, name, image_url, price, rating, category, description, 
          is_sale, sale_percentage, created_at, updated_at
        FROM products
      `;
      
      return this.executeQuery<Product[]>(query);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  // Get categories
  public async getCategories(): Promise<Category[]> {
    try {
      if (typeof window !== 'undefined') {
        console.log('Fetching categories (browser simulation)');
        // Return mock categories
        return [
          {
            id: 'cat-1',
            name: 'Food & Treats',
            image_url: '/placeholder.svg',
            product_count: 24,
            created_at: new Date(),
            updated_at: new Date()
          },
          {
            id: 'cat-2',
            name: 'Toys',
            image_url: '/placeholder.svg',
            product_count: 16,
            created_at: new Date(),
            updated_at: new Date()
          }
        ];
      }
      
      const query = `
        SELECT 
          id, name, image_url, product_count, created_at, updated_at
        FROM categories
      `;
      
      return this.executeQuery<Category[]>(query);
    } catch (error) {
      console.error('Error fetching categories:', error);
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
  image_url: string;
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

export async function addUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<{ insertId: number }> {
  return db.addUser(userData);
}

export async function getProducts(): Promise<Product[]> {
  return db.getProducts();
}

export async function getCategories(): Promise<Category[]> {
  return db.getCategories();
}

// Export the database instance for direct access if needed
export { db };
