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

    console.log("Reachable point...!",userId)

    if (socketId) {
      this.server.to(socketId).emit(event, data);
    }
  }
}