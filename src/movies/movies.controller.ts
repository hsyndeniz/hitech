import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  HttpCode,
  HttpStatus,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { NullableType } from 'src/utils/types/nullable.type';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';

@ApiTags('Movies')
@Controller({
  path: 'movies',
  version: '1',
})
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<Movie>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.moviesService.findAll({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<NullableType<Movie>> {
    return this.moviesService.findOne({ id });
  }

  @Get('search/:title')
  @HttpCode(HttpStatus.OK)
  searchByTitle(@Query('title') title: string): Promise<Movie[]> {
    console.log(`title: ${title}`);
    return this.moviesService.searchByTitle(title);
  }

  @Get('search/genre/:genre')
  @HttpCode(HttpStatus.OK)
  async searchByGenre(
    @Param('genre') genre: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<Movie>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.moviesService.searchByGenre(genre, {
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<UpdateResult> {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.moviesService.remove(+id);
  }
}
