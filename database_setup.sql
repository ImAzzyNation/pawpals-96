
-- Create the PawPals database
CREATE DATABASE IF NOT EXISTS pawpals;
USE pawpals;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Pets table
CREATE TABLE IF NOT EXISTS pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(255) NOT NULL,
  breed VARCHAR(100) NOT NULL,
  age VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type ENUM('lost', 'adopt') NOT NULL,
  date_reported DATE,
  description TEXT NOT NULL,
  contact_name VARCHAR(100),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  shelter VARCHAR(100),
  adoption_fee VARCHAR(50),
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  rating DECIMAL(3,1) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  is_sale BOOLEAN DEFAULT FALSE,
  sale_percentage INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(255) NOT NULL,
  count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data (based on your mock data)
-- Users
INSERT INTO users (first_name, last_name, email, password) VALUES
('John', 'Smith', 'john.smith@email.com', 'hashed_password_here'),
('Emily', 'Johnson', 'emily.j@email.com', 'hashed_password_here');

-- Lost Pets (based on your mock data)
INSERT INTO pets (name, image, breed, age, location, type, date_reported, description, contact_name, contact_email, contact_phone) VALUES
('Max', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 
 'Golden Retriever', '3 years', 'Central Park, NYC', 'lost', '2025-04-10',
 'Max went missing during our evening walk at Central Park. He\'s friendly and responds to his name. He was wearing a blue collar with tags.',
 'John Smith', 'john.smith@email.com', '212-555-6789'),
 
('Luna', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1043&q=80',
 'Ragdoll Cat', '2 years', 'Brooklyn, NYC', 'lost', '2025-04-08',
 'Luna escaped through an open window. She\'s shy but friendly once approached. She has a pink collar with a bell.',
 'Emily Johnson', 'emily.j@email.com', '347-555-1234');

-- Adoption Pets (based on your mock data)
INSERT INTO pets (name, image, breed, age, location, type, description, shelter, adoption_fee) VALUES
('Charlie', 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
 'French Bulldog', '2 years', 'PawPals Shelter, NYC', 'adopt',
 'Charlie is a playful and energetic French Bulldog. He loves to play fetch and is great with children. He\'s house-trained and knows basic commands.',
 'PawPals Rescue Center', '$250'),
 
('Daisy', 'https://images.unsplash.com/photo-1574144283046-b5677c042795?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
 'Calico Cat', '1 year', 'PawPals Shelter, LA', 'adopt',
 'Daisy is a sweet and affectionate calico cat. She loves to curl up in laps and purr. She\'s litter-trained and gets along well with other cats.',
 'PawPals Rescue Center', '$125');

-- Products (based on your mock data)
INSERT INTO products (name, image, price, rating, category, description, is_sale, sale_percentage) VALUES
('Premium Dog Food - Chicken & Rice', 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1046&q=80',
 29.99, 4.8, 'Dog Food', 'High-quality dog food made with real chicken and brown rice. Perfect for adult dogs of all breeds.', false, null),
 
('Interactive Cat Toy - Automatic Laser', 'https://images.unsplash.com/photo-1526336179256-1347bdb255ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
 24.99, 4.5, 'Cat Toys', 'Keep your cat entertained for hours with this automatic rotating laser toy. USB rechargeable.', true, 20);

-- Categories (based on your mock data)
INSERT INTO categories (name, image, count) VALUES
('Dog Food', 'https://images.unsplash.com/photo-1581110861353-508b49ac5b8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 42),
('Cat Toys', 'https://images.unsplash.com/photo-1575738171526-64337c8cde38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 35);
