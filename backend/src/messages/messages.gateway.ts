import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({
  namespace: '/chat',
  cors: true,
})
export class MessagesGateway {
  @WebSocketServer()
  server: any;

  private onlineUsers = new Map<string, string>();

  handleConnection(client: any) {
    const user = client.handshake.auth.user;

    if (!user?._id) return;

    client.user = user;

    this.onlineUsers.set(user._id, client.id);
  }

  handleDisconnect(client: any) {
    const userId = client.user?._id;

    if (userId) {
      this.onlineUsers.delete(userId);
    }
  }

  getReceiverSocketId(userId: string) {
    return this.onlineUsers.get(userId);
  }

  emitToUser(userId: string, event: string, data: any) {
    const socketId = this.getReceiverSocketId(userId);

    if (socketId) {
      this.server.to(socketId).emit(event, data);
    }
  }
}