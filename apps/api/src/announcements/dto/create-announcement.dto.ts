import { IsString, IsOptional } from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  courseId?: string;

  @IsString()
  target!: string;
}
