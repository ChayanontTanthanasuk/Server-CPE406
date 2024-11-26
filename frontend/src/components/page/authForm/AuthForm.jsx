import React, { useState } from 'react';
import axios from 'axios'; // ใช้ axios เพื่อเรียก Backend
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate
import './AuthForm.css';

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true); // ใช้เพื่อสลับระหว่าง Sign in และ Sign up
  const [name, setName] = useState(''); // เก็บค่าชื่อผู้ใช้
  const [password, setPassword] = useState(''); // เก็บค่ารหัสผ่าน
  const [confirmPassword, setConfirmPassword] = useState(''); // เก็บค่ารหัสผ่านยืนยัน (เฉพาะ Sign up)
  const [message, setMessage] = useState(''); // ข้อความแสดงผลลัพธ์จาก Backend
  const navigate = useNavigate(); // ใช้เพื่อเปลี่ยนหน้า

  const toggleForm = () => {
    setIsSignIn(!isSignIn); // เปลี่ยนค่าระหว่าง true และ false
    setMessage(''); // เคลียร์ข้อความเมื่อเปลี่ยนหน้า
  };

  // ฟังก์ชันจัดการการล็อกอิน
  const handleLogin = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    try {
      const res = await axios.post('http://localhost:4000/api/login', { name, password });
      localStorage.setItem('authToken', res.data.token); // เก็บ Token
      setMessage(''); // เคลียร์ข้อความ
      navigate('/welcome'); // เปลี่ยนไปหน้า Welcome
    } catch (err) {
      if (err.response?.status === 404) {
        setMessage('User not found');
      } else if (err.response?.status === 400) {
        setMessage('Password Invalid');
      } else {
        setMessage('Error during login');
      }
    }
  };

  // ฟังก์ชันจัดการการสมัครสมาชิก
  const handleSignup = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    try {
      const res = await axios.post('http://localhost:4000/api/register', { name, password }); // เรียก API signup
      setMessage('Account created successfully! Please log in.');
      setMessage(''); // เคลียร์ข้อความ
      setIsSignIn(true); // เปลี่ยนไปหน้า Sign in
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error during signup');
    }
  };

  return (
    <div className="auth-container">
      <div className={`forms-container ${isSignIn ? 'signin' : 'signup'}`}>
        {/* Sign in Form */}
        <div className="form-box signin">
          <h2>Sign in to Account</h2>
          <div className="social-icons">
            <button className="social-btn">f</button>
            <button className="social-btn">G+</button>
          </div>
          <p className="divider">or use your email account</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">Sign in</button>
          </form>
        </div>

        {/* Sign up Form */}
        <div className="form-box signup">
          <h2>Create Account</h2>
          <div className="social-icons">
            <button className="social-btn">f</button>
            <button className="social-btn">G+</button>
          </div>
          <p className="divider">or use your email for registration</p>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">Sign up</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className={`overlay ${isSignIn ? 'signin' : 'signup'}`}>
            {/* Overlay Left */}
            <div className="overlay-panel left">
              <h2 className="Welcome-h2">Welcome Back!</h2>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost-btn" onClick={toggleForm}>
                Sign in
              </button>
            </div>
            {/* Overlay Right */}
            <div className="overlay-panel right">
              <h2 className="sign-uph2">Hello, Friends!</h2>
              <p>Enter your personal details and start</p>
              <button className="ghost-btn" onClick={toggleForm}>
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
      {message && <p className="message">{message}</p>} {/* แสดงข้อความตอบกลับ */}
    </div>
  );
};

export default AuthForm;
