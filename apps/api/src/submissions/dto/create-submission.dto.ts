import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateSubmissionDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsString()
  userId!: string;

  @IsString()
  assignmentId!: string;
}

export class GradeSubmissionDto {
  @IsNumber()
  grade!: number;

  @IsOptional()
  @IsString()
  feedback?: string;
}
