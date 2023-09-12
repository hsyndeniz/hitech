import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './home/home.module';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    HomeModule,
    MoviesModule,
    GenresModule,
  ],
})
export class AppModule {}
