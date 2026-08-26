🩺 CareBridge — Digital Healthcare Platform

CareBridge is a modern digital healthcare platform designed to make it easier for patients to discover healthcare professionals, book appointments, and manage their healthcare journey online.

Built by Kazeq Technologies, CareBridge combines a responsive web experience with a scalable backend to connect patients and healthcare professionals through technology.

🚀 Features
👤 Patients
Patient registration and login
Secure authentication
Browse healthcare professionals
Search doctors by speciality
View doctor profiles
View doctor availability
Book appointments
Choose appointment times
Online payment support
Cash payment option
Medical aid payment option
Appointment history
Appointment cancellation
Responsive mobile experience
👨‍⚕️ Doctors
Doctor registration and login
Doctor profile management
View appointments
Manage appointment availability
View patient appointment information
Upload profile information and documents
🔐 Security
JWT-based authentication
Bcrypt password hashing
Role-based access
Protected API routes
Environment-based configuration
Cloudinary-based media storage
🛠️ Technology Stack
Layer	Technologies
Frontend	React, Vite, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Authentication	JWT, Bcrypt
HTTP Client	Axios
File Storage	Cloudinary
Payments	PayFast
Deployment	Vercel, Render
📦 Installation & Setup
1. Clone the Repository
git clone https://github.com/Lutho053/Care-Bridge.git
cd Care-Bridge
2. Backend Setup

Navigate to the backend directory:

cd backend
npm install

Create a .env file inside the backend directory.

Backend Environment Variables
MONGODB_URI=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=

MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASSWORD=

ADMIN_EMAIL=
ADMIN_PASSWORD=

JWT_SECRET=

FRONTEND_URL=
BACKEND_URL=

PAYFAST_MERCHANT_ID=
PAYFAST_MERCHANT_KEY=

Important: Never commit your .env file or real credentials to GitHub.

For local development, add your own development credentials to the .env file.

3. Start the Backend

From the backend directory:

npm start

The backend API normally runs on:

http://localhost:4000
4. Frontend Setup

Open another terminal and navigate to the frontend:

cd frontend
npm install
npm run dev

The frontend will normally be available at:

http://localhost:5173
🔑 Environment Variables

CareBridge uses environment variables to keep sensitive configuration outside of the source code.

Never commit:
.env
.env.local

The repository should only contain a safe example configuration such as:

.env.example

Example:

MONGODB_URI=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=

MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASSWORD=

ADMIN_EMAIL=
ADMIN_PASSWORD=

JWT_SECRET=

FRONTEND_URL=
BACKEND_URL=

PAYFAST_MERCHANT_ID=
PAYFAST_MERCHANT_KEY=

Do not place real passwords, API keys, database credentials, payment credentials, or private secrets in this repository.

📁 Project Structure
Care-Bridge/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
👥 User Roles
Patient

Patients can:

Create an account
Log in securely
Find healthcare professionals
Browse doctor specialities
View doctor profiles
View available appointment slots
Book appointments
Select a payment method
View appointments
Cancel appointments
Doctor

Doctors can:

Create an account
Log in securely
Manage their profile
Manage availability
View appointments
Manage patient appointments
Upload relevant documents
Administrator

The administration system is being developed to support:

Doctor management
User management
Appointment oversight
Platform statistics
Healthcare professional verification
💳 Payments

CareBridge integrates with PayFast for online payment processing.

The application currently supports payment integration for development and testing environments.

Payment credentials must be stored using environment variables and must never be committed to the repository.

☁️ Deployment

CareBridge is designed to support separate frontend and backend deployments.

Frontend

The React/Vite frontend can be deployed using:

Vercel

Backend

The Node.js/Express backend can be deployed using:

Render

Production environment variables should be configured through the deployment platform rather than committed to the repository.

🗺️ Roadmap
Completed
Patient registration and login
Doctor registration and login
Doctor profiles
Doctor speciality search
Appointment scheduling
Appointment management
Cloudinary image uploads
Responsive mobile interface
Online payment integration
Planned
Real-time video consultations
Doctor-patient messaging
Medical records
Prescription management
Healthcare analytics
Doctor verification system
Advanced notification system
Mobile application
Expanded healthcare provider integrations
📸 Screenshots

Screenshots of the CareBridge platform will be added here.

🤝 Contributing

Contributions are welcome from developers, designers, healthcare professionals, and other contributors interested in improving digital healthcare.

1. Create a feature branch
git checkout -b feature/your-feature
2. Make your changes

Implement and test your changes locally.

3. Commit your changes
git add .
git commit -m "Add your feature"
4. Push your branch
git push origin feature/your-feature
5. Open a Pull Request

Please provide a clear description of the changes made and why they are needed.

👨‍💻 Developed By
Gift Lutho Kazi

Founder & Lead Developer

Kazeq Technologies

Software development and technology partner.

CareBridge is being developed as part of Kazeq Technologies' mission to build practical technology solutions for businesses, healthcare providers, and communities.

📜 License

This project is licensed under the MIT License.

See the LICENSE file for more information.

🌐 Contact & Links
CareBridge

📧 Email: info@carebridge.health

🌍 Website: https://www.kazeq.co.za

🐙 GitHub: https://github.com/Lutho053/Care-Bridge

CareBridge is committed to using technology to make healthcare more accessible, convenient, and connected.
