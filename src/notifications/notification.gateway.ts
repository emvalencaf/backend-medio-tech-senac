import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:3000', // Substitua pela URL do seu frontend
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
