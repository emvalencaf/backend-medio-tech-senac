import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: process.env.FRONTEND_URL, // Substitua pela URL do seu frontend
        methods: ['GET', 'POST'],
        credentials: true,
    },
})
export class NotificationsGateway {
    @WebSocketServer()
    server: Server;

    sendNotification(message: string) {
        // Enviar a notificação para todos os clientes conectados
        this.server.emit('announcement', message);
    }
}
