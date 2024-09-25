import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    private redisClient: Redis;

    constructor() {
        this.redisClient = new Redis();
    }

    // Duplicar cliente para o Redis subscriber
    async duplicateClient(): Promise<Redis> {
        return this.redisClient.duplicate();
    }

    // Publicar mensagens no Redis
    async publishMessage(channel: string, message: string): Promise<void> {
        await this.redisClient.publish(channel, message);
    }

    // Revogar token
    async revokeToken(
        userId: number,
        token: string,
        exp: number,
    ): Promise<void> {
        const ttl = exp - Math.floor(Date.now() / 1000); // calc time to live based on token's expiration

        // store token at redis
        await this.redisClient.set(
            `revokedToken:${userId}:${token}`,
            'revoked',
            'EX',
            ttl,
        );
    }

    // Testar conexão com Redis
    async testRedisConnection(): Promise<void> {
        const pingResponse = await this.redisClient.ping();
        console.log('Ping response:', pingResponse);
    }

    // Verificar se token está revogado
    async isTokenRevoked(userId: number, token: string): Promise<boolean> {
        const exists = await this.redisClient.sismember(
            `revokedTokens:${userId}`,
            token,
        );

        return exists === 1;
    }
}
