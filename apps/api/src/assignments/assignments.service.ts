import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    return this.prisma.assignment.create({
      data: {
        ...createAssignmentDto,
        dueDate: new Date(createAssignmentDto.dueDate),
      },
      include: {
        course: { select: { id: true, code: true, title: true } },
        lecturer: { select: { id: true, firstName: true, lastName: true } },
        _count: { select: { submissions: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.assignment.findMany({
      include: {
        course: { select: { id: true, code: true, title: true } },
        lecturer: { select: { id: true, firstName: true, lastName: true } },
        _count: { select: { submissions: true } },
      },
      orderBy: { dueDate: 'asc' },
    });
  }

  async findOne(id: string) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id },
      include: {
        course: { select: { id: true, code: true, title: true, level: true } },
        lecturer: { select: { id: true, firstName: true, lastName: true } },
        submissions: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async findByCourse(courseId: string) {
    return this.prisma.assignment.findMany({
      where: { courseId },
      include: {
        _count: { select: { submissions: true } },
      },
      orderBy: { dueDate: 'asc' },
    });
  }

  async findByLecturer(lecturerId: string) {
    return this.prisma.assignment.findMany({
      where: { lecturerId },
      include: {
        course: { select: { id: true, code: true, title: true } },
        _count: { select: { submissions: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, updateAssignmentDto: UpdateAssignmentDto) {
    const existing = await this.prisma.assignment.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Assignment not found');
    return this.prisma.assignment.update({
      where: { id },
      data: {
        ...updateAssignmentDto,
        ...(updateAssignmentDto.dueDate
          ? { dueDate: new Date(updateAssignmentDto.dueDate) }
          : {}),
      },
      include: {
        course: true,
        lecturer: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.assignment.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Assignment not found');
    await this.prisma.assignment.delete({ where: { id } });
    return { message: 'Assignment deleted successfully' };
  }
}
