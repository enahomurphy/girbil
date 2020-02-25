/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Conversation1582388395220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      create type conversation_type as enum('user', 'channel');
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "conversations" (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        type conversation_type DEFAULT 'user',
        sender uuid,
        receiver uuid,
        text TEXT,
        approved Boolean,
        FOREIGN KEY (sender) REFERENCES users(id)
      )
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX sender_receiver_type_idx ON "conversations" (sender, receiver, type);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('conversations');
  }
}
