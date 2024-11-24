const mqtt = require('mqtt');
const temp = require('../Models/temperature/temperature')



// URL ของ MQTT Broker
const MQTT_BROKER_URL = 'mqtt://localhost:1883';

// สร้าง Client สำหรับเชื่อมต่อ MQTT
const mqttClient = mqtt.connect(MQTT_BROKER_URL);

// เมื่อเชื่อมต่อ MQTT สำเร็จ
mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Subscribe ไปยัง topic 'message'
    const TOPIC = 'message'; // ชื่อ Topic ที่ต้องการ
    mqttClient.subscribe(TOPIC, (err) => {
        if (err) {
            console.error(`Failed to subscribe to topic "${TOPIC}":`, err.message);
        } else {
            console.log(`Subscribed to topic: ${TOPIC}`);
        }
    });
});

// เมื่อได้รับข้อความจาก MQTT
mqttClient.on('message', async (topic, message) => {
    console.log(`Received message from ${topic}: ${message.toString()}`);
    
    // กำหนดเวลาที่ได้รับข้อมูล (เวลาปัจจุบัน)
    const receivedAt = new Date();

    try {
        // บันทึกข้อมูลลง MongoDB
        const newUser = new temp({
            topic,
            message: message.toString(),
            receivedAt,
        });

        await newUser.save();  // ใช้ await เพื่อให้การบันทึกเสร็จก่อนที่จะตอบกลับ
        console.log('Data saved to MongoDB:', newUser);

        // ส่งข้อมูลตอบกลับไปยัง Client (Express)
        // หากต้องการส่งให้ client ที่ส่งคำขอ HTTP มาทาง server (แต่การใช้ mqtt client จะไม่มี res ให้ใช้ในที่นี้)
        // res.send('Register Success');  // ใช้ในกรณีที่อยู่ใน route ของ Express
    } catch (error) {
        console.error('Error saving data to MongoDB:', error.message);
    }
});

// Export Client
module.exports = mqttClient;


