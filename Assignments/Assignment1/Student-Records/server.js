import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'students.json');

// Helper to read students from JSON file
async function readStudents() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const defaultData = [];
      await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    throw error;
  }
}

// Helper to write students to JSON file
async function writeStudents(students) {
  await fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2), 'utf-8');
}

// Helper to read request body stream
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body || body.trim() === '') return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        const error = new Error('Invalid JSON payload in request body');
        error.statusCode = 400;
        reject(error);
      }
    });
    req.on('error', err => reject(err));
  });
}

// Helper to send JSON responses
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

// Helper to send static files
async function sendStaticFile(res, filePath, contentType) {
  try {
    const content = await fs.readFile(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(content);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File Not Found');
  }
}

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  try {
    // REST API ENDPOINTS
    if (pathname.startsWith('/api/students')) {
      const students = await readStudents();
      const pathParts = pathname.split('/').filter(Boolean);
      let studentId = parsedUrl.searchParams.get('id');
      
      if (!studentId && pathParts.length === 3) {
        studentId = pathParts[2];
      }

      // GET /api/students or /api/students/:id
      if (req.method === 'GET') {
        if (studentId) {
          const student = students.find(s => String(s.id) === String(studentId));
          if (!student) {
            return sendJSON(res, 404, { success: false, message: 'Student record not found' });
          }
          return sendJSON(res, 200, { success: true, data: student });
        }
        return sendJSON(res, 200, { success: true, count: students.length, data: students });
      }

      // POST /api/students (Create Student)
      if (req.method === 'POST') {
        const body = await getRequestBody(req);
        const { rollNo, name, email, department, year, gpa, status } = body;

        if (!rollNo || !name || !email || !department) {
          return sendJSON(res, 400, {
            success: false,
            message: 'Validation Error: rollNo, name, email, and department are required'
          });
        }

        // Check rollNo uniqueness
        const existing = students.find(s => s.rollNo.toLowerCase() === rollNo.toLowerCase());
        if (existing) {
          return sendJSON(res, 400, { success: false, message: 'Student with this Roll Number already exists' });
        }

        const newId = students.length > 0 ? Math.max(...students.map(s => Number(s.id) || 0)) + 1 : 1;
        const newStudent = {
          id: newId,
          rollNo: String(rollNo).trim(),
          name: String(name).trim(),
          email: String(email).trim(),
          department: String(department).trim(),
          year: year || '1st Year',
          gpa: parseFloat(gpa) || 0.0,
          status: status || 'Active'
        };

        students.push(newStudent);
        await writeStudents(students);
        return sendJSON(res, 201, { success: true, message: 'Student added successfully', data: newStudent });
      }

      // PUT /api/students or /api/students/:id (Update Student)
      if (req.method === 'PUT') {
        const body = await getRequestBody(req);
        const targetId = studentId || body.id;

        if (!targetId) {
          return sendJSON(res, 400, { success: false, message: 'Student ID is required for updates' });
        }

        const index = students.findIndex(s => String(s.id) === String(targetId));
        if (index === -1) {
          return sendJSON(res, 404, { success: false, message: 'Student record not found' });
        }

        const current = students[index];
        const updatedStudent = {
          ...current,
          ...body,
          id: current.id, // ID remains immutable
          gpa: body.gpa !== undefined ? parseFloat(body.gpa) : current.gpa
        };

        students[index] = updatedStudent;
        await writeStudents(students);
        return sendJSON(res, 200, { success: true, message: 'Student updated successfully', data: updatedStudent });
      }

      // DELETE /api/students or /api/students/:id (Delete Student)
      if (req.method === 'DELETE') {
        const body = req.headers['content-type']?.includes('application/json') ? await getRequestBody(req).catch(() => ({})) : {};
        const targetId = studentId || body.id;

        if (!targetId) {
          return sendJSON(res, 400, { success: false, message: 'Student ID is required for deletion' });
        }

        const index = students.findIndex(s => String(s.id) === String(targetId));
        if (index === -1) {
          return sendJSON(res, 404, { success: false, message: 'Student record not found' });
        }

        const deletedStudent = students.splice(index, 1)[0];
        await writeStudents(students);
        return sendJSON(res, 200, { success: true, message: 'Student deleted successfully', data: deletedStudent });
      }

      return sendJSON(res, 405, { success: false, message: 'HTTP Method Not Allowed' });
    }

    // STATIC HTML & ASSET ROUTING
    if (pathname === '/' || pathname === '/index.html') {
      return await sendStaticFile(res, path.join(__dirname, 'index.html'), 'text/html');
    }

    if (pathname === '/style.css') {
      return await sendStaticFile(res, path.join(__dirname, 'style.css'), 'text/css');
    }

    // Default 404 Fallback
    sendJSON(res, 404, { success: false, message: 'Route not found' });

  } catch (error) {
    console.error('Server Request Error:', error.message);
    const statusCode = error.statusCode || 500;
    sendJSON(res, statusCode, { success: false, message: error.message });
  }
});

function startServer(portToTry) {
  server.listen(portToTry, () => {
    console.log(`===================================================`);
    console.log(`🎓 Student Records HTTP Server running!`);
    console.log(`🌐 Dashboard: http://localhost:${portToTry}`);
    console.log(`📡 REST API:  http://localhost:${portToTry}/api/students`);
    console.log(`===================================================`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy. Trying fallback port ${Number(PORT) + 1}...`);
    startServer(Number(PORT) + 1);
  } else {
    console.error('Server error:', err);
  }
});

startServer(PORT);

