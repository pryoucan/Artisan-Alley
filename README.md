Artisan Alley is a backend service for a marketplace platform where artisans can showcase and sell handmade products.  
This repository contains the RESTful API built with **Node.js**, **Express**, and **MongoDB**, featuring authentication, product management, and role-based access for buyers and sellers.

## Features

* **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
* **Product Management**: Full CRUD (Create, Read, Update, Delete) functionality for product listings.
* **Seller & Buyer Roles**: Distinction between users who can sell products and those who can buy.
* **Protected Routes**: Middleware to protect sensitive endpoints, ensuring only authenticated and authorized users can access them.

***

## Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB, Mongoose(ODM)
* **Authentication**: JSON Web Tokens (JWT)
* **Password Hashing**: bcrypt.js
* **Environment Variables**: dotenv

***

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.


### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/pryoucan/Artisan-Alley
    ```
3.  **Navigate to the project directory:**
    ```sh
    cd artisan-alley-backend
    ```

4.  **Install dependencies:**
    ```sh
    npm install
    ```

5.  **Create a `.env` file** in the root of the project.

6.  **Update the `.env` file** with your configuration:
    ```env
    PORT=5001
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ```

7.  **Start the server:**
    ```sh
    npm run dev
    ```
    The API should now be running on `http://localhost:5001`, or whatever port you have selected.

***

## API Endpoints

All API endpoints are prefixed with `/api`.

### Authentication

| Method | Endpoint             | Description                | Access  |
| :----- | :------------------- | :------------------------- | :------ |
| `POST` | `/auth/register`     | Registers a new user.      | Public  |
| `POST` | `/auth/login`        | Logs in a user, returns JWT. | Public  |
| `GET`  | `/auth/me`           | Gets the logged-in user's profile. | Private |

### Products

| Method | Endpoint             | Description                | Access  |
| :----- | :------------------- | :------------------------- | :------ |
| `GET`    | `/products`        | Retrieves a list of all products. | Public |
| `GET`    | `/products/:id`    | Retrieves a single product by its ID. | Public |
| `POST`   | `/products`        | Creates a new product. (Seller role required) | Private |
| `PUT`    | `/products/:id`    | Updates an existing product. (Seller must own product) | Private |
| `DELETE` | `/products/:id`    | Deletes a product. (Seller must own product) | Private |

### How Authentication Works

To access private endpoints, you must include a JSON Web Token in the `Authorization` header of your request using the **Bearer** schema.

**Example Header:**
`Authorization: Bearer <your_jwt_token>`

***

## Environment Variables

These are the environment variables used in this project.

* `PORT` - The port on which the Express server will run. (Default: `5001`)
* `MONGO_URI` - The connection string for your MongoDB database.
* `JWT_SECRET` - A secret key used to sign and verify JSON Web Tokens.


