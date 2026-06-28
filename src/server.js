require('dotenv').config();

const http = require('http');

const app = require('./app');

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const socket = require('./socket');

socket.init(server);

require('./workers/email.worker');

require('./cron/cleanup.cron');

server.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});


server.on('error', (err) => {
    console.log('SERVER ERROR:', err);
});