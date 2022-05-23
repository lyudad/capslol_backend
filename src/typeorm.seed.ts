import 'dotenv/config';

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

const seedConfig = {
  type: 'mysql',
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT, 10),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  // These two lines have been added:
  seeds: ['dist/**/seeding/seeds/**/*.js'],
  factories: ['dist/**/seeding/factories/**/*.js'],
};

export default seedConfig;
