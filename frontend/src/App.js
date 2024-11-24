
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from '../src/dom/Welcome'; // นำเข้าไฟล์ Welcome
import AuthForm from '../src/authForm/AuthForm'; // นำเข้า AuthForm
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* ใช้ AuthForm เป็นเส้นทางหลัก */}
        <Route path="/" element={<AuthForm />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;


