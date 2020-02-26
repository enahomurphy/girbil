/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Message1582388402703 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "messages" (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
        user_id uuid NOT NULL,
        conversation_id uuid NOT NULL,
        url VARCHAR (255) NULL,
        thumbnail VARCHAR (255) NULL,
        parent_id uuid NULL,
        text TEXT NULL,
        created_at TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (conversation_id) REFERENCES conversations(id),
        FOREIGN KEY (parent_id) REFERENCES messages(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('messages');
  }
}
