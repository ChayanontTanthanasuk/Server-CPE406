const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema(
    {
        topic: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        receivedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true } // สร้าง createdAt และ updatedAt อัตโนมัติ
);

module.exports = mongoose.model('Temperature', temperatureSchema);

