# 🎨 Client Portfolio Website – Thumbnail Designer & Video Editor

This is a **full-stack MERN-based portfolio** for a **Thumbnail Designer & Video Editor**.  
The platform allows the public to explore the portfolio (thumbnails and videos), while admins can securely manage media content through a dedicated admin panel — **without manual hardcoding**.

---

## ✨ Features

### 👥 User Side
- 🖼️ View **thumbnail gallery**
- 🎥 View **video portfolio**
- 📖 About the designer / editor
- 📩 Contact form for inquiries and collaborations

---

### 🔐 Admin Panel
- 🔑 Secure **Admin Authentication**
- ➕ Add & manage **images (thumbnails)**
- ➕ Add & manage **videos**
- ⚙️ Protected routes & JWT-based content management
- 💬 Toast notifications for actions (React Toastify)

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- React Router
- TailwindCSS
- React Toastify
- React Icons

**Backend**
- Node.js
- Express.js
- MongoDB (Atlas)
- Multer for media uploads
- JWT for authentication

**Architecture**
- RESTful APIs
- Protected admin routes
- Full-stack MERN structure

---

## 🌐 API Endpoints

### 📌 Public Routes
| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/media/admin/get-images` | Fetch all uploaded thumbnails |
| GET | `/media/admin/get-videos` | Fetch all uploaded videos |

---

### 🔐 Protected Admin Routes
| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/auth/admin/login` | Admin login with password |
| POST | `/media/admin/add-image` | Upload a new thumbnail |
| DELETE | `/media/admin/delete-image/:id` | Delete thumbnail by ID |
| POST | `/media/admin/add-video` | Upload a new video |
| DELETE | `/media/admin/delete-video/:id` | Delete video by ID |

> **Note:** Protected routes require JWT in header:  
> `Authorization: Bearer <token>`  

---

## 🧭 Application Routes (Frontend)

| Route | Purpose | Description |
|-----|--------|------------|
| `/` | 🏠 Home Page | Landing page showcasing portfolio |
| `/thumbnails` | 🖼️ Thumbnail Gallery | All thumbnail works displayed |
| `/videos` | 🎥 Video Portfolio | All videos displayed |
| `/about` | 📖 About | Designer / Editor bio |
| `/contact` | 📩 Contact | User contact form |
| `/admin` | 🔐 Login | Admin authentication page |
| `/admin/dashboard` | 🏠 Dashboard | Admin control panel |
| `/admin/dashboard/upload-image` | 🖼️ Upload Thumbnails | Form to upload images |
| `/admin/dashboard/upload-video` | 🎬 Upload Videos | Form to upload videos |

---

## 🔐 Admin Workflow

1. Navigate to `/admin`  
2. Enter admin credentials  
3. Access dashboard  
4. Perform actions:  
   - Upload / delete images  
   - Upload / delete videos  

✔️ Secure  
✔️ Dynamic  
✔️ Easy to manage  

---

## 📸 Why This Project?

- Designed for **real-world client portfolio needs**  
- Eliminates repetitive UI updates  
- Showcases **thumbnail & video management**  
- Demonstrates **full-stack MERN skills**  
- Clean separation of **user vs admin roles**  

---

## 🚧 Future Enhancements

- ☁️ Cloud storage for media (Cloudinary / AWS S3)  
- 📈 Admin dashboard analytics  
- 🎨 Improved UI/UX with animations  
- 🔐 Enhanced JWT authentication & role-based access  

---

## 👨‍💻 Developer

**Tanisha Trivedi**  
Full-Stack Developer (MERN)  
📌 Focused on building **creative & scalable web applications**  

---

⭐ If you like this project, don’t forget to give it a star!
