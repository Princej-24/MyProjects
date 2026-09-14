# 🎓 Student Records Management System (Assignment 1)

A full-stack web application built with **Node.js HTTP Server**, custom **REST API**, file-based **JSON Database** (`students.json`), and an **Interactive Web UI** (`index.html`).

---

## 🌟 Key Features

1. **Custom Node.js HTTP Server (`server.js`)**:
   - Built using native Node.js `http`, `fs`, and `path` modules without third-party web frameworks.
   - Dynamic MIME type handling for HTML, CSS, and JSON endpoints.
   - CORS support for cross-origin client requests.

2. **RESTful JSON API**:
   - `GET /api/students`: Fetch all student records.
   - `GET /api/students/:id`: Fetch a specific student record by ID.
   - `POST /api/students`: Add a new student record (saves to `students.json`).
   - `PUT /api/students/:id`: Update an existing student record (saves to `students.json`).
   - `DELETE /api/students/:id`: Delete a student record (updates `students.json`).

3. **Persistent Data Storage (`students.json`)**:
   - Automatically initializes dataset if missing.
   - Real-time file read/write synchronization for all CRUD operations.

4. **Responsive Frontend Dashboard (`index.html`)**:
   - Real-time Analytics Cards (Total Students, Average GPA, Active Status, Departments).
   - Live Search & Department Filter dropdown.
   - Modal Form with client-side validation for Adding & Editing records.
   - Instant UI update & Toast notifications.

---

## 🚀 Quick Start Guide

### Step 1: Start the HTTP Server
Run the following command inside `Assignments/Assignment1/Student-Records`:

```bash
node server.js
```

or using NPM:

```bash
npm start
```

### Step 2: Open in Browser
Visit the following URL in your web browser:

👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📂 Project Structure

```
Assignments/Assignment1/Student-Records/
├── index.html       # Responsive Dashboard & Interactive UI
├── server.js        # Node.js HTTP Server & REST API implementation
├── server.cjs       # CommonJS launcher wrapper
├── students.json    # Persistent JSON Database
├── package.json     # Node.js Project Configuration
└── README.md        # Documentation
```
