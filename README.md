# MERN Full Stack App with Google OAuth Authentication

This is a full-stack web application built using the **MERN** stack — **MongoDB**, **Express**, **React (Next.js)**, and **Node.js** — with Google OAuth login via NextAuth.js. It supports secure authentication, password reset, email notifications, and MongoDB Atlas database integration.

---

✅ Features Implemented

- [x] User Registration and Login
- [x] Google OAuth 2.0 Authentication (NextAuth.js)
- [x] Secure Session Management using JWT
- [x] Password Reset via Email Token
- [x] SMTP-based email alerts (Ethereal test SMTP)
- [x] Admin alert email setup
- [x] Environment-based configuration using `.env.local`
- [x] Full deployment setup with Vercel
- [x] MongoDB Atlas integration with connection security

---

⚙️ Technologies Used

- **Frontend:** Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Authentication:** NextAuth.js (Google OAuth strategy)
- **Backend API:** Next.js API routes
- **Database:** MongoDB Atlas (Cloud NoSQL DB)
- **Email System:** Nodemailer with Ethereal SMTP
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (for hosting)

---

📁 Folder Structure
full-stack-app/
├── public/ # Public assets
├── src/
│ ├── app/
│ │ ├── api/ # API route handlers
│ │ │ ├── auth/ # NextAuth API configuration
│ │ │ ├── reset/ # Password reset endpoints
│ │ ├── login/ # Login UI page
│ │ ├── register/ # Registration page
│ │ ├── reset/ # Password reset pages
│ ├── components/ # Reusable React components
│ ├── lib/ # Utility functions and DB connection
│ ├── styles/ # Tailwind CSS setup
├── .env.local # Environment config (not committed)
├── next.config.js # Next.js configuration
├── tailwind.config.ts # Tailwind configuration
├── postcss.config.mjs # PostCSS configuration
├── package.json # NPM scripts and dependencies


🧪 Getting Started Locally

1. Clone the Repo

```bash
git clone https://github.com/your-username/MERN_Project.git
cd MERN_Project

2. Install Dependencies
npm install

3. Set Up .env.local
Create a .env.local file in the root with the following:

.env.local
MONGODB_URI=your-mongodb-uri
NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SMTP_SERVER=smtp.ethereal.email
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
ADMIN_ALERT_EMAIL=admin@example.com


4. Run the App

npm run dev
Go to http://localhost:3000 in your browser.

🚀 Deploying to Vercel
Push the project to GitHub.

Visit https://mern-project-bav1.vercel.app/
https://github.com/nidhipatel2910/MERN_Project

Set the environment variables in the Vercel dashboard.


