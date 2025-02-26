# Simple Blog Management System [API](https://blog-management-server-05.vercel.app/)

A powerful and simple Blog Management API system, feature-
rich blog management platform designed for scalability and ease of use. Built with TypeScript, Express.js, MongoDB, and Mongoose, this application provides seamless blog creation, management, and user interaction features.

## 🌐 Live Demo
Explore the live application here: **[Live URL](https://blog-management-server-05.vercel.app/)**

---

## 🖋 Features

### User-Friendly Blog Management
- **Create, Update, Delete Blogs**: Effortlessly manage blogs using intuitive APIs.  
- **Advanced Search**: Search blogs by title or content using regex for flexibility.  
- **Filter & Sort**: Easily filter blogs by author and sort by creation date in ascending or descending order.  

### Role-Based Access Control
- **Admins**: Full access to manage blogs and perform administrative tasks.  
- **Authors**: Limited access to their own blog entries.  

### Error Handling
- **Centralized Error Management**: Handle `ValidationError`, `CastError`, `Duplicate Key Errors`, and more effectively.  
- **Zod Validation**: Strong schema validation to ensure data integrity.  

---

## 🚀 Technology Stack

- **Backend**: TypeScript, Node.js, Express.js  
- **Database**: MongoDB with Mongoose ORM  
- **Validation**: Zod for schema validation  
- **Authentication**: Token-based authentication using JSON Web Tokens (JWT)  
- **Error Handling**: Custom error classes and centralized error middleware  

---

## 📂 Project Structure

```plaintext
src/  
├── app/ 
│   ├── config/
│   │   └── index.ts
│   ├── errors
│   │   ├── AppError.ts
│   │   ├── HandleCastError.ts
│   │   ├── HandleDuplicateError.ts
│   │   ├── HandleValidationError.ts
│   │   └── HandleZodError.ts
│   ├── interface
│   │   ├── error.ts
│   │   └── index.d.ts
│   ├── middlewares
│   │   ├── authGuard.ts
│   │   ├── globalErrorHandler.ts
│   │   └── notFound.ts
│   ├── module
│   │   ├── admin
│   │   │   ├── admin.controller.ts
│   │   │   ├── admin.routes.ts
│   │   │   └── admin.service.ts
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.interface.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.validation.ts
│   │   ├── blog
│   │   │   ├── blog.controller.ts
│   │   │   ├── blog.interface.ts
│   │   │   ├── blog.model.ts
│   │   │   ├── blog.routes.ts
│   │   │   ├── blog.service.ts
│   │   │   └── blog.validation.ts
│   │   └── user
│   │       ├── user.constant.ts
│   │       ├── user.interface.ts
│   │       └── user.model.ts
│   ├── routes
│   │   └── index.ts 
│   └── utils
│       ├── catchAsync.ts
│       ├── sendResponse.ts
│       └── validateRequest.ts
└── server.ts 

```

---

## 📋 Installation and Setup

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/dear-mahmud-bd/blog-project-with-mongoose.git  
   cd blog-project-with-mongoose  
   ```  

2. **Install Dependencies**  
   ```bash
   npm install  
   ```  

3. **Environment Configuration**  
   Create a `.env` file in the root directory:  
   ```plaintext
   NODE_ENV=development  
   PORT= provide your port number  
   DATABASE_URL= your MongoDB url (like: mongodb+srv://YOUR_SECRET_PROJECT:YOUR_SECRET+PASS@cluster0.1plyg.mongodb.net/blogs-data?retryWrites=true&w=majority&appName=YOUR_CLUSTER)
   BCRYPT_SALT_ROUNDS=your_bcrypt_secret  
   JWT_ACCESS_TOKEN=your_jwt_secret
   JWT_ACCESS_TOKEN_EXPIRES=your_recomended_time (must in formate)
   ```  

4. **Run the Application**  
   ```bash
   npm run start:dev
   ```  

5. **Visit the Application**  
   Open your browser and navigate to: `http://localhost:5000`  

---


## 📊 API Endpoints

### **User Management**  
#### Register a User  
- Method: **POST** `/api/auth/register`  
- Request Body Example:  
  ```json  
   {  
      "name": "John Doe",  
      "email": "john@example.com",  
      "password": "securepassword"  
   }    
---
#### Login a User  
- Method: **POST** `/api/auth/login`  
- Request Body Example:  
  ```json  
   {  
      "email": "john@example.com",  
      "password": "securepassword"  
   }    
- after valied request it will return a **token**  
---

### **Blog Management**  
#### Create a Blog  
- Method: **POST** `/api/blogs`  
- Request Header : **Authorization : Bearer <token>**
- Request Body Example:  
  ```json  
   {
      "title": "My First Blog",
      "content": "This is the content of my blog."
   }    
---
#### Update Blog  
- Method: **POST** ` /api/blogs/:id`
- Request Header : **Authorization : Bearer <token>**  
- Request Body Example:  
  ```json  
   {
      "title": "Updated Blog Title",
      "content": "Updated content."
   }   
---
#### Delete Blog  
- Method: **POST** ` /api/blogs/:id`
- Request Header : **Authorization : Bearer <token>**    
---