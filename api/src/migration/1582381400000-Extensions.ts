/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Extensions1582381400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp"');
  }
}
