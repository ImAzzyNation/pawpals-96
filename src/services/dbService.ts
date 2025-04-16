
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
  password: string;
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
  }
};
