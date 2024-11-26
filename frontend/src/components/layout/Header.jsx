import React from "react";
import { Link } from "react-router-dom"; // นำเข้า Link
import logo from "../../assets/photo/logo.png";


const Header = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2">
      {/* Logo Section */}
      <Link to="/MainPage" className="flex items-center space-x-2">
        {/* Image Logo */}
        <img
          src={logo}
          alt="Logo"
          className="w-[141px] h-[134px]" // ตั้งขนาดของโลโก้ตามที่กำหนด
        />
        {/* Text */}
        <span className="text-[15px] font-bold text-blue-500">
          Measure Temperature IoT
        </span>
      </Link>

      {/* Logout Button */}
      <Link to="/RegisterPage">
      <button className="bg-[#139BC9] text-[#FFFFFF] px-4 py-2 rounded-[50px] hover:bg-blue-600">
        Logout
      </button>
      </Link>
    </div>
  );
};

export default Header;