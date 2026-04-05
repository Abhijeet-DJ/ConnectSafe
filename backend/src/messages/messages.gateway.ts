import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({
  namespace: '/v1',
  cors: true,
})
export class MessagesGateway {
  @WebSocketServer()
  server: any;

  private onlineUsers = new Map<string, string>();

  handleConnection(client: any) {
    const userId = client.handshake.query.userId;

    if (!userId) return;

    client.user = { _id: userId };

    this.onlineUsers.set(userId, client.id);
     this.broadcastOnlineUsers();
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

  private broadcastOnlineUsers() {
    // Converting Map keys to an array of userIds
    const onlineUserIds = Array.from(this.onlineUsers.keys());
    
    // Emit to everyone in the '/v1' namespace
    this.server.emit('getOnlineUsers', onlineUserIds);
  }
}