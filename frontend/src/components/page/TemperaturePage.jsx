import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom"

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

  // ฟังก์ชันสำหรับการเลือก emoji ตามค่า temperature
  const getTemperatureEmoji = (temperature) => {
    if (temperature < 20) return "❄️"; // อุณหภูมิต่ำกว่า 20 °C
    if (temperature < 30) return "🌡️"; // อุณหภูมิ 20–30 °C
    return "🔥"; // อุณหภูมิสูงกว่า 30 °C
  };

  // ฟังก์ชันสำหรับการเลือก emoji ตามค่า heart rate
  const getHeartRateEmoji = (heartRate) => {
    if (heartRate < 60) return "💓"; // ต่ำกว่า 60 BPM
    if (heartRate < 80) return "❤️"; // 60–80 BPM
    return "💨"; // อัตราการเต้นหัวใจสูงกว่า 80 BPM
  };

  // ฟังก์ชันสำหรับการเลือก emoji ตามเวลา
  const getTimeEmoji = (time) => {
    const hours = new Date(time).getHours();
    return hours < 6 || hours > 18 ? "🌙" : "🌞"; // ถ้าเวลาหลัง 6 PM หรือก่อน 6 AM ใช้ 🌙
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"} p-8 transition-all`}>
      {/* Header */}
      <div className={`flex justify-between items-center bg-gradient-to-r ${isDarkMode ? "from-gray-800 via-gray-900 to-black" : "from-[#139BC9] to-gray-300"} text-white py-6 px-8 rounded-lg shadow-lg mb-8`}>
      <Link to="/MainPage">
          <button className="font-bold bg-gray-600 text-white rounded-lg px-6 py-2 ">MainPage</button>
        </Link>

        
        <div>
          <h1 className="text-3xl font-bold">Health Monitoring Dashboard</h1>
          <p className="text-sm opacity-80">Track live health metrics like temperature and heart rate in real-time.</p>

        </div>
        {/* Switch for toggling dark mode */}
        <button
          className="bg-gray-600 text-white px-6 py-2 rounded-lg"
          onClick={toggleDarkMode}
        >
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* Message Display Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {message ? (
          <>
            {/* Topic Box */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
              <h3 className="text-lg font-semibold text-blue-600">Topic</h3>
              <p className="text-sm text-gray-700">{message.topic || "N/A"}</p>
            </div>

            {/* Temperature Box */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-blue-600">Temperature</h3>
                <p className="text-sm text-gray-700">{message.temperature || "N/A"} °C</p>
              </div>
              <div className="text-3xl">{getTemperatureEmoji(message.temperature)}</div>
            </div>

            {/* Heart Rate Box */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-blue-600">Heart Rate</h3>
                <p className="text-sm text-gray-700">{message.heartRate || "N/A"} BPM</p>
              </div>
              <div className="text-3xl">{getHeartRateEmoji(message.heartRate)}</div>
            </div>

            {/* Time Box */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-blue-600">Time</h3>
                <p className="text-sm text-gray-700">{new Date(message.receivedAt).toLocaleString()}</p>
              </div>
              <div className="text-3xl">{getTimeEmoji(message.receivedAt)}</div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 col-span-full">Waiting for new messages...</p>
        )}
      </div>
    </div>
  );
};

export default MQTTDataViewer;
