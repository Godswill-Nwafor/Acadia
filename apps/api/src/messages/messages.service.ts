import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMessageDto) {
    return this.prisma.message.create({
      data: dto,
      include: { sender: { select: { id: true, firstName: true, lastName: true, avatar: true } } },
    });
  }

  async findAll() {
    return this.prisma.message.findMany({
      include: { sender: { select: { id: true, firstName: true, lastName: true, avatar: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  async findBySender(senderId: string) {
    return this.prisma.message.findMany({
      where: { senderId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByGroup(groupId: string) {
    return this.prisma.message.findMany({
      where: { groupId },
      include: { sender: { select: { id: true, firstName: true, lastName: true, avatar: true } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getConversations() {
    const messages = await this.prisma.message.findMany({
      include: { sender: { select: { id: true, firstName: true, lastName: true, avatar: true, role: true } } },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    // Group by sender for conversation view
    const grouped = new Map();
    for (const msg of messages) {
      const key = msg.groupId || msg.senderId;
      if (!grouped.has(key)) {
        grouped.set(key, { ...msg });
      }
    }
    return Array.from(grouped.values());
  }

  async remove(id: string) {
    await this.prisma.message.delete({ where: { id } });
    return { message: 'Message deleted' };
  }
}
