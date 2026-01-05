import { IsString, IsEnum, IsOptional, IsArray, IsUUID } from 'class-validator';
import { BoardCategory } from '../../../entities/board.entity';

export class CreateBoardDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsEnum(BoardCategory)
  category: BoardCategory;

  @IsOptional()
  @IsUUID()
  authorId?: string;

  @IsOptional()
  @IsString()
  authorName?: string;

  @IsOptional()
  @IsArray()
  attachments?: { name: string; url: string }[];
}

export class UpdateBoardDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsEnum(BoardCategory)
  category?: BoardCategory;

  @IsOptional()
  @IsArray()
  attachments?: { name: string; url: string }[];
}
