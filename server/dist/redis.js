"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisInstance = void 0;
const console_1 = require("console");
const Redis_1 = __importDefault(require("../node_modules/ioredis/built/Redis"));
function getRedisInstance() {
    const instance = new Redis_1.default({
        host: "redis-14215.c322.us-east-1-2.ec2.cloud.redislabs.com",
        port: 14215,
        username: "default",
        password: "XCcc2pJdZUaCfwfzhyY26xcc0xTmGf1A"
    });
    instance.on("connect", () => console.log("Redis connected"));
    instance.on("error", () => console.log("Redis error", console_1.error));
    return instance;
}
exports.getRedisInstance = getRedisInstance;
