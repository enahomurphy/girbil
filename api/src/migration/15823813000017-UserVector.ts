/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTsv1582381400017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE users ADD COLUMN tsv tsvector;',
    );

    await queryRunner.query(
      `
        CREATE OR REPLACE FUNCTION
          users_tsv_trigger_func() RETURNS trigger AS $$
          begin
            new.tsv :=
              to_tsvector('pg_catalog.english', new.name);
            return new;
          end
        $$ LANGUAGE plpgsql;
      `,
    );

    await queryRunner.query(
      `
        DROP TRIGGER IF EXISTS
          user_tsv_vector
        ON
          services;

        CREATE TRIGGER
          user_ts_vector
        BEFORE INSERT OR UPDATE ON
          users
        FOR EACH ROW EXECUTE PROCEDURE
        users_tsv_trigger_func();
      `,
    );

    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS tsv_idx ON users USING gin(tsv);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'tsv');
    await queryRunner.dropIndex('users', 'tsv_idx');
  }
}
