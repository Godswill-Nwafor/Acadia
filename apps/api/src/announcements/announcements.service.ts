import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAnnouncementDto) {
    return this.prisma.announcement.create({ data });
  }

  async findAll() {
    return this.prisma.announcement.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const a = await this.prisma.announcement.findUnique({ where: { id } });
    if (!a) throw new NotFoundException('Announcement not found');
    return a;
  }

  async findByCourse(courseId: string) {
    return this.prisma.announcement.findMany({ where: { courseId }, orderBy: { createdAt: 'desc' } });
  }

  async findByTarget(target: string) {
    return this.prisma.announcement.findMany({ where: { target }, orderBy: { createdAt: 'desc' } });
  }

  async update(id: string, data: UpdateAnnouncementDto) {
    await this.findOne(id);
    return this.prisma.announcement.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.announcement.delete({ where: { id } });
    return { message: 'Announcement deleted' };
  }
}
