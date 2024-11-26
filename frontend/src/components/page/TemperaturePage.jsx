import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

const SOCKET_SERVER_URL = "http://localhost:4000";

const MQTTDataViewer = () => {
  const [message, setMessage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    socket.on("mqtt_data", (data) => {
      console.log("Received data:", data);
      if (data) {
        setMessage(data);
      }
    });

    return () => socket.disconnect();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getTemperatureEmoji = (temperature) => {
    if (temperature < 20) return "❄️";
    if (temperature < 30) return "🌡️";
    return "🔥";
  };

  const getHeartRateEmoji = (heartRate) => {
    if (heartRate < 60) return "💓";
    if (heartRate < 80) return "❤️";
    return "💨";
  };

  const getTimeEmoji = (time) => {
    const hours = new Date(time).getHours();
    return hours < 6 || hours > 18 ? "🌙" : "🌞";
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Navbar */}
      <div
        className={`w-full flex justify-between items-center bg-gradient-to-r ${
          isDarkMode ? "from-gray-800 via-gray-900 to-black" : "from-[#139BC9] to-gray-300"
        } text-white py-7 px-6 shadow-lg fixed top-0`}
      >
        <Link to="/MainPage">
          <button className="font-bold bg-gray-600 text-white rounded-lg px-4 py-2">
            MainPage
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Health Monitoring Dashboard</h1>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-lg"
          onClick={toggleDarkMode}
        >
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* Padding to avoid overlap with fixed Navbar */}
      <div className="pt-20 flex justify-center items-center h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-24">
          {message ? (
            <>
              {/* Topic Box */}
              <div className="p-8 rounded-2xl shadow-lg border border-gray-300 bg-opacity-70 bg-white flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-blue-600">Topic</h3>
                  <p className="text-3xl font-bold text-gray-800">{message.topic || "N/A"}</p>
                </div>
              </div>

              {/* Temperature Box */}
              <div className="p-8 rounded-2xl shadow-lg border border-gray-300 bg-opacity-70 bg-white flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-blue-600">Temperature</h3>
                  <p className="text-3xl font-bold text-gray-800">{message.temperature || "N/A"} °C</p>
                </div>
                <div className="text-5xl">{getTemperatureEmoji(message.temperature)}</div>
              </div>

              {/* Heart Rate Box */}
              <div className="p-8 rounded-2xl shadow-lg border border-gray-300 bg-opacity-70 bg-white flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-blue-600">Heart Rate</h3>
                  <p className="text-3xl font-bold text-gray-800">{message.heartRate || "N/A"} BPM</p>
                </div>
                <div className="text-5xl">{getHeartRateEmoji(message.heartRate)}</div>
              </div>

              {/* Time Box */}
              <div className="p-8 rounded-2xl shadow-lg border border-gray-300 bg-opacity-70 bg-white flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-blue-600">Time</h3>
                  <p className="text-3xl font-bold text-gray-800">{new Date(message.receivedAt).toLocaleString()}</p>
                </div>
                <div className="text-5xl">{getTimeEmoji(message.receivedAt)}</div>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 col-span-full">Waiting for new messages...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MQTTDataViewer;
