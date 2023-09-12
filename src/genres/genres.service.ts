import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { NullableType } from 'src/utils/types/nullable.type';
import { PrismaService } from 'src/prisma/prisma.service';
import { Genre } from '@prisma/client';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  create(genre: string): Promise<Genre> {
    return this.prisma.genre.create({
      data: { name: genre },
    });
  }

  findAll(paginationOptions: IPaginationOptions): Promise<Genre[]> {
    return this.prisma.genre.findMany({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(id: number): Promise<NullableType<Genre>> {
    return this.prisma.genre.findUnique({
      where: { id },
    });
  }

  remove(id: Genre['id']): Promise<any> {
    return this.prisma.genre.delete({
      where: { id },
    });
  }
}
