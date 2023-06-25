import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let sequelize: Sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PW) {
    throw new Error('DB_NAME, DB_USER, and DB_PW must be provided in the environment variables if JAWSDB_URL is not available.');
  }

  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  });
}

export default sequelize;
