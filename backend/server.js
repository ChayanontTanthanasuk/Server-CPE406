const express = require('express');
const { readdirSync } = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); // เพิ่มการนำเข้า HTTP
const connectDB = require('./Config/db');
const { initializeSocketIO } = require('./Services/socketService');
require('./Services/mqttService'); // เรียกใช้งาน MQTT Service

const app = express();

// สร้าง HTTP Server
const server = http.createServer(app);

// เชื่อมต่อฐานข้อมูล
connectDB();

// เริ่มต้น Socket.IO
initializeSocketIO(server);

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '10mb' }));

const corsOptions = {
    origin: 'http://localhost:3000', // URL ของ Frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Methods ที่อนุญาต
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers ที่อนุญาต
};
app.use(cors(corsOptions)); // เปิดใช้งาน CORS

// โหลด routes ทั้งหมดจากโฟลเดอร์ Routes
readdirSync('./Routes/').map((route) => {
    app.use('/api', require(`./Routes/${route}`));
});

// เริ่มต้น Server
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
