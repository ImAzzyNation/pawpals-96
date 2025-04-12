
import { lostPets, adoptionPets } from '../data/mockData';

// Simple query executor - browser-compatible mock version
export async function executeQuery<T>(query: string, params?: any[]): Promise<T> {
  console.log('Mock query executed:', query, params);
  // In a browser environment, we'll simulate the database with mock data
  return [] as unknown as T;
}

// Helper for lost pets
export async function getLostPets() {
  console.log('Fetching lost pets from mock data');
  // Return mock data that matches the database structure
  return Promise.resolve(lostPets.map(pet => ({
    ...pet,
    type: 'lost',
  })));
}

// Helper for adoption pets
export async function getAdoptionPets() {
  console.log('Fetching adoption pets from mock data');
  // Return mock data that matches the database structure
  return Promise.resolve(adoptionPets.map(pet => ({
    ...pet,
    type: 'adopt',
  })));
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
  console.log('Mock adding pet to database:', petData);
  // Simulate adding to database with a successful response
  return Promise.resolve({ insertId: Math.floor(Math.random() * 1000) });
}
