# 🩺 Care-Bridge: Telemedicine Made Simple

Care-Bridge is a modern, user-friendly telemedicine platform designed to connect patients with healthcare providers through secure, real-time virtual consultations. Whether you're managing chronic conditions, booking appointments, or just seeking professional medical advice, Care-Bridge bridges the gap between care and convenience.

---

## 🚀 Features

- 🧑‍⚕️ Doctor & Patient Registration/Login
- 📅 Book & Manage Appointments
- 📲 Secure Video Consultations
- 📝 Medical Notes and Prescriptions
- 🔐 Role-Based Access Control
- 🧾 Appointment History & Notifications
- 🌐 Fully Responsive Design for Desktop & Mobile

---

## 🛠️ Tech Stack

| Layer        | Technologies                                                  |
|--------------|---------------------------------------------------------------|
| **Frontend** | React, Tailwind CSS, Axios, React Router                      |
| **Backend**  | Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Cloudinary |
| **Auth**     | JSON Web Tokens (JWT), Bcrypt for Password Security           |
| **Storage**  | Cloudinary (Profile Images & Documents)                       |

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YourUsername/CareBridge.git
cd CareBridge
```

### 2. Backend Setup

```bash
cd Backend
npm start server
```


```env
MONGODB_URI=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
ADMIN_EMAIL=
ADMIN_PASSWORD=
JWT_SECRET=

Create a .env file in the backend directory and add your own environment variables.

```

Then run the backend server:

```bash
npm start server
```

### 3. Frontend Setup

```bash
cd ../frontend
npm run dev
```

The frontend will be served at `http://localhost:4000` by default.

---

## 📁 Project Structure

```
CareBridge/
│
├── admin/               # React frontend for admins
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── App.js
│
├── backend/               # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
│
├── frontend/               # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── App.js
└── README.md
```

---

## 👩‍⚕️ Roles & Permissions

### Patient
- Register and login
- Book appointments
- View appointment history

### Doctor
- Register and login
- View assigned appointments
- Write notes and upload prescriptions

### Admin *(optional future role)*
- Approve doctors
- View overall system stats

---

## 🔮 Roadmap

- [x] Doctor & Patient Login
- [x] Appointment Scheduling
- [x] Cloudinary Profile Uploads
- [ ] Live Video Call Integration
- [ ] Real-time Chat Between Doctor & Patient
- [ ] Payment Gateway Integration (e.g., Stripe)
- [ ] Analytics Dashboard

---

## 📸 Screenshots

Add screenshots of your UI here for better visual understanding.

---

## 🤝 Contributing

We welcome contributions from developers, designers, and healthcare professionals.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 🧑‍💻 Developed By

**Gift Lutho Kazi** — Founder & Lead Developer  
**Kazeq Technologies** — Development Partner

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for more info.

---

## 🌐 Contact & Links

📧 Email: info@carebridge.health  
🌍 Website: www.kazeq.co.za 
🐙 GitHub: [github.com/Lutho053/CareBridge](https://github.com/Lutho053/CareBridge)

---

> *Care-Bridge is committed to empowering access to healthcare through technology.*
