const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

module.exports.get = async (key) => client.get(key);

module.exports.set = async (key, value, ttl) => client.set(key, value, ttl);

module.exports.hSet = async (key, field, value) => client.hSet(key, field, value);

module.exports.hGetAll = async (key) => client.hGetAll(key);

module.exports.hGet = async (key, field) => client.hGet(key, field);

module.exports.getSet = async (key) => client.sMembers(key);

module.exports.addToSet = async (key, value) => client.sAdd(key, value);

module.exports.removeFromSet = async (key, value) => client.sRem(key, value);

module.exports.isMemberOfSet = async (key, member) => client.sIsMember(key, member);
