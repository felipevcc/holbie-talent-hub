import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";

// Returns all the skills
export const SkillsGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('skills').select('*');
  return res.json(sqlQuery);
};
