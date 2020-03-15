/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CHecks1582381400011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE "teams" ADD FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id");

      ALTER TABLE "teams" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
      
      ALTER TABLE "user_teams" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
      
      ALTER TABLE "user_teams" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");
      
      ALTER TABLE "user_organizations" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
      
      ALTER TABLE "user_organizations" ADD FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id");
      
      ALTER TABLE "team_channels" ADD FOREIGN KEY ("channel_id") REFERENCES "channels" ("id");
      
      ALTER TABLE "team_channels" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");


      
      ALTER TABLE "conversations" ADD FOREIGN KEY ("creator_id") REFERENCES "users" ("id");
            
      ALTER TABLE "conversations" ADD FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id");
      
      ALTER TABLE "messages" ADD FOREIGN KEY ("sender_id") REFERENCES "users" ("id");
      
      ALTER TABLE "messages" ADD FOREIGN KEY ("conversation_id") REFERENCES "conversations" ("id");
      
      ALTER TABLE "messages" ADD FOREIGN KEY ("parent_id") REFERENCES "messages" ("id");
      
      CREATE INDEX ON "teams" ("organization_id");
      
      CREATE INDEX ON "teams" ("user_id");
      
      CREATE INDEX ON "conversations" ("creator_id", "receiver_id");
    `);
  }

  public async down(): Promise<any> {}
}
