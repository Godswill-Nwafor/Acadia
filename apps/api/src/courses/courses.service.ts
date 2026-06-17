import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({
      data: createCourseDto,
      include: {
        department: true,
        lecturer: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.course.findMany({
      include: {
        department: { include: { faculty: true } },
        lecturer: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        _count: { select: { enrollments: true, assignments: true } },
      },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        department: { include: { faculty: true } },
        lecturer: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        _count: {
          select: { enrollments: true, assignments: true, materials: true },
        },
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async findByDepartment(departmentId: string) {
    return this.prisma.course.findMany({
      where: { departmentId },
      include: {
        lecturer: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  async findByLecturer(lecturerId: string) {
    return this.prisma.course.findMany({
      where: { lecturerId },
      include: {
        department: true,
        _count: { select: { enrollments: true, assignments: true } },
      },
    });
  }

  async findEnrolledCourses(userId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            lecturer: { select: { id: true, firstName: true, lastName: true } },
            department: { select: { id: true, name: true } },
            _count: { select: { assignments: true, materials: true } },
          },
        },
      },
    });
    return enrollments.map((e) => e.course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const existing = await this.prisma.course.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Course not found');
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
      include: {
        department: true,
        lecturer: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.course.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Course not found');
    await this.prisma.course.delete({ where: { id } });
    return { message: 'Course deleted successfully' };
  }
}
