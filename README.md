# E-Commerce Platform

A modern, full-stack e-commerce platform built with React, Node.js, and MongoDB.

## Features

- **Frontend (React)**
  - Product catalog with search and filtering
  - Shopping cart functionality
  - User authentication and registration
  - Responsive design with modern UI
  - Product details and reviews

- **Backend (Node.js/Express)**
  - RESTful API endpoints
  - User authentication with JWT
  - Product management
  - Order processing
  - MongoDB integration

## Tech Stack

- **Frontend**: React, React Router, Axios, Bootstrap/CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository and navigate to the project directory

2. Install dependencies for all parts:
```bash
npm run install-deps
```

3. Set up environment variables:
   - Copy `server/.env.example` to `server/.env`
   - Update the MongoDB connection string and JWT secret

4. Start the development servers:
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

## Project Structure

```
ecommerce-platform/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product by ID
- POST `/api/products` - Create new product (admin)

### Users
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update user profile

### Orders
- POST `/api/orders` - Create new order
- GET `/api/orders` - Get user orders

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
