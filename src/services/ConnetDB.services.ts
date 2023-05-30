/*
  - Create and test the MYSQL connection
*/
import { PoolOptions, createPool } from "mysql2/promise";

const Options: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

function getDatabaseNames(): string[] {
  const dbNames: string[] = [];

  for (const variable of Object.keys(process.env)) {
    if (variable.startsWith('DB_NAME') && process.env[variable]) {
      dbNames.push(process.env[variable]!);
    }
  }

  return dbNames;
}

const Default_DB = process.env[getDatabaseNames()[0]] as string;

const conn = getDatabaseNames().map((dbName) => ({
  [dbName]: createPool({ ...Options, database: dbName })
})).reduce((prev, curr) => ({ ...prev, ...curr }), {});


export default async function connectDB() {
  return await Promise.all(
    Object.entries(conn).map(([db, con]) => con.getConnection()
      .then((conn: any) => {
        conn.release();
        console.log(`✅ [32mConnected[39m DB 📄 ${db}`);
      })
      .catch((err: any) => console.error(`❌ [31mError[39m DB 📄 ${db}`, err.sqlMessage))
  ))
}

/**
 * function created to facilitate the query in the other methods of the api
 * @param {string} sql query in sql language
 * @param params query parameters
 * @return the response from the database
 */
export async function query(sql: string, params?: any, DBname: string = Default_DB) {
  let db = DBname;
  if (typeof params === 'string') db = params;

  return await conn[db as keyof typeof conn].query(sql, params);
}
