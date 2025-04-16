
// Category data for the shop
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

// Placeholder product data for the shop
export const shopProducts = [
  {
    id: 'prod-1',
    name: 'Premium Dog Food',
    image_url: 'https://images.unsplash.com/photo-1589924691595-701509fa6614?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 24.99,
    rating: 4.8,
    category: 'food',
    is_sale: false
  },
  {
    id: 'prod-2',
    name: 'Interactive Cat Toy',
    image_url: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 12.99,
    rating: 4.5,
    category: 'toys',
    is_sale: true,
    sale_percentage: 15
  },
  {
    id: 'prod-3',
    name: 'Cozy Pet Bed',
    image_url: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 39.99,
    rating: 4.7,
    category: 'beds',
    is_sale: false
  },
  {
    id: 'prod-4',
    name: 'Adjustable Pet Collar',
    image_url: 'https://images.unsplash.com/photo-1599443015574-be5fe8a05783?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 8.99,
    rating: 4.2,
    category: 'accessories',
    is_sale: true,
    sale_percentage: 10
  }
];
