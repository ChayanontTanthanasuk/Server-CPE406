const express = require('express');
const { readdirSync } = require('fs');

const morgan = require('morgan');
const cors = require('cors');
const bodyParse = require('body-parser')
const connectDB = require('./Config/db')

const app = express();
connectDB()


app.use(morgan('dev'))

app.use(bodyParse.json({ limit: '10mb' }));

const corsOptions = {
    origin: 'http://localhost:3000', // หรือที่อยู่ที่ frontend รันอยู่
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
 };
  app.use(cors(corsOptions));


readdirSync('./Routes/').map((a) => {
    app.use('/api', require('./Routes/' + a))
});

app.listen(3000, () =>{
    console.log("Server Running on port 4000");
}) 