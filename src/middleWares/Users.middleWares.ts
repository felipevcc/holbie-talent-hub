import { RequestHandler } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { User } from "../types/users.d";

// Returns all the users
export const UsersGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('users').select('*') as User[];
  return res.json(sqlQuery);
};

// Returns the user with the given user_id
export const UserGet: RequestHandler = async (_req, res) => {
  const { user_id } = _req.params;
  const sqlQuery = await query('users')
    .select('*')
    .where('user_id', user_id) as User[];
  return res.json(sqlQuery[0]);
};

/*export const UsersPost: RequestHandler = async (req, res) => {
  const { name, email } = req.body;
  const sqlQuery = await query(`INSERT INTO users (name, email) VALUES ('${name}', '${email}')`);
  return res.json(sqlQuery);
}*/
