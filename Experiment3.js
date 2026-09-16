import http from "http";

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain",
        "X-Powered-By": "Node.js"
    });

    res.end("Hello World");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});