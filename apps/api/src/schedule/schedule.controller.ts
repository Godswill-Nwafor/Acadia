import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Post()
  create(
    @Body() body: { courseId: string; dayOfWeek: number; startTime: string; endTime: string; venue?: string },
  ) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('day/:dayOfWeek')
  findByDay(@Param('dayOfWeek') day: string) {
    return this.service.findByDay(Number(day));
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.service.findByCourse(courseId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<{ dayOfWeek: number; startTime: string; endTime: string; venue: string }>,
  ) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
