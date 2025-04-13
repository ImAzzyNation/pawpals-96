
import { lostPets, adoptionPets } from '../data/mockData';
import { Pet, User, Product } from '../services/dbService';

// Simulate a database connection
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connected: boolean = false;
  
  private constructor() {
    console.log('Initializing database connection...');
    // In a real implementation, we would connect to MySQL here
    this.connected = true;
  }
  
  // Singleton pattern to ensure only one database connection
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
  
  // Simple query executor - browser-compatible mock version
  public async executeQuery<T>(query: string, params?: any[]): Promise<T> {
    console.log('Executing query:', query, params);
    // In a browser environment, we'll simulate the database with mock data
    return [] as unknown as T;
  }
  
  // Helper for lost pets
  public async getLostPets(): Promise<Pet[]> {
    console.log('Fetching lost pets from database');
    // Return mock data that matches the database structure
    return Promise.resolve(lostPets.map(pet => ({
      id: pet.id,
      name: pet.name,
      image: pet.image,
      breed: pet.breed,
      age: pet.age,
      location: pet.location,
      type: pet.type as 'lost' | 'adopt',
      date: pet.date,
      description: pet.description,
      contactName: pet.contactName,
      contactEmail: pet.contactEmail,
      contactPhone: pet.contactPhone
    })));
  }
  
  // Helper for adoption pets
  public async getAdoptionPets(): Promise<Pet[]> {
    console.log('Fetching adoption pets from database');
    // Return mock data that matches the database structure
    return Promise.resolve(adoptionPets.map(pet => ({
      id: pet.id,
      name: pet.name,
      image: pet.image,
      breed: pet.breed,
      age: pet.age,
      location: pet.location,
      type: pet.type as 'lost' | 'adopt',
      description: pet.description,
      shelter: pet.shelter,
      adoptionFee: pet.adoptionFee
    })));
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
    console.log('Adding pet to database:', petData);
    // Simulate adding to database with a successful response
    return Promise.resolve({ insertId: Math.floor(Math.random() * 1000) });
  }
  
  // Get user by email
  public async getUserByEmail(email: string): Promise<User | null> {
    console.log('Getting user by email:', email);
    // In a real implementation, we would query the database
    // For now, simulate a user found if using a test email
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
  
  // Add a new user
  public async addUser(userData: Omit<User, 'id'>): Promise<{ insertId: number }> {
    console.log('Adding user to database:', userData);
    // Simulate adding to database with a successful response
    return Promise.resolve({ insertId: Math.floor(Math.random() * 1000) });
  }
  
  // Get products
  public async getProducts(): Promise<Product[]> {
    console.log('Fetching products from database');
    // In a real implementation, we would query the database
    return [];
  }
}

// Export a singleton instance
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
