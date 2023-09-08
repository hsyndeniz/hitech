import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/genres/entities/genre.entity';
import { GenreSeedService } from './genre-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  providers: [GenreSeedService],
  exports: [GenreSeedService],
})
export class GenreSeedModule {}
