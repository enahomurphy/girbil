/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChannelTsv1582381400014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE channels ADD COLUMN tsv tsvector;',
    );

    await queryRunner.query(
      `
        CREATE OR REPLACE FUNCTION 
          channels_tsv_trigger_func() RETURNS trigger AS $$
          begin
            new.tsv :=
              setweight(to_tsvector('pg_catalog.english', coalesce(new.name,'')), 'A') ||
              setweight(to_tsvector('pg_catalog.english', coalesce(new.about,'')), 'D');
            return new;
          end
        $$ LANGUAGE plpgsql;
      `,
    );

    await queryRunner.query(
      `
        DROP TRIGGER IF EXISTS
          channel_tsv_vector 
        ON 
          services;

        CREATE TRIGGER 
          channel_ts_vector
        BEFORE INSERT OR UPDATE ON
          channels
        FOR EACH ROW EXECUTE PROCEDURE
        channels_tsv_trigger_func();
      `,
    );

    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS tsv_idx ON channels USING gin(tsv);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('channels', 'tsv');
    await queryRunner.dropIndex('channels', 'tsv_idx');
  }
}
