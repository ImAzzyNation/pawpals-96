
import { toast } from "sonner";

// Interface for user registration data
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Interface for login data
export interface LoginData {
  email: string;
  password: string;
}

// Check if we're running in development mode
const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname.includes('lovableproject.com');

// Mock users for development
const mockUsers = [
  {
    id: 1,
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@example.com',
    password: 'password123',
    created_at: '2023-01-01'
  }
];

// Auth service that connects to MySQL through PHP or uses mock data in development
const authService = {
  // Login function
  login: async (data: LoginData) => {
    try {
      if (isDevelopment) {
        // Development mode - use mock data
        const user = mockUsers.find(u => u.email === data.email);
        
        if (!user || user.password !== data.password) {
          throw new Error('Invalid credentials');
        }
        
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('pawpals_user', JSON.stringify(userWithoutPassword));
        window.dispatchEvent(new Event('storage'));
        toast.success("Logged in successfully!");
        return userWithoutPassword;
      } else {
        // Production mode - connect to PHP
        const response = await fetch('/php/auth/login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Invalid credentials');
        }

        const user = await response.json();
        localStorage.setItem('pawpals_user', JSON.stringify(user));
        window.dispatchEvent(new Event('storage'));
        toast.success("Logged in successfully!");
        return user;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password");
      throw error;
    }
  },
  
  // Registration function
  register: async (data: RegisterData) => {
    try {
      if (isDevelopment) {
        // Development mode - use mock data
        // Check if email already exists
        if (mockUsers.some(u => u.email === data.email)) {
          throw new Error('Email already exists');
        }
        
        // Create new user
        const newUser = {
          id: mockUsers.length + 1,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
          created_at: new Date().toISOString()
        };
        
        // In a real app we would save to the database
        // Here we just add to our mock array
        mockUsers.push(newUser);
        
        // Return user without password
        const { password, ...userWithoutPassword } = newUser;
        localStorage.setItem('pawpals_user', JSON.stringify(userWithoutPassword));
        window.dispatchEvent(new Event('storage'));
        toast.success("Account created successfully!");
        return userWithoutPassword;
      } else {
        // Production mode - connect to PHP
        const response = await fetch('/php/auth/register.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: data.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Registration failed');
        }

        const user = await response.json();
        localStorage.setItem('pawpals_user', JSON.stringify(user));
        window.dispatchEvent(new Event('storage'));
        toast.success("Account created successfully!");
        return user;
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error instanceof Error ? error.message : "Registration failed");
      throw error;
    }
  },
  
  // Get current user from local storage
  getCurrentUser: () => {
    const userJson = localStorage.getItem('pawpals_user');
    return userJson ? JSON.parse(userJson) : null;
  },
  
  // Logout function
  logout: () => {
    localStorage.removeItem('pawpals_user');
    window.dispatchEvent(new Event('storage'));
    toast.info("Logged out successfully");
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('pawpals_user');
  }
};

export { authService };
