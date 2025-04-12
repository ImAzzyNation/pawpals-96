
// Mock Data for PawPals
export const lostPets = [
  {
    id: "1",
    name: "Max",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    breed: "Golden Retriever",
    age: "3 years",
    location: "Central Park, NYC",
    type: "lost" as const,
    date: "April 10, 2025",
    description: "Max went missing during our evening walk at Central Park. He's friendly and responds to his name. He was wearing a blue collar with tags.",
    contactName: "John Smith",
    contactEmail: "john.smith@email.com",
    contactPhone: "212-555-6789"
  },
  {
    id: "2",
    name: "Luna",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1043&q=80",
    breed: "Ragdoll Cat",
    age: "2 years",
    location: "Brooklyn, NYC",
    type: "lost" as const,
    date: "April 8, 2025",
    description: "Luna escaped through an open window. She's shy but friendly once approached. She has a pink collar with a bell.",
    contactName: "Emily Johnson",
    contactEmail: "emily.j@email.com",
    contactPhone: "347-555-1234"
  },
  {
    id: "3",
    name: "Cooper",
    image: "https://images.unsplash.com/photo-1541876176131-3f5e84a7331a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    breed: "Australian Shepherd",
    age: "1 year",
    location: "Los Angeles, CA",
    type: "lost" as const,
    date: "April 11, 2025",
    description: "Cooper got spooked by fireworks and ran away. He has distinctive blue and brown eyes, and a multi-colored coat.",
    contactName: "Michael Lee",
    contactEmail: "michael.l@email.com",
    contactPhone: "310-555-9876"
  },
  {
    id: "4",
    name: "Bella",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    breed: "Siamese Cat",
    age: "4 years",
    location: "Chicago, IL",
    type: "lost" as const,
    date: "April 9, 2025",
    description: "Bella went missing from our backyard. She has striking blue eyes and a cream and brown coat. She's microchipped.",
    contactName: "Sarah Wilson",
    contactEmail: "sarah.w@email.com",
    contactPhone: "773-555-3456"
  },
  {
    id: "5",
    name: "Rocky",
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    breed: "Pit Bull Mix",
    age: "5 years",
    location: "Miami, FL",
    type: "lost" as const,
    date: "April 7, 2025",
    description: "Rocky got out through a hole in our fence. He's friendly and playful, with a brindle coat. He has a green collar.",
    contactName: "David Martinez",
    contactEmail: "david.m@email.com",
    contactPhone: "305-555-7890"
  },
  {
    id: "6",
    name: "Milo",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    breed: "Beagle",
    age: "2 years",
    location: "Seattle, WA",
    type: "lost" as const,
    date: "April 12, 2025",
    description: "Milo ran after a squirrel during our hike at Discovery Park. He's friendly and has a loud bark. He has a red collar with tags.",
    contactName: "Lisa Brown",
    contactEmail: "lisa.b@email.com",
    contactPhone: "206-555-2345"
  }
];

export const adoptionPets = [
  {
    id: "a1",
    name: "Charlie",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
    breed: "French Bulldog",
    age: "2 years",
    location: "PawPals Shelter, NYC",
    type: "adopt" as const,
    description: "Charlie is a playful and energetic French Bulldog. He loves to play fetch and is great with children. He's house-trained and knows basic commands.",
    shelter: "PawPals Rescue Center",
    adoptionFee: "$250"
  },
  {
    id: "a2",
    name: "Daisy",
    image: "https://images.unsplash.com/photo-1574144283046-b5677c042795?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    breed: "Calico Cat",
    age: "1 year",
    location: "PawPals Shelter, LA",
    type: "adopt" as const,
    description: "Daisy is a sweet and affectionate calico cat. She loves to curl up in laps and purr. She's litter-trained and gets along well with other cats.",
    shelter: "PawPals Rescue Center",
    adoptionFee: "$125"
  },
  {
    id: "a3",
    name: "Oliver",
    image: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    breed: "Border Collie",
    age: "3 years",
    location: "PawPals Shelter, Austin",
    type: "adopt" as const,
    description: "Oliver is a smart and active Border Collie. He loves to learn new tricks and needs plenty of exercise. He'd be great for an active family.",
    shelter: "PawPals Rescue Center",
    adoptionFee: "$200"
  },
  {
    id: "a4",
    name: "Coco",
    image: "https://images.unsplash.com/photo-1596854273338-cbf078ec7071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
    breed: "Labradoodle",
    age: "1 year",
    location: "PawPals Shelter, Chicago",
    type: "adopt" as const,
    description: "Coco is a friendly and gentle Labradoodle. She's great with kids and other pets. She's partially trained and eager to learn more.",
    shelter: "PawPals Rescue Center",
    adoptionFee: "$300"
  },
  {
    id: "a5",
    name: "Simba",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    breed: "Maine Coon",
    age: "4 years",
    location: "PawPals Shelter, Seattle",
    type: "adopt" as const,
    description: "Simba is a majestic Maine Coon with a gentle personality. He loves to be brushed and will follow you around the house. He's litter-trained and well-behaved.",
    shelter: "PawPals Rescue Center",
    adoptionFee: "$175"
  },
  {
    id: "a6",
    name: "Ruby",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    breed: "Boxer",
    age: "2 years",
    location: "PawPals Shelter, Denver",
    type: "adopt" as const,
    description: "Ruby is an energetic and loving Boxer. She enjoys long walks and playing fetch. She's house-trained and knows several commands.",
    shelter: "PawPals Rescue Center",
    adoptionFee: "$225"
  }
];

export const shopProducts = [
  {
    id: "p1",
    name: "Premium Dog Food - Chicken & Rice",
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1046&q=80",
    price: 29.99,
    rating: 4.8,
    category: "Dog Food",
    description: "High-quality dog food made with real chicken and brown rice. Perfect for adult dogs of all breeds.",
    isSale: false,
  },
  {
    id: "p2",
    name: "Interactive Cat Toy - Automatic Laser",
    image: "https://images.unsplash.com/photo-1526336179256-1347bdb255ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    price: 24.99,
    rating: 4.5,
    category: "Cat Toys",
    description: "Keep your cat entertained for hours with this automatic rotating laser toy. USB rechargeable.",
    isSale: true,
    salePercentage: 20,
  },
  {
    id: "p3",
    name: "Cozy Pet Bed - Medium",
    image: "https://images.unsplash.com/photo-1567590997610-cceae5ea04c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=946&q=80",
    price: 39.99,
    rating: 4.7,
    category: "Bedding",
    description: "Ultra-soft pet bed with orthopedic foam for maximum comfort. Machine washable cover.",
    isSale: false,
  },
  {
    id: "p4",
    name: "Adjustable Dog Collar - Red",
    image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80",
    price: 14.99,
    rating: 4.4,
    category: "Accessories",
    description: "Durable nylon collar with reflective stitching for night visibility. Adjustable for perfect fit.",
    isSale: true,
    salePercentage: 15,
  },
  {
    id: "p5",
    name: "Cat Grooming Brush Set",
    image: "https://images.unsplash.com/photo-1583795311669-f7a526b3244c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80",
    price: 19.99,
    rating: 4.6,
    category: "Grooming",
    description: "Complete grooming set including slicker brush, comb, and deshedding tool. Suitable for all cat breeds.",
    isSale: false,
  },
  {
    id: "p6",
    name: "Durable Dog Chew Toy - Dental Care",
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    price: 12.99,
    rating: 4.3,
    category: "Dog Toys",
    description: "Tough chew toy designed to clean teeth and massage gums. Made from non-toxic, pet-safe materials.",
    isSale: false,
  },
  {
    id: "p7",
    name: "Automatic Pet Feeder - 5L",
    image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    price: 59.99,
    rating: 4.9,
    category: "Feeding",
    description: "Programmable automatic pet feeder with portion control. Dispenses up to 4 meals per day.",
    isSale: true,
    salePercentage: 25,
  },
  {
    id: "p8",
    name: "Premium Cat Litter - 20lb",
    image: "https://images.unsplash.com/photo-1574158622082-ca59cf35c8a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    price: 18.99,
    rating: 4.7,
    category: "Cat Supplies",
    description: "Clumping, dust-free cat litter with odor control. Made from natural, biodegradable materials.",
    isSale: false,
  }
];

export const featuredCategories = [
  {
    id: "c1",
    name: "Dog Food",
    image: "https://images.unsplash.com/photo-1581110861353-508b49ac5b8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    count: 42
  },
  {
    id: "c2",
    name: "Cat Toys",
    image: "https://images.unsplash.com/photo-1575738171526-64337c8cde38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    count: 35
  },
  {
    id: "c3",
    name: "Grooming",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    count: 28
  },
  {
    id: "c4",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1623014383595-1564969769020?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    count: 53
  }
];
