"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisInstance = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
function getRedisInstance() {
    const instance = new ioredis_1.default({
        host: 'redis-14215.c322.us-east-1-2.ec2.cloud.redislabs.com',
        port: 14215,
        username: 'default',
        password: 'XCcc2pJdZUaCfwfzhyY26xcc0xTmGf1A',
    });
    instance.on('connect', () => console.log('Redis connected'));
    instance.on('error', (err) => console.error('Redis error', err));
    return instance;
}
exports.getRedisInstance = getRedisInstance;
