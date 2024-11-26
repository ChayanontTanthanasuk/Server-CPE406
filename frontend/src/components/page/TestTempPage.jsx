import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import background from "../../assets/photo/background.png";
import Temperature from "../../assets/photo/Temperature.png";
import logo from "../../assets/photo/logo.png";

// Backend Server URL
const SOCKET_SERVER_URL = "http://localhost:4000";

// Header Component
const Header = () => (
  <header className="flex justify-between items-center px-4 py-2">
    <Link to="/MainPage">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-[141px] h-[134px]" />
        <span className="text-[15px] font-bold text-blue-500">
          Measure Temperature IoT
        </span>
      </div>
    </Link>
    <Link to="/AuthForm">
      <button className="bg-[#139BC9] text-white px-4 py-2 rounded-full hover:bg-blue-600">
        Logout
      </button>
    </Link>
  </header>
);

// TemperatureCard Component
const TemperatureCard = ({ temperature }) => (
  <div className="relative bg-[#008EC0] text-white p-8 rounded-[50px] mx-auto md:w-[1082px] md:h-[711px] w-[90%] h-auto">
    <img
      src={Temperature}
      alt="Thermometer"
      className="absolute top-1/2 left-1/2 transform translate-x-1/2 -translate-y-1/2"
      style={{
        height: "531px",
        objectFit: "contain",
      }}
    />
    <div className="relative z-10">
      <h2 className="text-[48px] font-bold mb-4">อุณหภูมิที่วัดได้</h2>
      <div className="flex justify-center items-center space-x-4 mb-4">
        <span className="text-[96px] md:text-[128px] font-extrabold">
          {temperature} °C
        </span>
      </div>
      <div className="flex justify-center">
        <p className="text-[16px] md:text-[24px] bg-[#55C1E8] px-6 py-2 rounded-[5px]">
          อุณหภูมิร่างกายปกติ และไม่มีอาการผิดปกติ
        </p>
      </div>
    </div>
  </div>
);

// BG Component
const BG = ({ children }) => (
  <div
    className="min-h-screen bg-blue-50 flex flex-col"
    style={{
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {children}
  </div>
);

// TestTempPage Component
const TestTempPage = () => {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    // Listen to 'mqtt_data' event
    socket.on("mqtt_data", (data) => {
      console.log("Received data:", data);
      if (data?.message) {
        setTemperature(data.message);
      }
    });

    // Disconnect socket on cleanup
    return () => socket.disconnect();
  }, []);

  return (
    <BG>
      <Header />
      <main className="flex justify-center items-center h-full">
        {temperature !== null ? (
          <TemperatureCard temperature={temperature} />
        ) : (
          <p className="text-2xl font-bold text-gray-500">
            กำลังรอข้อมูลอุณหภูมิ...
          </p>
        )}
      </main>
    </BG>
  );
};

export default TestTempPage;

