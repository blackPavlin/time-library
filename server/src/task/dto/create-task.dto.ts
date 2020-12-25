import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
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
