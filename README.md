
# MERN Blog System

A full-stack MERN Blog Application implementing Authentication, Role-Based Access Control (RBAC), Posts & Comments, and an Admin Dashboard. This project was built as part of a technical assignment / shortlisting round.


## 📌 Project Overview

The MERN Blog System allows users to register, log in, create blog posts, and add comments.
An ADMIN role is responsible for moderation actions such as deleting posts and comments via a protected admin dashboard.

The application follows industry-standard practices for authentication, authorization, and frontend–backend separation.
## 🚀 Features

🔐 Authentication & Authorization

* User Registration & Login

* JWT-based Authentication

* Access Token expiry handling (1 hour)

* Role-Based Access Control (USER / ADMIN)

* Protected routes on frontend and backend

* Secure logout

📝 Posts

* Create Post (Authenticated users)

* View all posts

* Delete any post (Admin only)

💬 Comments

* Add comment on a post

* One comment per user per post

* View comments by post

* Delete any comment (Admin only)

👨‍💼 Admin Dashboard

* Admin-only access

* View platform data

* Delete posts

* Delete comments
## 🛠 Tech Stack

Frontend

* React (Vite)

* React Router DOM

* Context API

* Axios (with interceptor)

* Bootstrap

Backend

* Node.js

* Express.js

* MongoDB

* Mongoose

* JWT

* Zod (validation)

* Express Rate Limiting
## 📂 Project Structure

mern-blog-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── validators/
│   │   ├── config/
│   │   └── server.js
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── api/
│   │   └── App.jsx
│   ├── .gitignore
│   └── package.json
│
└── README.md

## ⚙️ Environment Variables

Backend (backend/.env)

``` 
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Frontend (frontend/.env)
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```



## Run Locally

1️⃣ Clone Repository

```git clone
https://github.com/your-username/mern-blog-system.git
cd mern-blog-system
```
2️⃣ Start Backend
```cd
backend
npm install
npm run dev
```
3️⃣ Start Frontend

```cd
frontend
npm install
npm run dev
```



## 🔐 Roles & Permissions

| Action                 | USER | ADMIN |
| ---------------------- | ---- | ----- |
| Register / Login       | ✅    | ✅     |
| Create Post            | ✅    | ✅     |
| View Posts             | ✅    | ✅     |
| Add Comment            | ✅    | ✅     |
| Delete Post            | ❌    | ✅     |
| Delete Comment         | ❌    | ✅     |
| Access Admin Dashboard | ❌    | ✅     |

## 🔑 Authentication Flow

1. User logs in

2. Backend returns:

* accessToken

* user { id, name, role }

3. Token stored in localStorage

4. Axios interceptor attaches token to API requests

5. Protected routes are validated on both frontend and backend
## API Reference

#### Auth

* ```POST /api/v1/auth/register```

* ```POST /api/v1/auth/login```

#### Posts

* ```GET /api/v1/posts```

* ```POST /api/v1/posts```

* ```DELETE /api/v1/admin/posts/:id```

#### Comments

* ```GET /api/v1/comments/post/:postId```

* ```POST /api/v1/comments```

* ```DELETE /api/v1/admin/comments/:id```

#### Admin

* ```GET /api/v1/admin/dashboard```




## Authors

- [@VivekRaj212](https://github.com/VivekRaj212)

