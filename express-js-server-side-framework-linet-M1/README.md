# Week 2 MERN Stack Assignment

## Overview
This project is a simple **Product API** built with **Node.js**, **Express.js**, and **MongoDB**.  
It implements RESTful routes, middleware, validation, error handling, and advanced features like filtering, pagination, and search.

---

## Features

### 1. RESTful API Endpoints
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get a specific product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update an existing product
- `DELETE /api/products/:id` - Delete a product

### 2. Product Model
Each product contains:
- `id` (string) – unique identifier
- `name` (string)
- `description` (string)
- `price` (number)
- `category` (string)
- `inStock` (boolean)

### 3. Middleware
- **Logger** – Logs request method, URL, and timestamp
- **Authentication** – Checks for an API key in request headers
- **Validation** – Validates product data for create/update requests
- **Error Handling** – Global error handling with custom error classes

### 4. Advanced Features
- **Filtering** – Filter products by category using query parameters
- **Pagination** – Paginate product listings (`page` and `limit` query params)
- **Search** – Search products by name
- **Statistics** – Count of products grouped by category

---

## Setup Instructions

1. Clone the repository:
```bash
git clone <REPO_URL>
cd <repo-name>
