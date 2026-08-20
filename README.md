# 🚀 Portfolio Backend

Backend API for my personal developer portfolio, built with **Node.js, Express.js, and MongoDB**. It provides APIs for managing portfolio content and handling messages submitted through the contact form.

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Backend framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ODM
- **JWT** – Authentication
- **bcrypt** – Password hashing
- **CORS** – Cross-Origin Resource Sharing
- **Helmet** – HTTP security headers
- **express-rate-limit** – API rate limiting
- **dotenv** – Environment variable management
- **Multer / Cloudinary** – File and image handling

## ✨ Features

- 🔐 Admin authentication using JWT
- 👤 Admin-protected routes
- 📩 Contact form API
- 📁 Portfolio/project management APIs
- 🖼️ Image upload and management
- 🗄️ MongoDB database integration
- 🔒 Password hashing with bcrypt
- 🛡️ API security using Helmet and rate limiting
- 🌐 CORS configuration
- ⚙️ Environment variable configuration
- 🚀 Production deployment support

## 📂 Project Structure

```text
backend/
│
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   └── contactController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Contact.js
│
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── contactRoutes.js
│
├── config/
│   └── db.js
│
├── uploads/
│
├── .env
├── .gitignore
├── server.js
└── package.json
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/register` | Create admin account |

### Projects

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get a project |
| POST | `/api/projects` | Create a project |
| PUT | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

### Contact

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contact` | Submit contact message |
| GET | `/api/contact` | Get contact messages |

> Protected endpoints require a valid JWT authentication token.

## ⚙️ Environment Variables

Create a `.env` file in the backend root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=your_frontend_url
```

**Never commit your `.env` file to GitHub.**

## 📦 Installation

Clone the repository:

```bash
git clone YOUR_BACKEND_REPOSITORY_URL
```

Navigate into the project:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create your `.env` file and add the required environment variables.

Start the development server:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

## 🔐 Security

This backend implements several security practices:

- JWT-based authentication
- bcrypt password hashing
- Helmet security headers
- CORS configuration
- API rate limiting
- Environment variables for sensitive credentials
- Protected admin routes
- Input validation

## 🌐 Frontend Integration

The backend API can be connected to a React frontend using **Axios** or the browser `fetch()` API.

Example:

```javascript
import axios from "axios";

const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/projects`
);

console.log(response.data);
```

## 🚀 Deployment

The backend can be deployed using platforms such as:

- Render

MongoDB can be hosted using **MongoDB Atlas**.

## 👨‍💻 Author

**Ashok Kumar**

MERN Full Stack Developer

- React.js
- Node.js
- Express.js
- MongoDB

## 📄 License

This project is created for personal portfolio and learning purposes.
