// File Module : fs module in node js
// CRUD operations : Create, Read, Update, Delete
// Create a file : writefile() and readfile()

const { log } = require("node:console");

const fs = require('fs');
fs.writeFile('myFile.txt', 'This is create command in fs using writeFile("filename","content", callback function for error)', (err) => {
    if (err) throw err;
    console.log('File created successfully!');
});

// Read a file : readFile()
const fs = require('fs');
fs.readFile('myFile.txt', 'UTF-8', (err) => {
    if (err) throw err;
    console.log("File read successfully!");
});