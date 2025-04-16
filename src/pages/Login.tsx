
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PawPrint } from 'lucide-react';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { authService } from '@/services/authService';

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await authService.login({
        email: values.email,
        password: values.password,
      });
      
      // Redirect to home page on successful login
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      // Error handling happens in authService
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <NavBar />
      
      <main className="paw-container py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <PawPrint className="h-8 w-8 text-pawgreen-500" strokeWidth={2.5} />
              <span className="text-2xl font-bold text-pawgreen-600">PawPals</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 mt-1">Sign in to your account</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="john@example.com" 
                        {...field} 
                        type="email"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="********" 
                        {...field} 
                        type="password"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-pawgreen-500 hover:bg-pawgreen-600"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Don't have an account? {' '}
                  <Link to="/signup" className="text-pawgreen-500 hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Login;
