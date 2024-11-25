import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:4000'; // URL ของ Backend Server

const MQTTDataViewer = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // เชื่อมต่อกับ Socket.IO Server
        const socket = io(SOCKET_SERVER_URL);

        // ฟัง Event 'mqtt_data'
        socket.on('mqtt_data', (data) => {
            console.log('Received data:', data);
            setMessages((prev) => [...prev, data]);
        });

        // ปิดการเชื่อมต่อเมื่อ Component ถูกทำลาย
        return () => socket.disconnect();
    }, []);

    return (
        <div>
            <h1>MQTT Messages</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>Topic:</strong> {msg.topic}, <strong>Message:</strong> {msg.message}, <strong>Time:</strong> {new Date(msg.receivedAt).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MQTTDataViewer;






