import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

interface JwtUser {
  id: string;
  email: string;
  role: string;
}

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly service: MessagesService) {}

  // senderId always comes from JWT
  @Post()
  create(@Req() req: { user: JwtUser }, @Body() dto: CreateMessageDto) {
    return this.service.create({ ...dto, senderId: req.user.id });
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('conversations')
  getConversations() {
    return this.service.getConversations();
  }

  @Get('my')
  findMy(@Req() req: { user: JwtUser }) {
    return this.service.findBySender(req.user.id);
  }

  @Get('sender/:senderId')
  findBySender(@Param('senderId') senderId: string) {
    return this.service.findBySender(senderId);
  }

  @Get('group/:groupId')
  findByGroup(@Param('groupId') groupId: string) {
    return this.service.findByGroup(groupId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
