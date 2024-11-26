const { getSocketIOInstance } = require('./socketService');
const mqtt = require('mqtt');
const HealthData = require('../Models/healthData/healthData');

const MQTT_BROKER_URL = 'mqtt://localhost:1883';
const mqttClient = mqtt.connect(MQTT_BROKER_URL);

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('iot/health', (err) => {
        if (err) {
            console.error('Failed to subscribe:', err.message);
        } else {
            console.log('Subscribed to topic: iot/health');
        }
    });
});

mqttClient.on('message', async (topic, message) => {
    if (!message) {
        console.error('Message is undefined or null');
        return;
    }

    try {
        const payload = JSON.parse(message.toString());
        if (payload.temperature && payload.heartRate) {
            const healthData = new HealthData({
                topic,
                temperature: parseFloat(payload.temperature),
                heartRate: parseInt(payload.heartRate, 10),
                receivedAt: new Date(),
            });
            await healthData.save();

            const io = getSocketIOInstance();
            io.emit('mqtt_data', healthData);
            console.log(healthData) // ส่งข้อมูลทั้งหมด
        } else {
            console.error('Invalid payload format:', payload);
        }
    } catch (error) {
        console.error('Error parsing message:', error.message);
    }
});


module.exports = mqttClient;