import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async enroll(userId: string, courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!course) throw new NotFoundException('Course not found');

    const existing = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (existing)
      throw new ConflictException('Already enrolled in this course');

    return this.prisma.enrollment.create({
      data: { userId, courseId },
      include: {
        course: {
          select: {
            id: true,
            code: true,
            title: true,
            level: true,
            credits: true,
          },
        },
      },
    });
  }

  async unenroll(userId: string, courseId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (!enrollment) throw new NotFoundException('Enrollment not found');
    await this.prisma.enrollment.delete({
      where: { userId_courseId: { userId, courseId } },
    });
    return { message: 'Unenrolled successfully' };
  }

  async findByUser(userId: string) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            lecturer: { select: { id: true, firstName: true, lastName: true } },
            department: { select: { id: true, name: true } },
            _count: {
              select: { assignments: true, materials: true, enrollments: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCourse(courseId: string) {
    return this.prisma.enrollment.findMany({
      where: { courseId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            level: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateProgress(userId: string, courseId: string, progress: number) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (!enrollment) throw new NotFoundException('Enrollment not found');
    return this.prisma.enrollment.update({
      where: { userId_courseId: { userId, courseId } },
      data: { progress: Math.min(100, Math.max(0, progress)) },
    });
  }

  async isEnrolled(userId: string, courseId: string) {
    const e = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    return { enrolled: !!e };
  }
}
