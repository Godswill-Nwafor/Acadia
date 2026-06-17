import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { GradesService } from './grades.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('grades')
export class GradesController {
  constructor(private readonly service: GradesService) {}

  @Post()
  upsert(
    @Body() body: { userId: string; courseId: string; semester: string; ca: number; exam: number },
  ) {
    return this.service.upsertGrade(body);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string, @Query('semester') semester?: string) {
    return this.service.findByUser(userId, semester);
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string, @Query('semester') semester?: string) {
    return this.service.findByCourse(courseId, semester);
  }

  @Get('user/:userId/cgpa')
  getCGPA(@Param('userId') userId: string, @Query('semester') semester?: string) {
    return this.service.getCGPA(userId, semester);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
