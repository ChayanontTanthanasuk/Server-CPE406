import React from "react";
import Temperature from "../../assets/photo/Temperature.png";

const TemperatureCard = ({ temperature }) => {
  return (
    <div className="bg-[#008EC0] text-white p-8 rounded-[50px] mx-auto relative md:w-[1082px] md:h-[711px] w-[90%] h-auto">
      {/* รูปภาพ */}
      <img
        src={Temperature}
        alt="Thermometer"
        className="absolute"
        style={{
          top: "50%",  // ให้อยู่ที่กลางของคอนเทนเนอร์
          left: "50%", // ให้อยู่ที่กลางของคอนเทนเนอร์
          width: "auto", // ขนาดตามสัดส่วน
          height: "531px",  // ขนาดที่ต้องการ
          transform: "translate(50%, -45%)", // ใช้เพื่อให้จุดกลางของรูปตรงกับตำแหน่งที่กำหนด
          objectFit: "contain", // ไม่ยืดหดรป
        }}
      />

      {/* Title */}
      <h2 className="text-white text-[48px] font-bold mb-4 z-10 ">
        อุณหภูมิที่วัดได้
      </h2>

      {/* Temperature Display */}
      <div className="flex justify-center items-center space-x-4 mb-4 z-10">
        <span className="text-[96px] md:text-[128px] font-extrabold">{temperature} °C</span>
      </div>

      {/* Description */}
      <div className="flex justify-center">
        <p className="text-[16px] md:text-[24px] bg-[#55C1E8] px-6 py-2 rounded-[5px] mb-4 z-10">
          อุณหภูมิร่างกายปกติ และไม่มีอาการผิดปกติ
        </p>
      </div>
    </div>
  );
};

export default TemperatureCard;
