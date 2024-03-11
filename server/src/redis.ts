import Redis from 'ioredis';

export function getRedisInstance() {
    const instance = new Redis({
        host: 'redis-14215.c322.us-east-1-2.ec2.cloud.redislabs.com',
        port: 14215,
        username: 'default',
        password: 'XCcc2pJdZUaCfwfzhyY26xcc0xTmGf1A',
    });

    instance.on('connect', () => console.log('Redis connected'));
    instance.on('error', (err) => console.error('Redis error', err));

    return instance;
}