# Google Drive Auth Clone

A robust Node.js and Express application that empowers users to register, authenticate, and manage their personal files with privacy and security. Each user enjoys an isolated storage environment, ensuring exclusive access to their own uploads.

## 🚀 Features

- Secure user registration and authentication with JWT and bcrypt
- Individual file storage: users can upload, download, and delete only their own files
- Elegant UI powered by EJS, TailwindCSS, and Flowbite
- Session management via HTTP-only cookies
- Scalable folder structure: each user’s files are stored in a dedicated directory
- Ready for role-based access control and future enhancements

## 🗂️ Project Structure

- `/Models` — Mongoose schemas for user data
- `/Routes` — Express routers for authentication and file operations
- `/Config` — Database connection logic
- `/public/uploads` — User-specific file storage
- `/views` — EJS templates for the frontend

## ⚡ Getting Started

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**  
   Create a `.env` file:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. **Launch the application**
   ```bash
   node Server.js
   ```
5. **Access the platform**  
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔒 Security & Privacy

- Passwords are hashed before storage
- JWT tokens secure user sessions
- File access is strictly limited to the authenticated user
- All file operations are validated to prevent unauthorized access

## 🛠️ Customization

- Extend the user schema for roles or additional metadata
- Integrate cloud storage or third-party authentication as needed
- Enhance the UI with more features or custom themes

---

**Created by – Tejas Agrawal**