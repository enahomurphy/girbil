require('dotenv').config();

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: ['development', 'test'].includes(process.env.NODE_ENV) ? [] : [],
  entities: [
    'dist/src/entity/**/*.js',
  ],
  migrations: [
    'dist/src/migration/**/*.js',
  ],
  subscribers: [
    'dist/src/subscriber/**/*.js',
  ],
  seeds: ['dist/src/seed/seeders/*.js'],
  factories: ['dist/src/seed/factories/*.js'],
  cli: {
    entitiesDir: 'dist/src/entity',
    migrationsDir: 'dist/src/migration',
    subscribersDir: 'dist/src/subscriber',
  },
};
