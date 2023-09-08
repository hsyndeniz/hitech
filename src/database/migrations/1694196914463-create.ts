import { MigrationInterface, QueryRunner } from 'typeorm';

export class Create1694196914463 implements MigrationInterface {
  name = 'Create1694196914463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie" DROP CONSTRAINT "movie_genre_fkey"`,
    );
    await queryRunner.query(`ALTER TABLE "genre" DROP CONSTRAINT "genre_name"`);
    await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "movie_pkey"`);
    await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "movie" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "movie" ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ALTER COLUMN "genre" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ADD CONSTRAINT "FK_f09ef079f8e23f83184204346a7" FOREIGN KEY ("genre") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie" DROP CONSTRAINT "FK_f09ef079f8e23f83184204346a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ALTER COLUMN "genre" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"`,
    );
    await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "movie" ADD "id" BIGSERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "movie" ADD CONSTRAINT "movie_pkey" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre" ADD CONSTRAINT "genre_name" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ADD CONSTRAINT "movie_genre_fkey" FOREIGN KEY ("genre") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
