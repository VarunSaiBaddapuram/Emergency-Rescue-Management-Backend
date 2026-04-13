# 🚨 Emergency Response Alert System - Backend

A robust, enterprise-grade Node.js backend built with TypeScript, designed to coordinate emergency SOS alerts and manage relief logistics with high precision and reliability.

## 🚀 Core Features

- **Intelligent SOS Routing**: Real-time geolocation processing using the **Haversine formula** to identify the nearest 3-5 relief centers within a configurable radius (default 30km).
- **Automated Alert System**: Multi-channel emergency notifications via Nodemailer with rich HTML templates, visual alerts, and audio notification links.
- **Fail-Safe Mechanisms**: Integrated fallback email routing ensuring no SOS alert is dropped if nearby centers are unavailable.
- **Rate Limiting & Safety**: Built-in 60-second cooldown per user/IP to prevent emergency channel spamming.
- **Role-Based Access Control (RBAC)**: Secure management of Admin, Relief Center, and Collection Center roles using JWT authentication.
- **Weather Integration**: Dynamic weather data injection into emergency reports for responders.

## 📊 System Flow: SOS Request Lifecycle

The system utilizes a structured service-oriented architecture to process emergency requests:

1. **Trigger**: Frontend sends a `POST /sos/send` request containing User Coordinates, Weather, and a custom message.
2. **Identification**: The **SOS Controller** extracts the requester's identity (UserId or IP) and passes the payload to the **SOS Service**.
3. **Validation**: The Service enforces a **60-second cooldown** and fetches all active relief centers from the database.
4. **Distance Matrix**: The system calculates the distance between the user and every center using the **Haversine Formula**.
5. **Selection**: Centers are filtered by `MAX_DISTANCE_KM` and sorted. The top `MAX_ALERTS` (nearest) centers are selected.
6. **Parallel Dispatch**: The system triggers parallel email notifications to all selected centers using `Promise.allSettled` to maximize delivery resilience.
7. **Fallback (If needed)**: If zero centers are within range, the system automatically redirects the alert to the global `EMAIL_FALLBACK` address.
8. **Summary**: A detailed delivery report (sent/failed counts) is returned to the requester.

## 🛠️ Tech Stack

- **Runtime**: Node.js & TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Email Delivery**: Nodemailer (SMTP)
- **Logging**: Pino & Pino-HTTP
- **Authentication**: JWT (JSON Web Tokens) & BcryptJS

## ⚙️ Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
AGENCY_KEY=india1

# SOS Email Configuration
EMAIL_USER=your_smtp_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FALLBACK=fallback_emergency@gmail.com

# Dynamic SOS Logic Tuning
MAX_DISTANCE_KM=30
MAX_ALERTS=5
```

## 🛠️ Installation & Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

## 📡 API Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/user/signup` | Create a new user/agency account |
| `POST` | `/user/signin` | Authenticate and receive JWT |
| `POST` | `/sos/send` | Trigger a distance-based SOS alert |
| `GET` | `/relief/reliefcenters` | List all available relief centers |
| `POST` | `/relief/addreliefcenter` | Add a new relief center (Protected) |

---
*Developed for rapid emergency coordination and relief management.*
