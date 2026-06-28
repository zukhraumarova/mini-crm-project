const Redis = require('ioredis');

const redis = new Redis({

    host: '127.0.0.1',

    port: 6379,

    maxRetriesPerRequest: null

});

redis.on('connect', () => {

    console.log('✅ Redis Cache connected');

});

redis.on('error', (err) => {

    console.log('Redis error:', err);

});

module.exports = redis;