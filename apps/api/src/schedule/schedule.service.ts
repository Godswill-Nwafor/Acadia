import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    courseId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    venue?: string;
  }) {
    return this.prisma.schedule.create({
      data,
      include: { course: { select: { id: true, code: true, title: true } } },
    });
  }

  async findByCourse(courseId: string) {
    return this.prisma.schedule.findMany({
      where: { courseId },
      include: { course: { select: { id: true, code: true, title: true } } },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
  }

  async findByDay(dayOfWeek: number) {
    return this.prisma.schedule.findMany({
      where: { dayOfWeek },
      include: {
        course: {
          select: { id: true, code: true, title: true, level: true, credits: true },
          include: {
            lecturer: { select: { id: true, firstName: true, lastName: true } },
          },
        },
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async findAll() {
    return this.prisma.schedule.findMany({
      include: {
        course: {
          select: { id: true, code: true, title: true, level: true },
          include: {
            lecturer: { select: { id: true, firstName: true, lastName: true } },
          },
        },
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
  }

  async update(
    id: string,
    data: Partial<{ dayOfWeek: number; startTime: string; endTime: string; venue: string }>,
  ) {
    const existing = await this.prisma.schedule.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Schedule entry not found');
    return this.prisma.schedule.update({ where: { id }, data });
  }

  async remove(id: string) {
    const existing = await this.prisma.schedule.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Schedule entry not found');
    await this.prisma.schedule.delete({ where: { id } });
    return { message: 'Schedule entry deleted' };
  }
}
