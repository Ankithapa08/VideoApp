# VideoApp – Upload, Stream & Share Videos Securely
VideoApp is a full-stack video streaming and link sharing platform that allows users to upload, stream, and share videos using secure authentication, cloud storage, and a creator dashboard, built using Node.js, Express, MongoDB, Cloudinary, and React. 

## Core Features

- **Secure Authentication**
  - JWT-based authentication using access and refresh tokens
  - HTTP-only cookies for enhanced security
  - Protected routes

- **Video Upload & Streaming**
  - Upload videos and thumbnails using Cloudinary
  - Stream videos via HTML5 video player
  - Share video links securely

- **Creator Dashboard**
  - View total uploaded videos
  - Track subscribers and likes
  - Manage uploaded videos with previews

- **User Engagement**
  - Like and comment on videos
  - Subscribe and unsubscribe to channels

-  **Security**

- Password hashing with bcrypt HTTP-only cookies Protected API routes using middleware Input validation & centralized error handling

## Tech Stack 
- **Backend**

Node.js Express.js MongoDB + Mongoose JWT Authentication Cloudinary (media storage) Multer (file uploads)

- **Frontend**

React (Vite) React Router DOM Axios Context API HTML, CSS, JavaScript

##  Installation

Follow the steps below to run the project locally.

###  Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Cloudinary account
- Git

---

###  Clone the Repository
```bash
git clone https://github.com/your-username/videoapp.git
cd videoapp
Backend Setup
cd server
npm install


Create a .env file in the server directory and add:

PORT=8000
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Start the backend server:

npm run dev


Backend will run at:

http://localhost:8000

🔹 Frontend Setup
cd ../client
npm install
npm run dev


Frontend will run at:

http://localhost:5173
