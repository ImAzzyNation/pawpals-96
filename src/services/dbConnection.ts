
import { Pet, Product } from './dbService';

// Check if we're running in development mode
const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname.includes('lovableproject.com');

// Mock data for development mode
const mockLostPets: Pet[] = [
  {
    id: 1,
    name: 'Max',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'Male',
    location: 'Downtown',
    description: 'Friendly dog, loves to play fetch',
    image: '/placeholder.svg',
    contact_email: 'owner@example.com',
    contact_phone: '123-456-7890',
    type: 'lost',
    status: 'active',
    created_at: '2023-05-15'
  },
  {
    id: 2,
    name: 'Luna',
    breed: 'Siamese Cat',
    age: 2,
    gender: 'Female',
    location: 'Westside',
    description: 'Shy cat with blue eyes',
    image: '/placeholder.svg',
    contact_email: 'owner2@example.com',
    contact_phone: '123-456-7891',
    type: 'lost',
    status: 'active',
    created_at: '2023-05-16'
  }
];

const mockAdoptionPets: Pet[] = [
  {
    id: 3,
    name: 'Buddy',
    breed: 'Labrador Mix',
    age: 1,
    gender: 'Male',
    location: 'Shelter',
    description: 'Energetic puppy looking for a home',
    image: '/placeholder.svg',
    contact_email: 'shelter@example.com',
    contact_phone: '123-456-7892',
    type: 'adopt',
    status: 'active',
    created_at: '2023-05-10'
  },
  {
    id: 4,
    name: 'Whiskers',
    breed: 'Tabby Cat',
    age: 4,
    gender: 'Female',
    location: 'Shelter',
    description: 'Calm and affectionate',
    image: '/placeholder.svg',
    contact_email: 'shelter@example.com',
    contact_phone: '123-456-7892',
    type: 'adopt',
    status: 'active',
    created_at: '2023-05-11'
  }
];

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Dog Food',
    description: 'High-quality nutrition for your dog',
    price: 29.99,
    category: 'Food',
    image: '/placeholder.svg',
    stock: 50,
    created_at: '2023-04-01'
  },
  {
    id: 2,
    name: 'Cat Toy Bundle',
    description: 'Set of interactive toys for cats',
    price: 15.99,
    category: 'Toys',
    image: '/placeholder.svg',
    stock: 30,
    created_at: '2023-04-02'
  }
];

// Function to get lost pets from the database
export const getLostPets = async (): Promise<Pet[]> => {
  try {
    if (isDevelopment) {
      return mockLostPets;
    }
    
    const response = await fetch('/php/pets/getLost.php');
    if (!response.ok) {
      throw new Error('Failed to fetch lost pets');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching lost pets:', error);
    throw error;
  }
};

// Function to get adoption pets from the database
export const getAdoptionPets = async (): Promise<Pet[]> => {
  try {
    if (isDevelopment) {
      return mockAdoptionPets;
    }
    
    const response = await fetch('/php/pets/getAdopt.php');
    if (!response.ok) {
      throw new Error('Failed to fetch adoption pets');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching adoption pets:', error);
    throw error;
  }
};

// Function to get products from the database
export const getProducts = async (): Promise<Product[]> => {
  try {
    if (isDevelopment) {
      return mockProducts;
    }
    
    const response = await fetch('/php/products/getAll.php');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
