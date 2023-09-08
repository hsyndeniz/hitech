import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.save(
      this.movieRepository.create(createMovieDto),
    );
  }

  findAll(paginationOptions: IPaginationOptions): Promise<Movie[]> {
    return this.movieRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Movie>): Promise<NullableType<Movie>> {
    return this.movieRepository.findOne({
      where: fields,
    });
  }

  searchByTitle(title: string): Promise<Movie[]> {
    return this.movieRepository.find({
      where: {
        title: Like(`%${title}%`),
      },
    });
  }

  searchByGenre(genre: number, paginationOptions: IPaginationOptions) {
    return this.movieRepository.find({
      where: {
        genre,
      },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  update(id: number, updateMovieDto: UpdateMovieDto): Promise<UpdateResult> {
    return this.movieRepository.update(id, updateMovieDto);
  }

  remove(id: Movie['id']): Promise<DeleteResult> {
    return this.movieRepository.delete(id);
  }
}
