# 🎓 Academic Student Portal & Records System (Assignment 1)

An enhanced full-stack web application built with **Node.js HTTP Server**, custom **REST API**, file-based **JSON Database** (`students.json`), and an **Interactive Dashboard UI** (`index.html`).

---

## 🌟 Key Features

1. **Custom Node.js HTTP Server (`server.js`)**:
   - Built using native Node.js `http`, `fs`, and `path` modules without express or third-party web frameworks.
   - Dynamic MIME type handling for HTML, CSS, JSON, and CSV endpoints.
   - CORS support for cross-origin requests.

2. **RESTful JSON & Analytics API**:
   - `GET /api/students`: Fetch all student records with backend search (`?search=`), filtering (`?department=`, `?standing=`, `?status=`), and sorting (`?sort=gpa|attendance|name|rollNo&order=asc|desc`).
   - `GET /api/students/:id`: Fetch a specific student record by ID.
   - `GET /api/students/stats`: Fetch real-time aggregated metrics (total count, avg GPA, avg attendance %, Dean's list count, at-risk count, and department breakdown).
   - `GET /api/students/export`: Dynamic CSV exporter for downloading records directly.
   - `POST /api/students`: Add a new student record (with validation, auto-generated ID, and auto-derived standing).
   - `PUT /api/students/:id`: Update an existing student record.
   - `DELETE /api/students/:id`: Delete a student record.

3. **Rich Data Model (`students.json`)**:
   - Student Roll Number, Full Name, Email Address, Department, Academic Year.
   - **GPA & Academic Standing** (Dean's List, Good Standing, Academic Warning).
   - **Attendance Tracking** (Percentage & visual progress bars with low-attendance warnings).
   - **Enrolled Courses** (List of courses).
   - **Fee Payment Status** (Paid / Pending).

4. **Responsive Frontend Dashboard (`index.html`)**:
   - 5 Real-Time KPI Analytics Cards (Total Students, Class Avg GPA, Avg Attendance, Dean's List Scholars, At-Risk Warning count).
   - Interactive table header sorting (Roll Number, Name, GPA, Attendance).
   - Multi-criteria Filtering (Search by query, filter by Department, filter by Academic Standing / At-Risk).
   - Direct CSV Export button.
   - Modal Form with client-side validation for Adding & Editing records.

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
