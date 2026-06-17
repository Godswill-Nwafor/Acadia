import { Injectable } from '@nestjs/common';

export interface AttendanceRecord {
  id: string;
  userId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

@Injectable()
export class AttendanceService {
  private records: AttendanceRecord[] = [];
  private counter = 0;

  async markAttendance(userId: string, courseId: string, status: 'present' | 'absent' | 'late', date?: string): Promise<AttendanceRecord> {
    const record: AttendanceRecord = {
      id: `att_${++this.counter}`,
      userId,
      courseId,
      date: date || new Date().toISOString().split('T')[0],
      status,
    };
    this.records.push(record);
    return record;
  }

  async findByCourse(courseId: string): Promise<AttendanceRecord[]> {
    return this.records.filter(r => r.courseId === courseId);
  }

  async findByUser(userId: string): Promise<AttendanceRecord[]> {
    return this.records.filter(r => r.userId === userId);
  }

  async findByCourseAndDate(courseId: string, date: string): Promise<AttendanceRecord[]> {
    return this.records.filter(r => r.courseId === courseId && r.date === date);
  }

  async getStats(userId: string) {
    const userRecords = this.records.filter(r => r.userId === userId);
    const total = userRecords.length;
    const present = userRecords.filter(r => r.status === 'present').length;
    const absent = userRecords.filter(r => r.status === 'absent').length;
    const late = userRecords.filter(r => r.status === 'late').length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    return { total, present, absent, late, percentage };
  }
}
