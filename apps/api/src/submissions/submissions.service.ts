import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateSubmissionDto,
  GradeSubmissionDto,
} from './dto/create-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSubmissionDto) {
    const existing = await this.prisma.submission.findUnique({
      where: {
        userId_assignmentId: {
          userId: dto.userId,
          assignmentId: dto.assignmentId,
        },
      },
    });
    if (existing) throw new ConflictException('Already submitted');
    return this.prisma.submission.create({
      data: dto,
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.submission.findMany({
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        assignment: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const s = await this.prisma.submission.findUnique({ where: { id } });
    if (!s) throw new NotFoundException('Submission not found');
    return s;
  }

  async findByUser(userId: string) {
    return this.prisma.submission.findMany({
      where: { userId },
      include: {
        assignment: { select: { id: true, title: true, dueDate: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByAssignment(assignmentId: string) {
    return this.prisma.submission.findMany({
      where: { assignmentId },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async grade(id: string, dto: GradeSubmissionDto) {
    const existing = await this.prisma.submission.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Submission not found');
    return this.prisma.submission.update({
      where: { id },
      data: { grade: dto.grade, feedback: dto.feedback },
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async remove(id: string) {
    await this.prisma.submission.delete({ where: { id } });
    return { message: 'Submission deleted' };
  }
}
