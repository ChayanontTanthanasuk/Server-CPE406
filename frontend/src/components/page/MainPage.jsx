import React from "react";
import { Link } from "react-router-dom"; // นำเข้า Link
// รูปภาพต่าง ๆ
import logo from "../../assets/photo/logo.png"; // โลโก้
import DoctorBack from "../../assets/photo/DoctorBack.jpg";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center">
    {/* กล่องหลักสีขาวคลุมจอ */}
    <div className="w-full min-h-screen bg-white flex flex-col md:flex-row items-center">
      {/* ด้านซ้าย - ข้อความ */}
      <div className="md:w-1/2 p-4 space-y-4 text-center md:text-left">
        {/* โลโก้ */}
        <img src={logo} alt="Logo" className="w-[141px] h-[134px] " />
        <span className="text-[20px] text-[#0E6D8E] ml-10 ">
          Measure Temperature IoT
        </span>

        {/* ชื่อโปรเจกต์ */}
        <h1 className="text-[60px] text-black ml-10">temperature IOT</h1>

        {/* คำอธิบาย */}
        <p className="text-gray-700 text-sm md:text-base ml-10">
          การตรวจอุณหภูมิร่างกายเป็นกระบวนการที่ใช้ในการวัดอุณหภูมิของร่างกาย
          เพื่อการตรวจสอบสุขภาพ
          โดยปกติจะใช้เครื่องมืออย่างเทอร์โมมิเตอร์ในการวัด
          ซึ่งช่วยให้สามารถประเมินอุณหภูมิสูงหรือต่ำกว่าปกติ
          ที่อาจบ่งชี้ถึงการติดเชื้อหรือความผิดปกติทางสุขภาพ
        </p>

          {/* ปุ่ม ตรวจสุขภาพ */}
          <div className="flex justify-center md:justify-start space-x-4">
            <Link to="/TemperaturePage">
              <button className="bg-[#139BC9] text-white px-4 py-2 rounded-[40px] hover:bg-blue-600 ml-5">
                ตรวจสุขภาพ
              </button>
            </Link>
          </div>
        </div>


        <div className="w-[1239px]">
          {/* รูปหมอ */}
          <img
            src={DoctorBack}
            alt="Doctor Back"
            className=" top-0 right-0"
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
