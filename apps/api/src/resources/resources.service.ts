import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaService) {}

  async create(createResourceDto: CreateResourceDto) {
    return this.prisma.resource.create({ data: createResourceDto });
  }

  async findAll() {
    return this.prisma.resource.findMany({
      include: { course: { select: { id: true, code: true, title: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const resource = await this.prisma.resource.findUnique({ where: { id } });
    if (!resource) throw new NotFoundException('Resource not found');
    return resource;
  }

  async findByCourse(courseId: string) {
    return this.prisma.resource.findMany({
      where: { courseId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, updateResourceDto: UpdateResourceDto) {
    const existing = await this.prisma.resource.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Resource not found');
    return this.prisma.resource.update({ where: { id }, data: updateResourceDto });
  }

  async remove(id: string) {
    const existing = await this.prisma.resource.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Resource not found');
    await this.prisma.resource.delete({ where: { id } });
    return { message: 'Resource deleted successfully' };
  }
}
