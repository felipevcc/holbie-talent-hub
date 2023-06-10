import { RequestHandler } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";

// Get all messages
export const MessagesGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('messages').select('*');
  return res.json(sqlQuery);
};
