import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class Genre extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
