import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ example: 'Sci-Fi' })
  @IsNotEmpty()
  name: string;
}
