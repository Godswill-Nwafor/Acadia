import { IsString } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  title!: string;

  @IsString()
  fileUrl!: string;

  @IsString()
  type!: string;

  @IsString()
  courseId!: string;

  @IsString()
  uploadedBy!: string;
}
