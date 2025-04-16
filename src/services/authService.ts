
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

// Auth service that connects to MySQL through PHP
const authService = {
  // Login function
  login: async (data: LoginData) => {
    try {
      // Connect to PHP endpoint
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
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password");
      throw error;
    }
  },
  
  // Registration function
  register: async (data: RegisterData) => {
    try {
      // Connect to PHP endpoint
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
