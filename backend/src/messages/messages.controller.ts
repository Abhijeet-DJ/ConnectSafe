import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { MessagesGateway } from "./messages.gateway";
import { MessagesService } from "./messages.service";
import { AuthGuard } from "src/common/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller('/v1/messages')
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
    private messagesGateway: MessagesGateway,
  ) {}

  @Post('send/:id')
  async sendMessage(
    @Param('id') receiverId: string,
    @Body() body,
    @Req() req,
  ) {
    const message = await this.messagesService.sendMessage({
      senderId: req.user.id, // ✅ FIXED
      recieverId: receiverId,
      text: body.text,
      image: body.image,
    });

    this.messagesGateway.emitToUser(receiverId, 'newMessage', message);

    return { message };
  }

  @Get('users')
  async getUsersExceptMe(@Req() req) {
    const currUserId = req.user?.id; // ✅ FIXED

    if (!currUserId) {
      return 'Provide a valid Id';
    }

    return this.messagesService.getUsersForSidebar(currUserId);
  }

  @Get('/:id')
  async getMessages(@Param('id') userToChatId: string, @Req() req) {
    try {
      const currUserId = req.user?.id; // ✅ FIXED

      console.log("From messages/:id :", userToChatId, currUserId);

      return this.messagesService.getMessages(currUserId, userToChatId);
    } catch (error) {
      console.log(`ERROR :: Fetching Messages :: ${error}`);
    }
  }
}