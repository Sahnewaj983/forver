#  Forever E-Commerce App

A full-stack e-commerce web application built using **MERN stack** with features like authentication, cart management, payments, and more.

---

##  Features

*  User Authentication (JWT + Google OAuth)
*  Product browsing & filtering
*  Cart management system
*  Payment integration (Stripe)
*  Order management
*  Forgot/Reset password (Nodemailer)
*  Image upload (Cloudinary)
*  Admin panel for managing products & orders

---

##  Tech Stack

### Frontend:

* React.js
* Vite
* Axios
* Tailwind CSS

### Backend:

* Node.js
* Express.js
* MongoDB + Mongoose

### Other Integrations:

* Google OAuth
* Stripe
* Nodemailer
* Cloudinary
*  Multer

---

##  Project Structure

/backend
/frontend

---

##  Environment Variables

Create a `.env` file in the backend and add:

```
MONGODB_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
EMAIL_USER=
EMAIL_PASS=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET=
STRIPE_SECRET_KEY=
FRONTEND_URL=
```

---

##  Run Locally

### 1. Clone the repo

```
git clone https://github.com/your-username/your-repo.git
```

### 2. Install dependencies

```
cd backend
npm install

cd ../frontend
npm install
```

### 3. Start the app

Backend:

```
npm run server
```

Frontend:

```
npm run dev
```

---

##  Deployment

* Frontend → Vercel
* Backend → Vercel

---

##  Authentication Flow

* JWT-based authentication
* Token stored in cookies/localStorage
* Protected routes using middleware

---

##  Payment Flow (Stripe)

* Create checkout session
* Redirect user to Stripe
* Verify payment after success

---

---

##  Learnings

* Handling authentication securely
* Working with third-party APIs (Stripe, Google OAuth)
* Deploying full-stack apps on Vercel
* Managing serverless backend

---

##  Known Issues

* Stripe webhook not implemented yet
* Serverless cold start delay on backend

---

##  Author

Md Sahnewaj Ali

---

##  Support

If you like this project, give it a ⭐ on GitHub!
