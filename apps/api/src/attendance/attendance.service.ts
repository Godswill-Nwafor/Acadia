import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async markAttendance(
    userId: string,
    courseId: string,
    status: 'present' | 'absent' | 'late',
    date?: string,
    markedById?: string,
  ) {
    const dateObj = date ? new Date(date) : new Date();
    dateObj.setUTCHours(0, 0, 0, 0);

    return this.prisma.attendance.upsert({
      where: { userId_courseId_date: { userId, courseId, date: dateObj } },
      update: { status, markedById },
      create: { userId, courseId, date: dateObj, status, markedById },
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
        course: { select: { id: true, code: true, title: true } },
      },
    });
  }

  async findByCourse(courseId: string) {
    return this.prisma.attendance.findMany({
      where: { courseId },
      include: { user: { select: { id: true, firstName: true, lastName: true } } },
      orderBy: { date: 'desc' },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.attendance.findMany({
      where: { userId },
      include: { course: { select: { id: true, code: true, title: true } } },
      orderBy: { date: 'desc' },
    });
  }

  async findByCourseAndDate(courseId: string, date: string) {
    const dateObj = new Date(date);
    dateObj.setUTCHours(0, 0, 0, 0);
    return this.prisma.attendance.findMany({
      where: { courseId, date: dateObj },
      include: { user: { select: { id: true, firstName: true, lastName: true } } },
    });
  }

  async getStats(userId: string) {
    const records = await this.prisma.attendance.findMany({ where: { userId } });
    const total = records.length;
    const present = records.filter(r => r.status === 'present').length;
    const absent = records.filter(r => r.status === 'absent').length;
    const late = records.filter(r => r.status === 'late').length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    return { total, present, absent, late, percentage };
  }
}
