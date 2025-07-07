const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();

    // Create regular user
    const regularUser = new User({
      name: 'John Doe',
      email: 'user@example.com',
      password: 'user123',
      role: 'user'
    });
    await regularUser.save();

    // Sample products
    const products = [
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
        price: 99.99,
        originalPrice: 129.99,
        category: 'electronics',
        brand: 'TechPro',
        images: ['https://via.placeholder.com/300x300/007bff/ffffff?text=Headphones'],
        stock: 50,
        ratings: { average: 4.5, count: 24 },
        tags: ['wireless', 'bluetooth', 'audio'],
        specifications: new Map([
          ['Battery Life', '30 hours'],
          ['Connectivity', 'Bluetooth 5.0'],
          ['Weight', '250g']
        ])
      },
      {
        name: 'Smartphone Case - Premium Leather',
        description: 'Elegant leather case for smartphones with card slots and magnetic closure. Available in multiple colors.',
        price: 29.99,
        category: 'electronics',
        brand: 'CasePro',
        images: ['https://via.placeholder.com/300x300/28a745/ffffff?text=Phone+Case'],
        stock: 100,
        ratings: { average: 4.2, count: 15 },
        tags: ['case', 'leather', 'accessories']
      },
      {
        name: 'Men\'s Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt in various sizes and colors. Perfect for casual wear.',
        price: 19.99,
        category: 'clothing',
        brand: 'ComfortWear',
        images: ['https://via.placeholder.com/300x300/dc3545/ffffff?text=T-Shirt'],
        stock: 75,
        ratings: { average: 4.0, count: 8 },
        tags: ['clothing', 'cotton', 'casual']
      },
      {
        name: 'Wireless Mouse - Ergonomic Design',
        description: 'Ergonomic wireless mouse with precision tracking and long battery life. Ideal for office work.',
        price: 24.99,
        category: 'electronics',
        brand: 'OfficePro',
        images: ['https://via.placeholder.com/300x300/6f42c1/ffffff?text=Mouse'],
        stock: 60,
        ratings: { average: 4.3, count: 12 },
        tags: ['mouse', 'wireless', 'office']
      },
      {
        name: 'Coffee Mug - Ceramic',
        description: 'Beautiful ceramic coffee mug with unique design. Microwave and dishwasher safe.',
        price: 12.99,
        category: 'home',
        brand: 'HomeStyle',
        images: ['https://via.placeholder.com/300x300/fd7e14/ffffff?text=Coffee+Mug'],
        stock: 40,
        ratings: { average: 4.1, count: 6 },
        tags: ['mug', 'ceramic', 'kitchen']
      },
      {
        name: 'Yoga Mat - Non-Slip',
        description: 'Premium non-slip yoga mat for comfortable and safe practice. Eco-friendly materials.',
        price: 34.99,
        category: 'sports',
        brand: 'FitLife',
        images: ['https://via.placeholder.com/300x300/20c997/ffffff?text=Yoga+Mat'],
        stock: 30,
        ratings: { average: 4.6, count: 18 },
        tags: ['yoga', 'fitness', 'mat']
      },
      {
        name: 'Laptop Stand - Adjustable',
        description: 'Adjustable aluminum laptop stand for better ergonomics and cooling. Compatible with all laptop sizes.',
        price: 49.99,
        category: 'electronics',
        brand: 'DeskPro',
        images: ['https://via.placeholder.com/300x300/6c757d/ffffff?text=Laptop+Stand'],
        stock: 25,
        ratings: { average: 4.4, count: 9 },
        tags: ['laptop', 'stand', 'ergonomic']
      },
      {
        name: 'Running Shoes - Lightweight',
        description: 'Lightweight running shoes with superior cushioning and breathable design. Perfect for daily runs.',
        price: 79.99,
        originalPrice: 99.99,
        category: 'sports',
        brand: 'RunFast',
        images: ['https://via.placeholder.com/300x300/e83e8c/ffffff?text=Running+Shoes'],
        stock: 35,
        ratings: { average: 4.7, count: 22 },
        tags: ['shoes', 'running', 'sports']
      }
    ];

    await Product.insertMany(products);

    console.log('Data seeded successfully!');
    console.log('Admin user: admin@example.com / admin123');
    console.log('Regular user: user@example.com / user123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
