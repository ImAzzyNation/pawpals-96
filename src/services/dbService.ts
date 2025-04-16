
export interface Pet {
  id: string;
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
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  bio?: string;
  phone?: string;
  address?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: string;
  name: string;
  image_url: string;
  price: number;
  rating: number;
  category: string;
  description: string;
  is_sale: boolean;
  sale_percentage?: number;
  created_at: Date;
  updated_at: Date;
}

// Pets service (lost and adoption)
export const petService = {
  async getLostPets(): Promise<Pet[]> {
    const response = await fetch('/api/pets/lost');
    if (!response.ok) {
      throw new Error('Failed to fetch lost pets');
    }
    return response.json();
  },

  async getAdoptionPets(): Promise<Pet[]> {
    const response = await fetch('/api/pets/adopt');
    if (!response.ok) {
      throw new Error('Failed to fetch adoption pets');
    }
    return response.json();
  },

  async createPet(petData: Omit<Pet, 'id' | 'created_at' | 'updated_at'>) {
    const response = await fetch('/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petData),
    });

    if (!response.ok) {
      throw new Error('Failed to create pet listing');
    }
    return response.json();
  }
};

// Product service
export const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },
  
  async getCategories(): Promise<Category[]> {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  }
};

// Auth service
export const authService = {
  async login(email: string, password: string): Promise<User> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const userData = await response.json();
    localStorage.setItem('pawpals_user', JSON.stringify(userData));
    return userData;
  },

  async signup(userData: { first_name: string, last_name: string, email: string, password: string }): Promise<User> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const newUser = await response.json();
    localStorage.setItem('pawpals_user', JSON.stringify(newUser));
    return newUser;
  },

  async register(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const newUser = await response.json();
    localStorage.setItem('pawpals_user', JSON.stringify(newUser));
    return newUser;
  },

  logout(): void {
    localStorage.removeItem('pawpals_user');
    // Dispatch an event that the user has logged out
    window.dispatchEvent(new Event('storage'));
  },

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('pawpals_user');
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch (e) {
      this.logout();
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
};

// Category interface
export interface Category {
  id: string;
  name: string;
  image_url: string;
  product_count: number;
  created_at: Date;
  updated_at: Date;
}

// Hard-coded featured categories data for the homepage
export const featuredCategories = [
  {
    id: 'cat-1',
    name: 'Food & Treats',
    image: 'https://images.unsplash.com/photo-1600628421055-4d30de868b8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    count: 24
  },
  {
    id: 'cat-2',
    name: 'Toys',
    image: 'https://images.unsplash.com/photo-1563262924-641a8b3d397f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    count: 16
  },
  {
    id: 'cat-3',
    name: 'Beds & Furniture',
    image: 'https://images.unsplash.com/photo-1604437328445-8784cc69f15d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    count: 12
  },
  {
    id: 'cat-4',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1576513756596-f336808276ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    count: 18
  }
];
