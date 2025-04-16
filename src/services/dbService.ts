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

export interface Category {
  id: string;
  name: string;
  image_url: string;
  product_count: number;
  created_at: Date;
  updated_at: Date;
}

// Pets service (lost and adoption)
export const petService = {
  async getLostPets(): Promise<Pet[]> {
    const response = await fetch('/php/pets/getLost.php');
    if (!response.ok) {
      throw new Error('Failed to fetch lost pets');
    }
    return response.json();
  },

  async getAdoptionPets(): Promise<Pet[]> {
    const response = await fetch('/php/pets/getAdopt.php');
    if (!response.ok) {
      throw new Error('Failed to fetch adoption pets');
    }
    return response.json();
  },

  async createPet(petData: Omit<Pet, 'id' | 'created_at' | 'updated_at'>) {
    const response = await fetch('/php/pets/create.php', {
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
    const response = await fetch('/php/products/getAll.php');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`/php/products/getById.php?id=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },
  
  async getCategories(): Promise<Category[]> {
    const response = await fetch('/php/categories/getAll.php');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  }
};

// Auth service
export const authService = {
  async login(email: string, password: string): Promise<User> {
    const response = await fetch('/php/auth/login.php', {
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
    window.dispatchEvent(new Event('storage'));
    return userData;
  },

  async register(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const response = await fetch('/php/auth/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Registration failed');
    }

    const newUser = await response.json();
    localStorage.setItem('pawpals_user', JSON.stringify(newUser));
    window.dispatchEvent(new Event('storage'));
    return newUser;
  },

  // For backward compatibility
  async signup(userData: { first_name: string, last_name: string, email: string, password: string }): Promise<User> {
    return this.register(userData);
  },

  logout(): void {
    localStorage.removeItem('pawpals_user');
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
