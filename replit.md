# Fullstack Prints

## Overview
An Express.js application for managing and displaying prints/products from a database. This is a fullstack application with a frontend served by Express and a MongoDB backend.

## Project Structure
- `app.js` - Main Express server (entry point)
- `api.js` - API route handlers
- `db.js` - MongoDB/Mongoose connection
- `products.js` - Product model and service
- `orders.js` - Order model and service
- `middleware.js` - Express middleware (CORS, etc.)
- `public/` - Static frontend files (index.js, nanohtml.js)
- `data/` - Sample JSON data files
- `tests/` - Jest test files

## Running the Application
- Development: `npm run dev`
- Production: `npm start`

## Requirements
- **MongoDB**: This application requires a MongoDB database. Set the `MONGODB_URI` environment variable to your MongoDB connection string (e.g., from MongoDB Atlas).

## API Endpoints
- `GET /` - Serves the frontend HTML
- `GET /products` - List products (supports `offset`, `limit`, `tag` query params)
- `GET /products/:id` - Get single product
- `POST /products` - Create product
- `PUT /products/:id` - Edit product
- `DELETE /products/:id` - Delete product
- `GET /orders` - List orders (supports `offset`, `limit`, `productId`, `status` query params)
- `POST /orders` - Create order
- `PUT /orders/:id` - Edit order

## Configuration
- Port: 5000 (or `PORT` environment variable)
- Host: 0.0.0.0
- MongoDB: Requires `MONGODB_URI` environment variable
