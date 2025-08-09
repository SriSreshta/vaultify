

```markdown
# AGENTS.md – Vaultify AI Project Guide

## Project Summary
Vaultify is a secure file storage & sharing platform with encryption, built using the MERN stack.
- **Auth:** JWT-based signup/login.
- **File Handling:** AES encryption (CryptoJS) before storage, MongoDB GridFS for large file handling.
- **Frontend:** React + Tailwind CSS for UI.
- **Backend:** Node.js (Express) with MongoDB Atlas connection.
- **Core Actions:** Upload, encrypt, store, list, download (with decrypt), delete.
- **Deployment:** Frontend on Vercel, backend on Render/Railway, DB on MongoDB Atlas.

## Folder Structure
```

vaultify/
├── backend/
│   ├── server.js                # Entry point
│   ├── config/db.js              # MongoDB connection
│   ├── middleware/authMiddleware.js
│   ├── models/userModel.js
│   ├── routes/authRoutes.js
│   ├── routes/fileRoutes.js
│   └── uploads/                  # Optional temp storage
└── frontend/
├── src/
│   ├── App.jsx
│   ├── index.js
│   ├── pages/Login.jsx
│   ├── pages/Signup.jsx
│   ├── pages/Dashboard.jsx
│   ├── components/Navbar.jsx
│   ├── components/FileUpload.jsx
│   ├── components/FileList.jsx
│   ├── components/FileItem.jsx
│   └── utils/api.js

```

## Environment Variables
**Backend (.env)**
```

MONGO\_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/vaultify
JWT\_SECRET=\<random\_generated\_secret>
PORT=5000

```

**Frontend (.env)**
```

REACT\_APP\_API\_BASE\_URL=[http://localhost:5000](http://localhost:5000)

```
(Change to deployed backend URL in production.)

## Development Guidelines
1. **Encryption Flow:**
   - Encrypt file in the browser using CryptoJS AES before sending to backend.
   - Store encryption key securely in user’s session (not in DB).
2. **File Upload:**
   - Use Multer for handling uploads in Express.
   - Store metadata (name, size, upload date, owner ID) in `files` collection.
3. **Security:**
   - All file routes should require valid JWT.
   - CORS enabled for frontend-backend communication.
4. **Download Flow:**
   - Fetch encrypted file from backend, decrypt client-side before saving locally.
5. **Delete Flow:**
   - Remove file from GridFS and metadata from DB.

## Deployment Targets
- **Frontend:** Vercel
- **Backend:** Render / Railway
- **Database:** MongoDB Atlas

## Jules Instructions
- Always check `AGENTS.md` before coding.
- Follow existing folder structure and naming conventions.
- Keep code modular (e.g., separate routes, middleware, and config).
- After implementing a feature, confirm it works end-to-end (frontend ↔ backend ↔ DB).
- When deploying, ensure all `.env` values are set in the hosting environment.
```


