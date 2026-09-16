import http from "http";
import querystring from "querystring";
import fs from "fs";

const PORT = 3000;

const server = http.createServer((req, res) => {

    // DELETE STUDENT
    if (req.method === "GET" && req.url.startsWith("/deleteStudent")) {

        const url = new URL(req.url, `http://${req.headers.host}`);
        const roll = url.searchParams.get("roll");

        fs.readFile("students.json", "utf8", (err, data) => {

            if (err) {
                res.writeHead(500);
                res.end("Error reading file");
                return;
            }

            const students = JSON.parse(data);

            const updatedStudents = students.filter(
                (student) => student.roll !== roll
            );

            fs.writeFile(
                "students.json",
                JSON.stringify(updatedStudents, null, 2),
                (err) => {

                    if (err) {
                        res.writeHead(500);
                        res.end("Error deleting student");
                        return;
                    }

                    res.writeHead(302, {
                        "Location": "/students"
                    });

                    res.end();
                }
            );
        });

        return;
    }


    // DISPLAY ALL STUDENTS
    if (req.method === "GET" && req.url.startsWith("/students")) {

        fs.readFile("students.json", "utf8", (err, data) => {

            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Error reading students file");
                return;
            }

            const students = JSON.parse(data);

            const url = new URL(req.url, `http://${req.headers.host}`);
            const search = url.searchParams.get("search");

            let filteredStudents = students;

            if (search) {
                filteredStudents = students.filter((student) =>
                    student.name.toLowerCase().includes(search.toLowerCase())
                );
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            let html = `
                <html>
                <head>
                    <title>All Students</title>
                </head>
                <body>

                    <h1>All Students</h1>

                    <form method="GET" action="/students">

                        <input
                            type="text"
                            name="search"
                            placeholder="Enter student name"
                        >

                        <button type="submit">
                            Search
                        </button>

                    </form>

                    <br>

                    <table border="1" cellpadding="10">

                        <tr>
                            <th>Name</th>
                            <th>Roll Number</th>
                            <th>Course</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
            `;

            filteredStudents.forEach((student) => {

                html += `
                        <tr>

                            <td>${student.name}</td>

                            <td>${student.roll}</td>

                            <td>${student.course}</td>

                            <td>${student.email}</td>

                            <td>

                                <button
                                    onclick="deleteStudent('${student.roll}')"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>
                `;

            });

            html += `
                    </table>

                    <br>

                    <a href="/">
                        Go Back
                    </a>

                    <script>

                        function deleteStudent(roll) {

                            window.location.href =
                                "/deleteStudent?roll=" + roll;

                        }

                    </script>

                </body>
                </html>
            `;

            res.end(html);
        });

        return;
    }


    // ADD STUDENT
    if (req.method === "POST" && req.url === "/addStudent") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {

            const student = querystring.parse(body);

            console.log("Student:", student);

            fs.readFile("students.json", "utf8", (err, data) => {

                if (err) {
                    res.writeHead(500);
                    res.end("Error reading students file");
                    return;
                }

                const students = JSON.parse(data);

                students.push(student);

                fs.writeFile(
                    "students.json",
                    JSON.stringify(students, null, 2),
                    (err) => {

                        if (err) {
                            res.writeHead(500);
                            res.end("Error writing students file");
                            return;
                        }

                        res.writeHead(200, {
                            "Content-Type": "text/html"
                        });

                        res.end(`
                            <html>
                            <body>

                                <h1>Student Added Successfully!</h1>

                                <p>
                                    Student data has been saved.
                                </p>

                                <a href="/">
                                    Go Back
                                </a>

                            </body>
                            </html>
                        `);

                    }
                );

            });

        });

        return;
    }


    // HOME PAGE
    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.end(`
        <html>

        <head>

            <title>
                Student Record App
            </title>

        </head>

        <body>

            <h1>
                Welcome to Student Record App
            </h1>

            <h2>
                Student Registration Form
            </h2>

            <form method="POST" action="/addStudent">

                <label>
                    Student Name:
                </label>

                <input
                    type="text"
                    name="name"
                    required
                >

                <br><br>


                <label>
                    Roll Number:
                </label>

                <input
                    type="text"
                    name="roll"
                    required
                >

                <br><br>


                <label>
                    Course:
                </label>

                <input
                    type="text"
                    name="course"
                    required
                >

                <br><br>


                <label>
                    Email:
                </label>

                <input
                    type="email"
                    name="email"
                    required
                >

                <br><br>


                <button type="submit">
                    Add Student
                </button>

            </form>

            <br>

            <a href="/students">
                View All Students
            </a>

        </body>

        </html>
    `);
});


server.listen(PORT, () => {

    console.log(
        `Server is running at http://localhost:${PORT}`
    );

});