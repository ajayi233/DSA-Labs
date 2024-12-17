# Product Management System

This is a simple product management system built with nodejs and express. The system allows users to add, update and delete products. The system also has a user authentication system.

**Please sign up and log in to use the system**

## Features

- User authentication system
- Product management system
  - Add product
  - Update product
  - Delete product

## Routes

- GET /signup - Signup page
- POST /signup - Signup a new user
- GET /login - Login page
- POST /login - Login a user
- GET /logout - Logout a user
- GET /products - List all products
- POST /products - Add a new product
- GET /products/:id - Get a product by id
- PATCH /products/:id - Update a product
- DELETE /products/:id - Delete a product

## Technologies Used

- Nodejs
- Express
- Mongoose (for MongoDB)
- EJS (for templating)
- Bootstrap (for styling)
- jQuery (for ajax requests)
- Multer (for file uploads)

## How to Run

1. Clone the repository
2. Run `npm install`
3. Run `npm start`
4. Open the browser and go to `http://localhost:4000`
