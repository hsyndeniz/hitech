import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { MovieSeedService } from './movie-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MovieSeedService],
  exports: [MovieSeedService],
})
export class MovieSeedModule {}
