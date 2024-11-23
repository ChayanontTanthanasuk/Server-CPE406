import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // ใช้สำหรับการตกแต่ง CSS

function App() {
  const [name, setName] = useState(''); // เก็บค่าชื่อผู้ใช้
  const [password, setPassword] = useState(''); // เก็บค่ารหัสผ่าน
  const [message, setMessage] = useState(''); // เก็บข้อความตอบกลับจากเซิร์ฟเวอร์

  // ฟังก์ชันสำหรับจัดการการล็อกอิน
  const handleLogin = async () => {
    try {
      // ส่งข้อมูล name และ password ไปที่ backend
      const res = await axios.post('http://localhost:3000/api/login', { name, password });
      setMessage(`Login Success! Token: ${res.data.token}`); // แสดงข้อความหากล็อกอินสำเร็จ
    } catch (err) {
      // จัดการข้อความข้อผิดพลาดตามสถานะ
      if (err.response?.status === 404) {
        setMessage('User not found'); // กรณีไม่พบผู้ใช้
      } else if (err.response?.status === 400) {
        setMessage('Password Invalid'); // กรณีรหัสผ่านไม่ถูกต้อง
      } else {
        setMessage('Error during login'); // กรณีอื่นๆ
      }
    }
  };

  return (
    <div className="App">
      <h1 className="title">Login</h1>
      <div className="login-container">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)} // อัปเดตค่า name
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // อัปเดตค่า password
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      {message && <p className="message">{message}</p>} {/* แสดงข้อความตอบกลับ */}
    </div>
  );
}

export default App;

