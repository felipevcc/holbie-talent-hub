import { RequestHandler } from "express";
import { query } from "../services/ConnetDB.services";

export const MessagesGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('SELECT * FROM messages');
  return res.json(sqlQuery);
};
