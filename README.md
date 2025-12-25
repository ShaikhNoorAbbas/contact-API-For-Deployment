# 📞 Contact Management API

A robust Backend REST API built with the **MERN Stack** (Node.js, Express, MongoDB) to manage user contacts. This application demonstrates essential backend concepts including JWT Authentication, Protected Routes, and CRUD operations.

**Live Deployment:** [Add your Render Link Here]

## 🚀 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JWT (JSON Web Tokens) & Bcrypt
* **Deployment:** Render

---

## 🔗 API Endpoints

### 🔐 User Authentication
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/users/register` | Register a new user | ❌ No |
| **POST** | `/api/users/login` | Login user & get Access Token | ❌ No |
| **GET** | `/api/users/current` | Get current user info | ✅ Yes |

### 📇 Contact Management
*All contact routes are protected and require a valid Bearer Token.*

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/contacts` | Get all contacts for the logged-in user | ✅ Yes |
| **POST** | `/api/contacts` | Create a new contact | ✅ Yes |
| **GET** | `/api/contacts/:id` | Get a specific contact by ID | ✅ Yes |
| **PUT** | `/api/contacts/:id` | Update a contact | ✅ Yes |
| **DELETE** | `/api/contacts/:id` | Delete a contact | ✅ Yes |

---
