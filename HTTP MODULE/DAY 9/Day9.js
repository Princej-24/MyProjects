// status code for network 200: success, 404:pagenot found
// Practice routing using http module in nodejs

import http from "http";
const server = http.createServer((req,res) => {
res.writeHead(200, () => {
    console.log("connection established successfully");
});

if(req.url === "/") {
    res.end("<h1>This is home page</h1>");
}
else if(req.url === "/about") {
    res.end("<h1>This is about page</h1>");
}
else if(req.url === "/contact") {
    res.end("<h1>This is contact page</h1>");
}
// else {
//     res,writeHead(404, () => {
//         console.log("Page not found")
//     })
// }

})

server.listen(3001, () => {
    console.log("server is running on http://localhost:3001")
})