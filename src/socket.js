const notifications = require('./socket/notifications');
const { Server } = require('socket.io');
const auth = require('./socket/auth');

let io;

const init = (server) => {

    io = new Server(server, {

    cors: {

        origin: "http://localhost:3000",

        methods: ["GET", "POST"]

    }

    });

    const notificationNamespace =

        io.of("/notifications");

    notificationNamespace.use(auth);

    notifications(notificationNamespace);

    console.log("Socket.IO initialized");

    io.use(auth);

    notifications(io);


    console.log('Socket.IO initialized');

    return io;

};

const getIO = () => {

    if (!io) {

        throw new Error('Socket.IO not initialized');

    }

    return io;

};

module.exports = {

    init,

    getIO

};