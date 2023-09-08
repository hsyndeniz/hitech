import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/genres/entities/genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenreSeedService {
  constructor(
    @InjectRepository(Genre)
    private repository: Repository<Genre>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(this.repository.create({}));
    }
  }
}
