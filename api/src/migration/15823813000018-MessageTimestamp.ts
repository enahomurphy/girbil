/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class MessageTimestamp15823813000018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE messages
      ALTER created_at TYPE timestamptz USING created_at AT TIME ZONE 'UTC'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE messages
      ALTER created_at TYPE timestamp USING created_at AT TIME ZONE 'UTC'
    `);
  }
}
