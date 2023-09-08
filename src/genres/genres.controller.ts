import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { Genre } from './entities/genre.entity';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { NullableType } from 'src/utils/types/nullable.type';

@ApiTags('Genres')
@Controller({
  path: 'genres',
  version: '1',
})
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<Genre>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.genresService.findAll({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<NullableType<Genre>> {
    return this.genresService.findOne({ id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.genresService.remove(id);
  }
}
