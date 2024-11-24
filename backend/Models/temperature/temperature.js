const mongoose = require('mongoose');

const tempSchema = mongoose.Schema(
    {
        Temp: { type: Number, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('temperature', tempSchema);
