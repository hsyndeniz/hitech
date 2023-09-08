import { NestFactory } from '@nestjs/core';
import { MovieSeedService } from './movie/movie-seed.service';
import { GenreSeedService } from './genre/genre-seed.service';
import { SeedModule } from './seed.module';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(GenreSeedService).run();

  await app.get(MovieSeedService).run();

  await app.close();
};

void runSeed();
