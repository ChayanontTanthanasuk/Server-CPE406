import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './dom/Welcome'; // นำเข้าไฟล์ Welcome
import BG from "./components/layout/BG"; // BG layout
import MainPage from "./components/page/MainPage"; // หน้า MainPage
import RegisterPage from "./components/page/RegisterPage";
import TemperaturePage from "./components/page/TemperaturePage"; // Import TemperaturePage
import TestTempPage from "./components/page/TestTempPage";

import AuthForm from './authForm/AuthForm'; // นำเข้า AuthForm
// import MQTTDataViewer from './mqttData/mqttdata'; // นำเข้า MQTTDataViewer
import './App.css'; // นำเข้า CSS

function App() {
  return (
    <BG>
    <Router>
      <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/temperaturePage" element={<TemperaturePage />} />
      <Route path="/MainPage" element={<MainPage />} />
      <Route path="/AuthForm" element={<AuthForm />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/TestTempPage" element={<TestTempPage />} />
         {/* หน้า Welcome */} 
        {/* <Route path="/mqtt-data" element={<MQTTDataViewer />} /> หน้า MQTTDataViewer */}
      </Routes>
    </Router>
    </BG>
  );
}

export default App;





