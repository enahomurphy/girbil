/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Channels1582388422085 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      create type channel_type as enum('user', 'workspace');
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "channels" (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR (255) NOT NULL,
        about TEXT,
        user_id uuid,
        owner_id uuid,
        type channel_type DEFAULT 'user',
        last_update_by uuid,
        created_at TIMESTAMP,
        updated_at TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (last_update_by) REFERENCES users(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('channels');
  }
}
