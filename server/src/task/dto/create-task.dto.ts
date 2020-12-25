import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsOptional()
  user: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum({ Film: 'Film', Serial: 'Serial' })
  @IsNotEmpty()
  whatWatch: 'Film' | 'Serial';

  @IsInt()
  @IsNotEmpty()
  time: number;

  @IsArray()
  @IsNotEmpty()
  tags: string[];

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;
}
