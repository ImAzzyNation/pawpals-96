
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // URL where your backend server will run

// Types for our data
export interface Pet {
  id: string;
  name: string;
  image: string;
  breed: string;
  age: string;
  location: string;
  type: 'lost' | 'adopt';
  date?: string;
  description: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  shelter?: string;
  adoptionFee?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // Note: In a real app, never return passwords from the API
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  description: string;
  isSale: boolean;
  salePercentage?: number;
}

// Authentication services
export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('pawpals_token', response.data.token);
        localStorage.setItem('pawpals_user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  async signup(userData: Omit<User, 'id'>) {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData);
      if (response.data.token) {
        localStorage.setItem('pawpals_token', response.data.token);
        localStorage.setItem('pawpals_user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },
  
  logout() {
    localStorage.removeItem('pawpals_token');
    localStorage.removeItem('pawpals_user');
  },
  
  getCurrentUser() {
    const userStr = localStorage.getItem('pawpals_user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },
  
  isAuthenticated() {
    return !!localStorage.getItem('pawpals_token');
  }
};

// Pets service (lost and adoption)
export const petService = {
  async getLostPets() {
    try {
      const response = await axios.get(`${API_URL}/pets/lost`);
      return response.data;
    } catch (error) {
      console.error('Get lost pets error:', error);
      throw error;
    }
  },
  
  async getAdoptionPets() {
    try {
      const response = await axios.get(`${API_URL}/pets/adopt`);
      return response.data;
    } catch (error) {
      console.error('Get adoption pets error:', error);
      throw error;
    }
  },
  
  async createPet(petData: Omit<Pet, 'id'>) {
    try {
      const token = localStorage.getItem('pawpals_token');
      const response = await axios.post(
        `${API_URL}/pets`, 
        petData,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      return response.data;
    } catch (error) {
      console.error('Create pet error:', error);
      throw error;
    }
  }
};

// Shop products service
export const productService = {
  async getProducts() {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Get products error:', error);
      throw error;
    }
  },
  
  async getProductById(id: string) {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Get product ${id} error:`, error);
      throw error;
    }
  },
  
  async getProductsByCategory(category: string) {
    try {
      const response = await axios.get(`${API_URL}/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Get products by category ${category} error:`, error);
      throw error;
    }
  }
};
