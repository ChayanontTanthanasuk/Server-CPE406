import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000"; // URL ของ Backend Server

const MQTTDataViewer = () => {
  const [message, setMessage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // สถานะการเลือกโหมด

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    // ฟัง Event 'mqtt_data'
    socket.on("mqtt_data", (data) => {
      console.log("Received data:", data);
      if (data) {
        setMessage(data); // อัปเดตข้อความใหม่ในกล่องเดียว
      }
    });

    // ปิดการเชื่อมต่อเมื่อ Component ถูกทำลาย
    return () => socket.disconnect();
  }, []);

  // ฟังก์ชันสำหรับสลับโหมดกลางวันกลางคืน
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${isDarkMode ? "from-gray-700 via-gray-800 to-gray-900" : "from-blue-500 via-blue-600 to-blue-700"} text-white py-4 px-8 rounded-lg shadow-lg mb-6`}>
        <h1 className="text-2xl font-bold">MQTT Messages Viewer</h1>
        <p className="text-sm opacity-80">
          Real-time data from MQTT broker displayed here.
        </p>
        {/* Switch for toggling dark mode */}
        <button 
          className="mt-2 bg-gray-600 text-white px-4 py-2 rounded-lg"
          onClick={toggleDarkMode}
        >
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* Message Display Box */}
      <div className={`bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <h2 className={`text-xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"} mb-4`}>Current Message</h2>
        {message ? (
          <div className={`border rounded-lg p-4 shadow-sm ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
            <p>
              <strong className={`${isDarkMode ? "text-blue-400" : "text-blue-500"}`}>Topic:</strong> {message.topic || "N/A"}
            </p>
            <p>
              <strong className={`${isDarkMode ? "text-blue-400" : "text-blue-500"}`}>Message:</strong> {message.message || "N/A"}
            </p>
            <p>
              <strong className={`${isDarkMode ? "text-blue-400" : "text-blue-500"}`}>Time:</strong> {new Date(message.receivedAt).toLocaleString()}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Waiting for new messages...
          </p>
        )}
      </div>
    </div>
  );
};

export default MQTTDataViewer;
