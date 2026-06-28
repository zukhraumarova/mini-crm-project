module.exports = (io) => {

    io.on('connection', (socket) => {

        console.log(
            'User connected:',
            socket.user
        );

        // личная комната пользователя
        socket.join(
            `user_${socket.user.id}`
        );

        // комната по роли
        socket.join(
            socket.user.role
        );

        console.log(
            `Joined room: user_${socket.user.id}`
        );

        console.log(
            `Joined room: ${socket.user.role}`
        );

        socket.on('disconnect', () => {

            console.log(
                'Disconnected:',
                socket.user.email
            );

        });

    });

};