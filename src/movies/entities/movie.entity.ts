import { Genre } from 'src/genres/entities/genre.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movie extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'release_date', type: 'timestamp' })
  releaseDate: Date;

  @ManyToOne(() => Genre, { eager: true })
  @JoinColumn({ name: 'genre', referencedColumnName: 'id' })
  genre: number;
}
