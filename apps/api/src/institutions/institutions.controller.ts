import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InstitutionsService } from './institutions.service';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Post()
  create(
    @Body()
    createInstitutionDto: {
      name: string;
      domain: string;
      logo?: string;
    },
  ) {
    return this.institutionsService.create(createInstitutionDto);
  }

  @Get()
  findAll() {
    return this.institutionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutionsService.findOne(id);
  }

  @Get('domain/:domain')
  findByDomain(@Param('domain') domain: string) {
    return this.institutionsService.findByDomain(domain);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateInstitutionDto: { name?: string; domain?: string; logo?: string },
  ) {
    return this.institutionsService.update(id, updateInstitutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.institutionsService.remove(id);
  }

  // Faculties
  @Post(':id/faculties')
  createFaculty(
    @Param('id') id: string,
    @Body() createFacultyDto: { name: string },
  ) {
    return this.institutionsService.createFaculty({
      ...createFacultyDto,
      institutionId: id,
    });
  }

  @Get(':id/faculties')
  getFaculties(@Param('id') id: string) {
    return this.institutionsService.getFaculties(id);
  }

  // Departments
  @Post('faculties/:facultyId/departments')
  createDepartment(
    @Param('facultyId') facultyId: string,
    @Body() createDepartmentDto: { name: string },
  ) {
    return this.institutionsService.createDepartment({
      ...createDepartmentDto,
      facultyId,
    });
  }

  @Get('faculties/:facultyId/departments')
  getDepartments(@Param('facultyId') facultyId: string) {
    return this.institutionsService.getDepartments(facultyId);
  }

  // Enrollments
  @Post('enrollments/users/:userId/courses/:courseId')
  enrollUser(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.institutionsService.enrollUser(userId, courseId);
  }

  @Get('enrollments/users/:userId')
  getEnrollments(@Param('userId') userId: string) {
    return this.institutionsService.getEnrollments(userId);
  }

  @Get('enrollments/courses/:courseId')
  getCourseEnrollments(@Param('courseId') courseId: string) {
    return this.institutionsService.getCourseEnrollments(courseId);
  }

  @Delete('enrollments/users/:userId/courses/:courseId')
  unenroll(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.institutionsService.unenroll(userId, courseId);
  }
}
