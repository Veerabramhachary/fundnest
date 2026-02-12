
---

# 💰 FundNest

**FundNest** is a full-stack MERN application designed to help users efficiently track expenses, manage subscriptions, and monitor budgets in one centralized dashboard.

It provides powerful analytics, alerts, and secure authentication to give users complete control over their financial activities.

---

## 🚀 Live Demo

> *(Add your deployed frontend/backend links here if available)*

---

## 📌 Features

### 🔐 Authentication & Security

* JWT-based authentication
* Secure HTTP-only cookies
* Password hashing using **bcryptjs**
* Persistent login support
* Logout functionality
* Email notifications using **Nodemailer**

---

### 💸 Expense Tracker

* ➕ Add expenses
* 📖 View all expenses
* ✏️ Update expenses
* ❌ Delete expenses
* Categorized expense management
* Expense history tracking

---

### 🔄 Subscription Management

* ➕ Add subscriptions
* 📖 View subscriptions
* ✏️ Update subscription details
* ❌ Delete subscriptions
* Track renewal dates
* Upcoming subscription alerts

---

### 📊 Budget Management

* Set monthly budgets
* Track spending against budget
* Visual budget utilization

---

### 📈 Dashboard (Central Hub)

* Financial overview at a glance
* Charts & data visualizations
* Spending trends
* Subscription summaries
* Budget progress indicators

---

### 📑 Reports Page

* Detailed expense reports
* Subscription summaries
* Monthly breakdown analysis

---

### 🔔 Alerts & Notifications

* Budget limit warnings
* Upcoming subscription reminders
* Email alerts

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **Vite**
* **Chakra UI v3**
* **Axios**
* **Zustand** (State Management)
* **TypeScript**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **JWT (Authentication)**
* **bcryptjs**
* **Nodemailer**
* **Cookies (HTTP-only authentication)**

---

## 🏗️ Project Structure

```
FundNest/
│
├── client/        # Frontend (React + Vite)
│   ├── src
│       ├── components/
│       ├── pages/
│       ├── store/     # Zustand store
│       └── services/  # Axios API handlers
│
├── server/        # Backend (Node + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── lib/
│   └── config/
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/FundNest.git
cd FundNest
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_ACCESS_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_email
SMTP_PASS=your_email_password
SMTP_FROM=your_email_name
```

Run the backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Authentication Flow

1. User registers/logs in
2. Backend generates JWT
3. JWT stored in HTTP-only cookies
4. Protected routes verified via middleware
5. Logout clears cookies

---

## 📊 Future Improvements

* Multi-currency support
* Export reports (PDF/CSV)
* Dark/Light theme toggle
* Advanced financial analytics
* Mobile responsive improvements

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Veera Bramha Chary**
Full Stack MERN Developer

