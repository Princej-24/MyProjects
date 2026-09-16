const express = require("express");
const app = express();

const PORT = 5000;

app.use(express.json());

const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Phone", price: 20000 },
    { id: 3, name: "Headphones", price: 2000 },
    { id: 4, name: "Keyboard", price: 1500 },
    { id: 5, name: "Mouse", price: 800 },
    { id: 6, name: "Monitor", price: 12000 },
    { id: 7, name: "Printer", price: 9000 },
    { id: 8, name: "Tablet", price: 25000 },
    { id: 9, name: "Smartwatch", price: 5000 },
    { id: 10, name: "Speaker", price: 3000 },

    { id: 11, name: "Webcam", price: 2500 },
    { id: 12, name: "Microphone", price: 3500 },
    { id: 13, name: "Power Bank", price: 1200 },
    { id: 14, name: "USB Cable", price: 400 },
    { id: 15, name: "HDMI Cable", price: 600 },
    { id: 16, name: "SSD", price: 7000 },
    { id: 17, name: "Hard Disk", price: 5000 },
    { id: 18, name: "RAM", price: 3500 },
    { id: 19, name: "Graphics Card", price: 45000 },
    { id: 20, name: "Motherboard", price: 12000 },

    { id: 21, name: "Processor", price: 18000 },
    { id: 22, name: "CPU Cooler", price: 2500 },
    { id: 23, name: "Cabinet", price: 4000 },
    { id: 24, name: "Power Supply", price: 5000 },
    { id: 25, name: "Router", price: 2200 },
    { id: 26, name: "WiFi Adapter", price: 1000 },
    { id: 27, name: "Bluetooth Adapter", price: 700 },
    { id: 28, name: "Gaming Mouse", price: 1800 },
    { id: 29, name: "Gaming Keyboard", price: 3000 },
    { id: 30, name: "Gaming Headset", price: 3500 },

    { id: 31, name: "Game Controller", price: 2500 },
    { id: 32, name: "Joystick", price: 1800 },
    { id: 33, name: "Laptop Stand", price: 1200 },
    { id: 34, name: "Cooling Pad", price: 1500 },
    { id: 35, name: "Laptop Bag", price: 1800 },
    { id: 36, name: "Mobile Cover", price: 500 },
    { id: 37, name: "Screen Protector", price: 300 },
    { id: 38, name: "Mobile Charger", price: 1000 },
    { id: 39, name: "Wireless Charger", price: 1500 },
    { id: 40, name: "Earbuds", price: 2500 },

    { id: 41, name: "Smart TV", price: 40000 },
    { id: 42, name: "LED TV", price: 30000 },
    { id: 43, name: "Projector", price: 15000 },
    { id: 44, name: "Soundbar", price: 7000 },
    { id: 45, name: "DVD Player", price: 2500 },
    { id: 46, name: "Digital Camera", price: 35000 },
    { id: 47, name: "Tripod", price: 2000 },
    { id: 48, name: "Camera Bag", price: 2500 },
    { id: 49, name: "Memory Card", price: 1000 },
    { id: 50, name: "Card Reader", price: 500 },

    { id: 51, name: "Refrigerator", price: 35000 },
    { id: 52, name: "Washing Machine", price: 28000 },
    { id: 53, name: "Microwave Oven", price: 12000 },
    { id: 54, name: "Air Conditioner", price: 45000 },
    { id: 55, name: "Air Cooler", price: 9000 },
    { id: 56, name: "Electric Fan", price: 3000 },
    { id: 57, name: "Room Heater", price: 2500 },
    { id: 58, name: "Vacuum Cleaner", price: 8000 },
    { id: 59, name: "Electric Kettle", price: 1800 },
    { id: 60, name: "Toaster", price: 2000 },

    { id: 61, name: "Coffee Maker", price: 5000 },
    { id: 62, name: "Mixer Grinder", price: 4500 },
    { id: 63, name: "Induction Cooktop", price: 2500 },
    { id: 64, name: "Iron", price: 1800 },
    { id: 65, name: "Hair Dryer", price: 1500 },
    { id: 66, name: "Trimmer", price: 1800 },
    { id: 67, name: "Electric Shaver", price: 2500 },
    { id: 68, name: "Water Purifier", price: 12000 },
    { id: 69, name: "Air Purifier", price: 15000 },
    { id: 70, name: "Digital Weighing Scale", price: 1200 },

    { id: 71, name: "Office Chair", price: 7000 },
    { id: 72, name: "Study Table", price: 6000 },
    { id: 73, name: "Bookshelf", price: 5000 },
    { id: 74, name: "Table Lamp", price: 1200 },
    { id: 75, name: "Desk Organizer", price: 600 },
    { id: 76, name: "Notebook", price: 150 },
    { id: 77, name: "Pen Set", price: 200 },
    { id: 78, name: "Backpack", price: 1800 },
    { id: 79, name: "Water Bottle", price: 700 },
    { id: 80, name: "Lunch Box", price: 800 },

    { id: 81, name: "Football", price: 1200 },
    { id: 82, name: "Cricket Bat", price: 3500 },
    { id: 83, name: "Cricket Ball", price: 500 },
    { id: 84, name: "Tennis Racket", price: 2500 },
    { id: 85, name: "Badminton Racket", price: 1500 },
    { id: 86, name: "Basketball", price: 1300 },
    { id: 87, name: "Skipping Rope", price: 400 },
    { id: 88, name: "Yoga Mat", price: 1000 },
    { id: 89, name: "Dumbbells", price: 2500 },
    { id: 90, name: "Gym Bag", price: 1800 },

    { id: 91, name: "Bluetooth Speaker", price: 2200 },
    { id: 92, name: "Portable Fan", price: 900 },
    { id: 93, name: "LED Bulb", price: 300 },
    { id: 94, name: "Emergency Light", price: 1000 },
    { id: 95, name: "Torch", price: 500 },
    { id: 96, name: "Wall Clock", price: 800 },
    { id: 97, name: "Alarm Clock", price: 600 },
    { id: 98, name: "Extension Board", price: 900 },
    { id: 99, name: "Universal Adapter", price: 700 },
    { id: 100, name: "Smart Plug", price: 1200 }
];

app.get("/", (req, res) => {
    res.send("Product REST API Service");
});

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.get("/api/products/:id", (req, res) => {
    const product = products.find(
        p => p.id === parseInt(req.params.id)
    );

    if (!product) {
        return res.status(404).send("Product not found");
    }

    res.json(product);
});

app.listen(PORT, () => {
    console.log(`Product RestAPI Server running on port ${PORT}`);
});