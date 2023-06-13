import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";

// Get all messages
export const MessagesGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('messages').select('*');
  return res.json(sqlQuery);
};
