# 🌱 Plant Store

A **full-stack plant store web app** built with **Next.js (App Router)**, **MongoDB**, and **TailwindCSS**.
This project allows users to explore a collection of plants, view details, and manage plant data via APIs.

🚀 Live Demo: [Plant Store on Vercel](https://urvann-plant-store-nine.vercel.app/)

---

## 📂 Project Structure

```
plant-store/
│── app/
│   ├── api/
│   │   ├── plants/
│   │   │   ├── [id]/route.js   # API for single plant (GET, PUT, DELETE)
│   │   │   └── route.js        # API for all plants (GET, POST)
│   │   └── seed/route.js       # API to seed initial data
│   ├── globals.css             # Global styles
│   ├── layout.js               # Root layout
│   └── page.js                 # Homepage
│
│── lib/
│   └── mongodb.js              # MongoDB connection helper
│
│── models/
│   └── Plant.js                # Mongoose Plant schema/model
│
│── public/                     # Static assets (icons, images, etc.)
│── .env                        # Environment variables (Mongo URI, etc.)
│── package.json                # Dependencies
│── tailwind.config.js          # TailwindCSS config
│── README.md                   # Documentation
```

---

## ⚡ Features

* 🏡 Homepage displaying available plants.
* 🌱 **CRUD APIs** with Next.js App Router (`/api/plants`).
* 🛠 **Seed API** to populate database with initial plant data.
* 🗂 **MongoDB + Mongoose** integration.
* 🎨 Styled with **TailwindCSS** for a clean and responsive UI.
* 📱 Mobile-friendly layout.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 13+ (App Router)](https://nextjs.org/)
* **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
* **Styling**: [TailwindCSS](https://tailwindcss.com/)
* **Deployment**: [Vercel](https://vercel.com/)

---

## ▶️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/plant-store.git
cd plant-store
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your-mongodb-uri
```

### 4️⃣ Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment

The app is deployed on **Vercel**.

* Frontend & API routes run seamlessly in the same project.
* Add `MONGODB_URI` as an Environment Variable in Vercel dashboard.

Live: [Plant Store](https://urvann-plant-store-nine.vercel.app/)

---

## 📌 API Routes

| Endpoint           | Method | Description               |
| ------------------ | ------ | ------------------------- |
| `/api/plants`      | GET    | Get all plants            |
| `/api/plants`      | POST   | Add a new plant           |
| `/api/plants/[id]` | GET    | Get a single plant by ID  |
| `/api/plants/[id]` | PUT    | Update plant details      |
| `/api/plants/[id]` | DELETE | Delete a plant            |
| `/api/seed`        | POST   | Seed initial data into DB |

---

## 📌 Future Improvements

* 🔎 Search & filter functionality.
* 🛒 Cart & checkout system.
* 👤 User authentication (login/register).
* ⭐ Ratings & reviews for plants.

