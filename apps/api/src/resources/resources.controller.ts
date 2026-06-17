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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

interface JwtUser {
  id: string;
  email: string;
  role: string;
}

@UseGuards(JwtAuthGuard)
@Controller('resources')
export class ResourcesController {
  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // Upload a file — multipart/form-data with fields: title, type, courseId
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string; type: string; courseId: string },
    @Req() req: { user: JwtUser },
  ) {
    if (!file) throw new BadRequestException('No file provided');
    const fileUrl = await this.cloudinaryService.uploadFile(
      file,
      'acadia/resources',
    );
    return this.resourcesService.create({
      title: body.title,
      fileUrl,
      type: body.type || file.mimetype,
      courseId: body.courseId,
      uploadedBy: req.user.id,
    });
  }

  // Create with an existing URL (e.g. external link)
  @Post()
  create(@Req() req: { user: JwtUser }, @Body() dto: CreateResourceDto) {
    return this.resourcesService.create({ ...dto, uploadedBy: req.user.id });
  }

  @Get()
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.resourcesService.findByCourse(courseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateResourceDto) {
    return this.resourcesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }
}
