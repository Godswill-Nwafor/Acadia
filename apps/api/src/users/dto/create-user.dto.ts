import { IsEmail, IsString, IsOptional, IsEnum, IsNumber, Min, Max } from 'class-validator';

export enum CreateUserRole {
  STUDENT = 'STUDENT',
  LECTURER = 'LECTURER',
  DEPARTMENT_ADMIN = 'DEPARTMENT_ADMIN',
  FACULTY_ADMIN = 'FACULTY_ADMIN',
  INSTITUTION_ADMIN = 'INSTITUTION_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsOptional()
  @IsEnum(CreateUserRole)
  role?: CreateUserRole;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(900)
  level?: number;

  @IsOptional()
  @IsString()
  institutionId?: string;

  @IsOptional()
  @IsString()
  facultyId?: string;

  @IsOptional()
  @IsString()
  departmentId?: string;
}
