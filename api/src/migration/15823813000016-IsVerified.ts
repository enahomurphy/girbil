
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ShareLink1582381400016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        ALTER TABLE "users"
        ALTER COLUMN is_verified DROP DEFAULT,
        ALTER COLUMN is_verified TYPE BOOLEAN USING is_verified::BOOLEAN,
        ALTER COLUMN is_verified SET DEFAULT FALSE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN is_verified TYPE varchar,
    `);
  }
}
