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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

interface JwtUser {
  id: string;
  email: string;
  role: string;
}

@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Returns enrolled courses for students, taught courses for lecturers
  @Get('my')
  findMy(@Req() req: { user: JwtUser }) {
    if (req.user.role === 'LECTURER') {
      return this.coursesService.findByLecturer(req.user.id);
    }
    return this.coursesService.findEnrolledCourses(req.user.id);
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('department/:departmentId')
  findByDepartment(@Param('departmentId') departmentId: string) {
    return this.coursesService.findByDepartment(departmentId);
  }

  @Get('lecturer/:lecturerId')
  findByLecturer(@Param('lecturerId') lecturerId: string) {
    return this.coursesService.findByLecturer(lecturerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
