import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'your_database_name',     
  process.env.DB_USER || 'your_username',         
  process.env.DB_PASSWORD || 'your_password',     
  {
    host: process.env.DB_HOST || 'localhost',    
    dialect: 'postgres',                           
    logging: false,                                 
  }
);

export default sequelize;