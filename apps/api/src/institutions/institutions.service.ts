import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InstitutionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; domain: string; logo?: string }) {
    return this.prisma.institution.create({ data });
  }

  async findAll() {
    return this.prisma.institution.findMany({
      include: { _count: { select: { faculties: true, users: true } } },
    });
  }

  async findOne(id: string) {
    const inst = await this.prisma.institution.findUnique({
      where: { id },
      include: { faculties: { include: { _count: { select: { departments: true } } } } },
    });
    if (!inst) throw new NotFoundException('Institution not found');
    return inst;
  }

  async findByDomain(domain: string) {
    return this.prisma.institution.findUnique({
      where: { domain },
      include: { faculties: { include: { departments: true } } },
    });
  }

  async update(id: string, data: { name?: string; domain?: string; logo?: string }) {
    return this.prisma.institution.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.prisma.institution.delete({ where: { id } });
    return { message: 'Institution deleted' };
  }

  // Faculties
  async createFaculty(data: { name: string; institutionId: string }) {
    return this.prisma.faculty.create({ data });
  }

  async getFaculties(institutionId: string) {
    return this.prisma.faculty.findMany({
      where: { institutionId },
      include: { _count: { select: { departments: true } } },
    });
  }

  // Departments
  async createDepartment(data: { name: string; facultyId: string }) {
    return this.prisma.department.create({ data });
  }

  async getDepartments(facultyId: string) {
    return this.prisma.department.findMany({ where: { facultyId } });
  }

  // Enrollments
  async enrollUser(userId: string, courseId: string) {
    return this.prisma.enrollment.create({ data: { userId, courseId } });
  }

  async getEnrollments(userId: string) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: { course: { include: { lecturer: { select: { id: true, firstName: true, lastName: true } } } } },
    });
  }

  async getCourseEnrollments(courseId: string) {
    return this.prisma.enrollment.findMany({
      where: { courseId },
      include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
    });
  }

  async unenroll(userId: string, courseId: string) {
    await this.prisma.enrollment.delete({ where: { userId_courseId: { userId, courseId } } });
    return { message: 'Unenrolled successfully' };
  }
}
