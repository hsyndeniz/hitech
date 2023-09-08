import { IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
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
