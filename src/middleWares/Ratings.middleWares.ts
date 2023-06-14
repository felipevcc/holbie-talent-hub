import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";

// Returns all the ratings
export const RatingsGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('ratings').select('*');
  res.json(sqlQuery);
};
