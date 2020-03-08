/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserConversationView1582381400013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `
      CREATE VIEW user_conversation_view AS
        SELECT 
            id,
            creator_id,
            receiver_id,
            organization_id,
            receiver_type,
            created_at,
            NULL as channel_id,
            NULL as user_id
        FROM
            conversations
        WHERE 
            (receiver_type = 'user')

        UNION

        SELECT 
            id,
            creator_id,
            receiver_id,
            organization_id,
            receiver_type,
            created_at,
            channel_user.channel_id as channel_id,
            channel_user.user_id as user_id
        FROM
            conversations
        LEFT JOIN channel_users as channel_user ON channel_user.channel_id = receiver_id AND receiver_type = 'channel'
        WHERE 
            (receiver_type = 'channel')
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropView('user_conversation_view');
  }
}
