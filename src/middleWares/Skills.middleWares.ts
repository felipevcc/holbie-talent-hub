import { RequestHandler } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";

// Get all skills
export const SkillsGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('skills').select('*');
  return res.json(sqlQuery);
};
