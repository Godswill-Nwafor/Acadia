import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import {
  CreateSubmissionDto,
  GradeSubmissionDto,
} from './dto/create-submission.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

interface JwtUser {
  id: string;
  email: string;
  role: string;
}

@UseGuards(JwtAuthGuard)
@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly service: SubmissionsService) {}

  // Student submits — userId always comes from JWT, not body
  @Post()
  create(@Req() req: { user: JwtUser }, @Body() dto: CreateSubmissionDto) {
    return this.service.create({ ...dto, userId: req.user.id });
  }

  // Student: get my own submissions
  @Get('my')
  findMy(@Req() req: { user: JwtUser }) {
    return this.service.findByUser(req.user.id);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get('assignment/:assignmentId')
  findByAssignment(@Param('assignmentId') assignmentId: string) {
    return this.service.findByAssignment(assignmentId);
  }

  // Lecturer grades a submission
  @Patch(':id/grade')
  grade(@Param('id') id: string, @Body() dto: GradeSubmissionDto) {
    return this.service.grade(id, dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
