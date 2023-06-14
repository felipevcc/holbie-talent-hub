import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";

// ===============================================================
// ================ MULTIMEDIA ================
// ===============================================================

// Get all projects
export const MultimediaGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('multimedia').select('*');
  res.json(sqlQuery);
};
