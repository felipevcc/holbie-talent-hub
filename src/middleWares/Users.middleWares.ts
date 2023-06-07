import { RequestHandler } from "express";
import { query } from "../services/ConnetDB.services";

export const UsersGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('SELECT * from users');
  return res.json(sqlQuery);
};
