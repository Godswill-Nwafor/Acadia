import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Body,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import {
  CreateEnrollmentDto,
  UpdateProgressDto,
} from './dto/create-enrollment.dto';

interface JwtUser {
  id: string;
  email: string;
  role: string;
}

@UseGuards(JwtAuthGuard)
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly service: EnrollmentsService) {}

  // Student enrolls in a course (userId from JWT)
  @Post()
  enroll(@Req() req: { user: JwtUser }, @Body() dto: CreateEnrollmentDto) {
    return this.service.enroll(req.user.id, dto.courseId);
  }

  // Student unenrolls from a course
  @Delete(':courseId')
  unenroll(@Req() req: { user: JwtUser }, @Param('courseId') courseId: string) {
    return this.service.unenroll(req.user.id, courseId);
  }

  // Get my enrollments (courses I'm in)
  @Get('my')
  myEnrollments(@Req() req: { user: JwtUser }) {
    return this.service.findByUser(req.user.id);
  }

  // Check if enrolled in a specific course
  @Get('check/:courseId')
  isEnrolled(
    @Req() req: { user: JwtUser },
    @Param('courseId') courseId: string,
  ) {
    return this.service.isEnrolled(req.user.id, courseId);
  }

  // Lecturer: get all students enrolled in a course
  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.service.findByCourse(courseId);
  }

  // Update progress in a course
  @Patch(':courseId/progress')
  updateProgress(
    @Req() req: { user: JwtUser },
    @Param('courseId') courseId: string,
    @Body() dto: UpdateProgressDto,
  ) {
    return this.service.updateProgress(req.user.id, courseId, dto.progress);
  }
}
