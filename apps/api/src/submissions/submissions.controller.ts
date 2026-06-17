import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto, GradeSubmissionDto } from './dto/create-submission.dto';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly service: SubmissionsService) {}

  @Post()
  create(@Body() dto: CreateSubmissionDto) { return this.service.create(dto); }

  @Get()
  findAll() { return this.service.findAll(); }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) { return this.service.findByUser(userId); }

  @Get('assignment/:assignmentId')
  findByAssignment(@Param('assignmentId') assignmentId: string) { return this.service.findByAssignment(assignmentId); }

  @Patch(':id/grade')
  grade(@Param('id') id: string, @Body() dto: GradeSubmissionDto) { return this.service.grade(id, dto); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
