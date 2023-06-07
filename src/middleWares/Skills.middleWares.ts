import { RequestHandler } from "express";
import { query } from "../services/ConnetDB.services";

export const SkillsGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('SELECT * FROM skills');
  return res.json(sqlQuery);
};
