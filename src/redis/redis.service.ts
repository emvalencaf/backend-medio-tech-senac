import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    private redisClient: Redis;
    private redisSubscriber: Redis;

    constructor() {
        this.redisClient = new Redis();
        this.redisSubscriber = new Redis();

        // Aqui você pode iniciar a escuta de um canal de notificações
    }

    async duplicateClient(): Promise<Redis> {
        return this.redisClient.duplicate();
    }

    async publishMessage(channel: string, message: string): Promise<void> {
        await this.redisClient.publish(channel, message);
    }

    // Método para se inscrever em um canal
    async subscribe(
        channel: string,
        callback: (message: string) => void,
    ): Promise<void> {
        await this.redisSubscriber.subscribe(channel);
        this.redisSubscriber.on('message', (subscribedChannel, message) => {
            if (subscribedChannel === channel) {
                callback(message);
            }
        });
    }

    // Revogar token
    async revokeToken(
        userId: number,
        token: string,
        exp: number,
    ): Promise<void> {
        const ttl = Math.max(0, exp - Math.floor(Date.now() / 1000)); // calc time to live based on token's expiration

        await this.redisClient.set(
            `revokedTokens:${userId}:${token}`,
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
        const exists = await this.redisClient.exists(
            `revokedTokens:${userId}:${token}`, // Verifica se a chave existe
        );
        return exists === 1; // Se exists for 1, o token está revogado
    }
}
