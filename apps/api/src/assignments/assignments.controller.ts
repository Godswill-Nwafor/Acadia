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
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

interface JwtUser {
  id: string;
  email: string;
  role: string;
}

@UseGuards(JwtAuthGuard)
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // Lecturer creates an assignment (lecturerId from JWT)
  @Post()
  create(@Req() req: { user: JwtUser }, @Body() dto: CreateAssignmentDto) {
    return this.assignmentsService.create({ ...dto, lecturerId: req.user.id });
  }

  // My assignments — for students shows course assignments, for lecturers shows own
  @Get('my')
  findMy(@Req() req: { user: JwtUser }) {
    return this.assignmentsService.findByLecturer(req.user.id);
  }

  @Get()
  findAll() {
    return this.assignmentsService.findAll();
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.assignmentsService.findByCourse(courseId);
  }

  @Get('lecturer/:lecturerId')
  findByLecturer(@Param('lecturerId') lecturerId: string) {
    return this.assignmentsService.findByLecturer(lecturerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentsService.update(id, updateAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(id);
  }
}
