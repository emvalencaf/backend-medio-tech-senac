import Redis from 'ioredis';

export const redisProvider = {
    provide: 'REDIS',
    useFactory: () => {
        console.log('Ambiente:', process.env.ENVIRONMENT);
        console.log('URL do Redis:', process.env.REDIS_URL);
        console.log('Host do Redis:', process.env.REDIS_HOST);
        console.log('Porta do Redis:', process.env.REDIS_PORT);

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
                return new Redis(process.env.REDIS_URL, {
                    tls: { rejectUnauthorized: false },
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
};
