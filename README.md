# Coding Challenge

A single-page web application built using Angular and Node.js, demonstrating role-based authentication, API integration, asynchronous processing, and admin user management.

## Features

* Login with User ID, password, and role
* General User and Admin roles
* Role-based record access
* Records displayed through REST API
* Configurable API delay with loading state
* Admin user management: Add, Edit, Delete
* Angular route guard for admin access
* XML-based data storage
* Modular Angular services

## Tech Stack

* **Frontend:** Angular, TypeScript, HTML, CSS
* **Backend:** Node.js, Express.js
* **Storage:** XML
* **Tools:** Git, GitHub, Postman

## Project Structure

```text
app/
├── backend/
│   ├── data/
│   ├── routes/
│   ├── services/
│   └── server.js
├── frontend/
│   └── src/
│       └── app/
├── README.md
└── .gitignore
```

## How to Run

### Backend

```bash
cd backend
npm install
node server.js
```

Runs at `http://localhost:3000`

### Frontend

In a new terminal:

```bash
cd frontend
npm install
ng serve
```

Open `http://localhost:4200`

## Demo Credentials

**Admin**

```text
User ID: admin
Password: admin123
Role: Admin
```

**General User**

```text
User ID: devapriya
Password: password123
Role: General User
```

## API Endpoints

```text
POST   /api/auth/login
GET    /api/records
GET    /api/users
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

The records API supports a `delay` parameter to simulate delayed API responses and demonstrate asynchronous processing.
