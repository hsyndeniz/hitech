import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'Sci-Fi' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'A movie about space' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  @IsNotEmpty()
  releaseDate: Date;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  genre: number;
}
