import Redis from 'ioredis';

export const redisProvider = {
    provide: 'REDIS',
    useFactory: () => {
        // Checa se é um objeto ou string para instanciar Redis corretamente
        console.log(process.env.ENVIRONMENT);
        console.log(process.env.REDIS_URL);

        return process.env.ENVIRONMENT === 'DEVELOPMENT'
            ? new Redis({
                  host: process.env.REDIS_HOST || 'localhost',
                  port: Number(process.env.REDIS_PORT) || 6379,
              }) // Para produção, utilizando URL
            : new Redis(process.env.REDIS_URL); // Para desenvolvimento, utilizando host e port
    },
};
