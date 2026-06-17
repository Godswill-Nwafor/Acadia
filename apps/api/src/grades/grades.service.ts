import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

function computeGrade(total: number): { grade: string; points: number } {
  if (total >= 70) return { grade: 'A', points: 5.0 };
  if (total >= 60) return { grade: 'B', points: 4.0 };
  if (total >= 50) return { grade: 'C', points: 3.0 };
  if (total >= 45) return { grade: 'D', points: 2.0 };
  if (total >= 40) return { grade: 'E', points: 1.0 };
  return { grade: 'F', points: 0.0 };
}

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  async upsertGrade(data: {
    userId: string;
    courseId: string;
    semester: string;
    ca: number;
    exam: number;
  }) {
    const total = data.ca + data.exam;
    const { grade, points } = computeGrade(total);

    return this.prisma.grade.upsert({
      where: {
        userId_courseId_semester: {
          userId: data.userId,
          courseId: data.courseId,
          semester: data.semester,
        },
      },
      update: { ca: data.ca, exam: data.exam, total, grade, points },
      create: { ...data, total, grade, points },
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
        course: {
          select: { id: true, code: true, title: true, credits: true },
        },
      },
    });
  }

  async findByUser(userId: string, semester?: string) {
    return this.prisma.grade.findMany({
      where: { userId, ...(semester ? { semester } : {}) },
      include: {
        course: {
          select: { id: true, code: true, title: true, credits: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCourse(courseId: string, semester?: string) {
    return this.prisma.grade.findMany({
      where: { courseId, ...(semester ? { semester } : {}) },
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { total: 'desc' },
    });
  }

  async getCGPA(userId: string, semester?: string) {
    const grades = await this.prisma.grade.findMany({
      where: { userId, ...(semester ? { semester } : {}) },
      include: { course: { select: { credits: true } } },
    });

    if (!grades.length) return { cgpa: 0, totalCredits: 0, gradePoints: 0 };

    const totalCredits = grades.reduce((sum, g) => sum + g.course.credits, 0);
    const gradePoints = grades.reduce(
      (sum, g) => sum + g.points * g.course.credits,
      0,
    );
    const cgpa =
      totalCredits > 0
        ? parseFloat((gradePoints / totalCredits).toFixed(2))
        : 0;

    return { cgpa, totalCredits, gradePoints, grades };
  }

  async remove(id: string) {
    const existing = await this.prisma.grade.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Grade not found');
    await this.prisma.grade.delete({ where: { id } });
    return { message: 'Grade deleted' };
  }
}
