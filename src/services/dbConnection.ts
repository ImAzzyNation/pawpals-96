
import { Pet, Product } from './dbService';

// Function to get lost pets from the database
export const getLostPets = async (): Promise<Pet[]> => {
  try {
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
