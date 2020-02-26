module.exports = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'root',
  password: 'girbil',
  database: 'girbil',
  synchronize: false,
  logging: ['query'],
  entities: [
    'src/entity/**/*.ts',
  ],
  migrations: [
    'src/migration/**/*.ts',
  ],
  subscribers: [
    'src/subscriber/**/*.ts',
  ],
  seeds: ['src/seed/seeders/*.ts'],
  factories: ['src/seed/factories/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
