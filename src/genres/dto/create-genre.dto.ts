import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class CreateGenreDto {
  @ApiProperty({ example: 'Sci-Fi' })
  @IsNotEmpty()
  @Validate(IsNotExist, ['Genre'], {
    message: 'genre already exists',
  })
  name: string;
}
