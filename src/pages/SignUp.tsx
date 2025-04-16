
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
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.info('Sign up form submitted with values:', values);
    setIsLoading(true);
    
    try {
      await authService.register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      
      // Redirect to home page on successful registration
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
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
            <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600 mt-1">Join our pet-loving community</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Doe" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
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
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account? {' '}
                  <Link to="/login" className="text-pawgreen-500 hover:underline">
                    Sign in
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

export default SignUp;
