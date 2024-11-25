const { Server } = require('socket.io');
let io = null; // ประกาศตัวแปร io

const initializeSocketIO = (server) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

const getSocketIOInstance = () => {
    if (!io) {
        throw new Error('Socket.IO instance is not initialized.');
    }
    return io;
};

module.exports = {
    initializeSocketIO,
    getSocketIOInstance,
};
