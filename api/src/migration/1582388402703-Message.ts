/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Message1582388402703 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "messages" (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        type VARCHAR (255) NOT NULL,
        user_id uuid,
        url VARCHAR (255),
        text TEXT,
        created_at TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE IF EXIST "messages"');
  }
}
