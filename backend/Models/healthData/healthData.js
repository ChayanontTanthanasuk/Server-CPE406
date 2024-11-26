

const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema(
    {
        topic: {
            type: String,
            required: true,
        },
        temperature: {
            type: Number, // ใช้ Number เพราะอุณหภูมิเป็นค่าตัวเลข
            required: true,
        },
        heartRate: {
            type: Number, // ใช้ Number เพราะอัตราการเต้นหัวใจเป็นค่าตัวเลข
            required: true,
        },
        receivedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true } // สร้าง createdAt และ updatedAt อัตโนมัติ
);

module.exports = mongoose.model('HealthData', healthDataSchema);
