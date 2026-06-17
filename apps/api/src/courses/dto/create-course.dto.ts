import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  code!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(100)
  @Max(900)
  level!: number;

  @IsNumber()
  @Min(1)
  credits!: number;

  @IsString()
  departmentId!: string;

  @IsOptional()
  @IsString()
  lecturerId?: string;
}
