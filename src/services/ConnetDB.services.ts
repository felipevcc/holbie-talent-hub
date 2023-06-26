/*
  - Create and test the MYSQL connection
*/

import { knex, Knex } from 'knex';

const dbConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    typeCast: true
  }
};

const dbName: string = process.env.DB_NAME as string;

export const knexInstance = knex(dbConfig);

export default async function connectDB() {
  try {
    await knexInstance.raw('SELECT 1');
    console.log(`✅ [32mConnected[39m DB 📄 ${dbName}`);
  } catch (error: any) {
    console.error(`❌ [31mError[39m DB 📄 ${dbName}`, error.message);
  }
}
