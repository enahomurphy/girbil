
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class TeamChannel1582381400007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "team_channels" (
        "channel_id" uuid,
        "team_id" uuid,
        "accepted" boolean DEFAULT false,
        PRIMARY KEY ("channel_id", "team_id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('team_channels');
  }
}
