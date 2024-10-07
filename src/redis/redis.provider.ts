import Redis from 'ioredis';

export const redisProvider = {
    provide: 'REDIS',
    useFactory: () => {
        try {
            if (process.env.ENVIRONMENT === 'DEVELOPMENT') {
                // Para desenvolvimento
                const host = process.env.REDIS_HOST || 'localhost';
                const port = Number(process.env.REDIS_PORT) || 6379;

                return new Redis({
                    host,
                    port,
                });
            } else {
                const {
                    REDIS_HOST,
                    REDIS_USERNAME,
                    REDIS_PASSWORD,
                    REDIS_PORT,
                } = process.env;

                return new Redis({
                    username: REDIS_USERNAME,
                    host: REDIS_HOST,
                    password: REDIS_PASSWORD,
                    port: Number(REDIS_PORT) || 6379,
                    tls: {},
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
};
