import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './dom/Welcome'; // นำเข้าไฟล์ Welcome
import AuthForm from './authForm/AuthForm'; // นำเข้า AuthForm
import MQTTDataViewer from './mqttData/mqttdata'; // นำเข้า MQTTDataViewer
import './App.css'; // นำเข้า CSS

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} /> {/* หน้าเริ่มต้น */}
        <Route path="/welcome" element={<Welcome />} /> {/* หน้า Welcome */}
        <Route path="/mqtt-data" element={<MQTTDataViewer />} /> {/* หน้า MQTTDataViewer */}
      </Routes>
    </Router>
  );
}

export default App;





