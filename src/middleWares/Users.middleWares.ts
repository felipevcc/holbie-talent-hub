import { RequestHandler } from "express";
import { query } from "../services/ConnetDB.services";
import { User } from "../types/users.d";

// Returns all the users
export const UsersGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('SELECT * FROM users') as User[];
  return res.json(sqlQuery);
};

// Returns the user with the given user_id
export const UserGet: RequestHandler = async (_req, res) => {
  const { user_id } = _req.params;
  const sqlQuery = await query(
    'SELECT * FROM users \
    WHERE user_id = ?', [user_id]
  ) as User[];
  return res.json(sqlQuery[0]);
};

/*export const UsersPost: RequestHandler = async (req, res) => {
  const { name, email } = req.body;
  const sqlQuery = await query(`INSERT INTO users (name, email) VALUES ('${name}', '${email}')`);
  return res.json(sqlQuery);
}*/
