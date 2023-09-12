import { Injectable } from '@nestjs/common';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateMovieDto): Promise<Movie> {
    return this.prisma.movie.create({
      data: {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        genre: {
          connect: {
            id: data.genre,
          },
        },
      },
    });
  }

  findAll(paginationOptions: IPaginationOptions): Promise<Movie[]> {
    return this.prisma.movie.findMany({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(id: number): Promise<NullableType<Movie>> {
    return this.prisma.movie.findUnique({
      where: { id },
    });
  }

  searchByTitle(title: string): Promise<Movie[]> {
    return this.prisma.movie.findMany({
      where: {
        title: {
          search: title,
        },
      },
    });
  }

  searchByGenre(genre: number, options: IPaginationOptions): Promise<Movie[]> {
    return this.prisma.movie.findMany({
      where: {
        genreId: genre,
      },
      skip: (options.page - 1) * options.limit,
      take: options.limit,
    });
  }

  update(id: number, data: UpdateMovieDto): Promise<Movie> {
    return this.prisma.movie.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        genreId: data.genre,
      },
    });
  }

  remove(id: Movie['id']): Promise<any> {
    return this.prisma.movie.delete({
      where: { id },
    });
  }
}
