import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  create(createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreRepository.save(
      this.genreRepository.create(createGenreDto),
    );
  }

  findAll(paginationOptions: IPaginationOptions): Promise<Genre[]> {
    return this.genreRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Genre>): Promise<NullableType<Genre>> {
    return this.genreRepository.findOne({
      where: fields,
    });
  }

  remove(id: Genre['id']): Promise<DeleteResult> {
    return this.genreRepository.delete(id);
  }
}
