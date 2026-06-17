import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post('mark')
  mark(@Body() body: { userId: string; courseId: string; status: 'present' | 'absent' | 'late'; date?: string }) {
    return this.service.markAttendance(body.userId, body.courseId, body.status, body.date);
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) { return this.service.findByCourse(courseId); }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) { return this.service.findByUser(userId); }

  @Get('course/:courseId/date/:date')
  findByCourseAndDate(@Param('courseId') courseId: string, @Param('date') date: string) {
    return this.service.findByCourseAndDate(courseId, date);
  }

  @Get('user/:userId/stats')
  getStats(@Param('userId') userId: string) { return this.service.getStats(userId); }
}
