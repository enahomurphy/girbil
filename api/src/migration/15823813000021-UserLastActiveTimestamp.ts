/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserLastActiveTimestamp15823813000020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE users
      ALTER last_active TYPE timestamptz USING last_active AT TIME ZONE 'UTC'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE users
        ALTER last_active TYPE timestamp USING last_active AT TIME ZONE 'UTC'
    `);
  }
}
