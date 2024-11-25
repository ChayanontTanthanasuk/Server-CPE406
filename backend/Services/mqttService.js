const { getSocketIOInstance } = require('./socketService');
const mqtt = require('mqtt');
const temp = require('../Models/temperature/temperature');

const MQTT_BROKER_URL = 'mqtt://localhost:1883';
const mqttClient = mqtt.connect(MQTT_BROKER_URL);

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('message', (err) => {
        if (err) {
            console.error('Failed to subscribe:', err.message);
        } else {
            console.log('Subscribed to topic: message');
        }
    });
});

mqttClient.on('message', async (topic, message) => {
    console.log(`Received message from ${topic}: ${message.toString()}`);
    const receivedAt = new Date();

    try {
        const newUser = new temp({
            topic,
            message: message.toString(),
            receivedAt,
        });
        await newUser.save();
        console.log('Data saved to MongoDB:', newUser);

        // ส่งข้อมูลผ่าน Socket.IO
        const io = getSocketIOInstance();
        io.emit('mqtt_data', {
            topic,
            message: message.toString(),
            receivedAt,
        });
    } catch (error) {
        console.error('Error saving data to MongoDB:', error.message);
    }
});

module.exports = mqttClient;



