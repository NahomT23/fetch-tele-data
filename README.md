# 🛍️ E-Commerce Platform with Telegram Bot Integration

A powerful and user-friendly e-commerce platform built with **React**, **TypeScript**, **Express**, **Node.js**, **Stripe**, **Tailwind CSS**, **Redux**, **Cloudinary**, **Firebase**, and the **Telegram Bot API**. 

This project allows store owners to manage products, process purchases, and sync data **seamlessly between a web platform and Telegram** — offering a flexible, real-time management experience.

---

## ✨ Features

### 🤖 Telegram Bot Integration
- Perform full **CRUD operations** (Create, Read, Update, Delete) on product listings directly from Telegram.
- Changes made via Telegram are automatically synced with the website.
- Choose whether to post products **only on the website** or **both the website and a Telegram channel**.

### 🔄 Real-Time Synchronization
- Edit or delete a product in Telegram, and the changes reflect instantly on the web app (and vice versa).
- Achieve **bi-directional syncing** between platforms for a cohesive management experience.

### 🖼️ Cloudinary for Image Management
- Efficient image storage and delivery using **Cloudinary**.
- Automatic resizing and optimized performance across devices.

### 💳 Secure Stripe Payments
- Integrated with **Stripe** for smooth and secure checkouts.
- Upon a successful transaction, the store owner receives an instant Telegram message with purchase details.

### 📲 Real-Time Telegram Notifications
- Get immediate alerts when a customer completes a purchase.
- Notifications include buyer info and purchased items — right in Telegram!

### 🧠 State Management with Redux
- Manage application state and shopping cart logic cleanly and efficiently.
- Enables responsive, real-time updates for a fluid UX.

### 🔥 Firebase Database
- Scalable, real-time data storage using **Firebase**.
- Ideal for storing user details, orders, and product info reliably.

### 🛡️ Built with TypeScript
- Strongly typed for better **code quality**, **error prevention**, and **maintainability**.

### 📱 Responsive UI with Tailwind CSS
- Clean, modern design that adapts beautifully to mobile and desktop screens.
- Fast, utility-first styling for maximum customizability.

---

## 📁 Project Structure

```
root/
│
├── frontend/
│   └── botCommerce/     # Frontend codebase
│
├── backend/                 # Express + Node backend
│   └── (routes, controllers, services, etc.)
```

---

## 🔐 Environment Variables

Make sure to configure the following environment variables for the backend to work correctly:

| Variable               | Description                                |
|------------------------|--------------------------------------------|
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name                |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                        |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret                     |
| `STRIPE_SECRET_KEY`     | Stripe secret key for processing payments |
| `CHAT_ID`               | Telegram chat ID for sending notifications |
| `WEBHOOK_URL`           | Telegram bot webhook URL                  |
| `CLIENT_URL`            | URL of the frontend client                |
| `BOT_TOKEN`             | Telegram bot token                        |
| `PORT`                  | Backend server port                       |

---

## 🚀 Getting Started

1. **Clone the repo:**

```bash
git clone https://github.com/NahomT23/fetch-tele-data.git
```

2. **Install dependencies for frontend and backend:**

```bash
cd frontend/botCommerce
npm install

cd ../../backend
npm install
```

3. **Configure your `.env` file** in the `backend` directory with the variables listed above.

4. **Start the development servers:**

```bash
# In frontend directory
npm run dev

# In backend directory
npm run dev
```

---
