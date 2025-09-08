# **aDApt – Student Collaborative Platform**

**aDApt** is a full-stack web application designed to streamline student's life by providing a unified platform for **resource sharing**, **Q&A**, **lost and found**, and **real-time group chat**.  
aDApt enables students and administrators to **collaborate, communicate, and manage resources efficiently**.  

---

## **Live Demo :**
### url : https://drive.google.com/file/d/1G1PxHaJC4yYcTDCnRXHfXI0GELFe3XhM/view?usp=sharing

## **Tech Stack & Services**

**Frontend**
- React.js (Vite)
- Tailwind CSS
- Framer Motion (animations)
- React Hot Toast (notifications)
- Lucide React (icons)
- socket.io-client (real-time chat)

**Backend**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (authentication)
- Socket.io (real-time chat)

**Cloud & Third-Party Services**
- **Cloudinary** – Image upload and storage
- **Render** – Backend deployment (suggested)
- **Vercel/Netlify** – Frontend deployment (suggested)

**Other**
- CORS, dotenv, and other utility libraries

## **Key Features**

- **Q&A Manager**: Post, answer, and discuss questions in categorized rooms, with **per-question group chat**.  
- **Lost & Found**: Report, search, and manage lost or found items, with **per-item group chat** for real-time coordination.  
- **Resource Library**: Share and access important **study materials and resources**.  
- **Group Chat**: Real-time chat using **Socket.io**, with **user-specific color coding** for easy identification.  
- **Authentication**: Secure **login, registration, and admin access** with **JWT**.  
- **Admin Controls**: Category management, **moderation**, and enhanced privileges.  
- **Modern UI**: Responsive, user-friendly interface with **expanding sidebar** and intuitive navigation.  

## **Folder Structure**
```
aDApt/
├── client/                # Frontend (React)
│   ├── public/            # Static assets (images, icons, etc.)
│   ├── src/
│   │   ├── assets/        # App images and SVGs
│   │   ├── components/    # Reusable React components (GroupChat, Navbar, etc.)
│   │   ├── context/       # React context (auth, etc.)
│   │   ├── pages/         # Main app pages (QnA, Lost & Found, Login, etc.)
│   │   └── index.css      # Global styles
│   ├── package.json       # Frontend dependencies and scripts
│   └── ...                # Config files (Vite, Tailwind, etc.)
│
├── server/                # Backend (Node.js, Express, MongoDB)
│   ├── controllers/       # Route controllers (auth, chat, qna, etc.)
│   ├── models/            # Mongoose models (User, QnA, etc.)
│   ├── routes/            # Express route definitions
│   ├── uploads/           # Uploaded files (if any)
│   ├── utils/             # Utility modules (cloudinary config, etc.)
│   ├── socket.js          # Socket.io server setup
│   ├── index.js           # Main server entry point
│   ├── package.json       # Backend dependencies and scripts
│   └── ...                # Other backend files
│
├── README.md              # Project documentation
└── ...                    # Other root files (env, gitignore, etc.)
```           

## **Prerequisites**

- [Node.js](https://nodejs.org/) (v16 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- (Optional) [Cloudinary](https://cloudinary.com/) account for image uploads

## **Installation & Setup**

1. **Clone the repository:**
	```bash
	git clone https://github.com/Kashish2130/aDApt.git
	cd aDApt
	```

2. **Setup the backend:**
	```bash
	cd server
	npm install
	# Create a .env file (see .env.example if available) and configure:
	# - MONGODB_URI
	# - JWT_SECRET
	# - CLOUDINARY credentials (if using image upload)
	npm start
	```

3. **Setup the frontend:**
	```bash
	cd ../client
	npm install
	npm run dev
	```

4. **Access the app:**
	- Frontend: http://localhost:5173 (default Vite port)
	- Backend API: http://localhost:5000 (default Express port)

