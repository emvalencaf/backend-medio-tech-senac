import Redis from 'ioredis';

export const redisProvider = {
    provide: 'REDIS',
    useFactory: () => {
        console.log('Ambiente:', process.env.ENVIRONMENT);
        console.log('URL do Redis:', process.env.REDIS_URL);
        console.log('Host do Redis:', process.env.REDIS_HOST);
        console.log('Porta do Redis:', process.env.REDIS_PORT);
        console.log('Usuário do Redis: ', process.env.REDIS_USERNAME);
        console.log('Senha do Redis:', process.env.REDIS_PASSWORD);

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
