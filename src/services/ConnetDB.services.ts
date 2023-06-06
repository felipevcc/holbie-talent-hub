/*
  - Create and test the MYSQL connection
*/
import { PoolOptions, createPool } from "mysql2/promise";

const Options: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}

const dbName: string = process.env.DB_NAME as string;

const conn = {
  [dbName]: createPool(Options)
};

export default async function connectDB() {
  const con = conn[dbName];

  try {
    const connection = await con.getConnection();
    connection.release();
    console.log(`✅ [32mConnected[39m DB 📄 ${dbName}`);
  } catch (err: any) {
    console.error(`❌ [31mError[39m DB 📄 ${dbName}`, err.sqlMessage);
  }
}

/**
 * function created to facilitate the query in the other methods of the api
 * @param {string} sql query in sql language
 * @param params query parameters
 * @return the response from the database
 */
export async function query(sql: string, params?: any, DBname: string = dbName) {
  const [rows] = await conn[DBname].query(sql, params);
  return rows;
}
