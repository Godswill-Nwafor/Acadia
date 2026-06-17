import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly service: MessagesService) {}

  @Post()
  create(@Body() dto: CreateMessageDto) { return this.service.create(dto); }

  @Get()
  findAll() { return this.service.findAll(); }

  @Get('conversations')
  getConversations() { return this.service.getConversations(); }

  @Get('sender/:senderId')
  findBySender(@Param('senderId') senderId: string) { return this.service.findBySender(senderId); }

  @Get('group/:groupId')
  findByGroup(@Param('groupId') groupId: string) { return this.service.findByGroup(groupId); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
