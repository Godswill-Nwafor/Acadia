import { IsString, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content!: string;

  @IsString()
  senderId!: string;

  @IsOptional()
  @IsString()
  groupId?: string;
}
