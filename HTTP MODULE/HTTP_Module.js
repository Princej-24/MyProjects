// Create your own server using http module
import http from "http";
const server = http.createServer((request, response) => {
    response.writeHead(200,{"content-type":"text/plain"});
    response.write("<h1>This is my own server</h1>");
    response.write("Hello World");
    response.end();
})
server.listen(3000, () => {
    console.log("Server is running on port 3000")
})