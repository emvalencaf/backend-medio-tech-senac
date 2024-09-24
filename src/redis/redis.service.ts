import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    private redisClient: Redis;

    constructor() {
        this.redisClient = new Redis();
    }

    async revokeToken(
        userId: number,
        token: string,
        exp: number,
    ): Promise<void> {
        const ttl = exp - Math.floor(Date.now() / 1000); // calc time to live base on token's expiration

        // store token at redis
        await this.redisClient.set(
            `revokedToken:${userId}:${token}`,
            'revoked',
            'EX',
            ttl,
        );
    }

    async testRedisConnection(): Promise<void> {
        const pingResponse = await this.redisClient.ping();
        console.log('Ping response:', pingResponse);
    }

    async isTokenRevoked(userId: number, token: string): Promise<boolean> {
        const exists = await this.redisClient.sismember(
            `revokedTokens:${userId}`,
            token,
        );

        return exists === 1;
    }
}
