/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class GroupUser1582388472085 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "group_users" (
        user_id uuid,
        group_id uuid,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (group_id) REFERENCES groups(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE IF EXIST "group_users"');
  }
}
