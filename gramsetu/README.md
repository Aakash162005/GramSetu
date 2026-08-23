# GramSetu 🌿

GramSetu is a comprehensive Digital Panchayat platform designed to bridge the gap between village administration (Gram Panchayat) and citizens. It digitizes essential village services, streamlines complaint management, and keeps citizens informed about local news and schemes.

## 🚀 Key Features

### For Citizens
* **Secure Authentication**: Robust signup and login system using bcrypt password hashing to protect citizen data.
* **Citizen Dashboard**: A personalized space to track your complaints, view active schemes, and manage your profile.
* **Lodge Complaints**: Easily submit grievances or requests directly to the panchayat administration.
* **Village News Feed**: Stay up-to-date with a timeline of daily work progress, complaint resolutions, and general village news.
* **Schemes & Notices Directory**: Browse through all active government schemes, check eligibility criteria, and read official notices.

### For Administrators
* **Admin Dashboard**: An exclusive overview metrics panel displaying total citizens, active schemes, and active notices.
* **User Management**: Easily monitor registered citizens and block/unblock accounts to moderate the platform.
* **News Publisher**: Post real-time updates directly to the Village News feed, categorizing them visually as "Work Progress", "Complaint Solution", or "News".

## 🛠️ Technology Stack

* **Frontend**: Next.js (App Router), React, Tailwind CSS (for modern, responsive styling), Lucide React (for icons)
* **Backend**: Next.js API Routes
* **Database**: PostgreSQL
* **ORM**: Prisma Client (using `@prisma/adapter-pg`)
* **Security**: `bcryptjs` (for password hashing and secure authentication)

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js (v20+ recommended) and a PostgreSQL database running.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aakash162005/GramSetu.git
   cd GramSetu/gramsetu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `gramsetu` directory and add your PostgreSQL connection string:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/gramsetu"
   ```

4. **Sync the Database Schema:**
   Push the Prisma schema to your database and generate the client:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👑 Managing Admins

By default, all new signups are regular "citizen" accounts. To access the Admin Panel, you must promote an account using the included script.

1. Sign up on the website with your phone number.
2. In your terminal, run the following command with your phone number:
   ```bash
   node --env-file=.env promoteToAdmin.js <YOUR_PHONE_NUMBER>
   ```
3. Refresh your browser, and the **Admin Panel** link will appear in your navigation bar!

---
*Developed to empower rural digitalization.*
