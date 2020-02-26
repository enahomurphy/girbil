/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChannelsUser1582388472085 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "channel_users" (
        user_id uuid NOT NULL,
        channel_id uuid NOT NULL,
        accepted boolean DEFAULT false,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (channel_id) REFERENCES channels(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('channel_users');
  }
}
