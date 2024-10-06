import Redis from 'ioredis';

const redisConfig =
    process.env.ENVIRONMENT === 'DEVELOPMENT'
        ? {
              host: process.env.REDIS_HOST || 'localhost',
              port: parseInt(process.env.REDIS_PORT, 10) || 6379,
          }
        : process.env.REDIS_URL; // A URL já será uma string no ambiente de produção

export const redisProvider = {
    provide: 'REDIS',
    useFactory: () => {
        // Checa se é um objeto ou string para instanciar Redis corretamente
        return typeof redisConfig === 'string'
            ? new Redis(redisConfig) // Para produção, utilizando URL
            : new Redis(redisConfig); // Para desenvolvimento, utilizando host e port
    },
};
