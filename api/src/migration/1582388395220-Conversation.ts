/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Conversation1582388395220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TYPE IF EXISTS conversation_type');
    await queryRunner.query(`
      create type conversation_type as enum('user', 'channel');
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "conversations" (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        sender_id uuid NOT NULL,
        receiver_id uuid NOT NULL,
        workspace_id uuid NOT NULL,
        type conversation_type NOT NULL,
        created_at TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users(id),
        FOREIGN KEY (workspace_id) REFERENCES workspaces(id)
      )
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX sender_receiver_type_idx ON "conversations" (sender_id, receiver_id, type);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('conversations');
  }
}
