import React from "react";
import background from "../../assets/photo/background.png";

const BG = ({ children }) => {
  return (
    <div
      className="min-h-screen bg-blue-50 flex flex-col"
      style={{
        width: "100vw", // ครอบคลุมความกว้างหน้าจอ
        height: "100vh", // ครอบคลุมความสูงหน้าจอ
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
};

export default BG;
