
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

// Mock user data for browser simulation
const MOCK_USERS = [
  {
    id: "u1",
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    password: "password123" // In a real app, this would be hashed
  }
];

// Local storage key for user data
const USER_STORAGE_KEY = 'pawpals_user';

// Helper to store user in local storage
const storeUser = (user: any) => {
  // Remove password before storing
  const { password, ...safeUser } = user;
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(safeUser));
  // Dispatch storage event for other tabs to update
  window.dispatchEvent(new Event('storage'));
};

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

// Auth service with browser simulation
const authService = {
  // Login function
  login: async (data: LoginData) => {
    try {
      console.info("Login attempt (browser simulation)");
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find user in mock data
      const user = MOCK_USERS.find(u => u.email === data.email);
      
      // Check if user exists and password matches
      if (user && user.password === data.password) {
        console.info("Login successful (browser simulation)");
        storeUser(user);
        toast.success("Logged in successfully!");
        return user;
      } else {
        console.error("Invalid credentials (browser simulation)");
        toast.error("Invalid email or password");
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      throw error;
    }
  },
  
  // Registration function
  register: async (data: RegisterData) => {
    try {
      console.info("Sign up form submitted with values:", data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === data.email)) {
        console.error("Email already exists (browser simulation)");
        toast.error("Email already in use. Please try another.");
        throw new Error("Email already exists");
      }
      
      // Create new user
      const newUser = {
        id: uuidv4(),
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password // In a real app, this would be hashed
      };
      
      // Add to mock users array (in a real app, this would persist to a database)
      MOCK_USERS.push(newUser);
      
      console.info("Registration successful (browser simulation)");
      toast.success("Account created successfully!");
      
      // Store user in local storage
      storeUser(newUser);
      
      return newUser;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
      throw error;
    }
  },
  
  // Get current user from local storage
  getCurrentUser: () => {
    const userJson = localStorage.getItem(USER_STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },
  
  // Logout function
  logout: () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    window.dispatchEvent(new Event('storage'));
    toast.info("Logged out successfully");
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(USER_STORAGE_KEY);
  }
};

export { authService };
