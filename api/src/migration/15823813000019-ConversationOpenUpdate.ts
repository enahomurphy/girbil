/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConversationOpenUpdate15823813000019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS conversations_creator_id_receiver_id_organization_id_receiv_idx;
      CREATE INDEX ON conversations ("organization_id");
      CREATE UNIQUE INDEX ON conversations ("organization_id", "id");
    `);

    await queryRunner.query(`
      ALTER TABLE conversations DROP IF EXISTS open;
      ALTER TABLE conversations
        ADD COLUMN IF NOT EXISTS closed uuid[] default array[]::uuid[];
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE conversations DROP closed;
    `);
  }
}
