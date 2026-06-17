import { IsString, IsOptional } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  dueDate!: string;

  @IsString()
  courseId!: string;

  @IsString()
  lecturerId!: string;
}
