import { error } from "console";
import { Redis } from "ioredis";

interface RedisConfig {
    host: string;
    port: number;
    username: string;
    password: string
}

export function getRedisInstance(config: RedisConfig): Redis {
    const instance = new Redis({
        host: config.host,
        port: config.port,
        username:config.username,
        password: config.password
    });

    instance.on("connect", () => console.log("Redis connected"))
    instance.on("error", () => console.log("Redis error", error))

    return instance;
}