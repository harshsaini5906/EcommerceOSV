# Backend for OVS_eCommerce Project

## Description
This is the backend for the eCommerce project, built with Node.js and Express. The backend handles all the business logic and API endpoints related to the management of **vendors**, **products**, and **orders**. It includes features such as vendor registration, product management (add, update, delete), and order processing.

## Features
- **Vendor Management**: Allows vendors to register, authenticate, and manage their products.
- **Product Management**: Vendors can create, update, and delete products.
- **Order Management**: Allows customers to place orders, and vendors to manage and track them.
- **Authentication**: Secure user authentication using JWT (JSON Web Tokens) for vendors.
- **Error Handling**: Custom error responses for different validation issues or request errors.

## Tech Stack
- **Backend Framework**: Node.js with Express
- **Database**: MongoDB (using Mongoose for ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Variables**: Managed using `.env`
- **Utilities**: Bcrypt for password hashing, Joi for validation

