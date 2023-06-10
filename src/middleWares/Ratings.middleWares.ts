import { RequestHandler } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";

// Get all skills
export const RatingsGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('ratings').select('*');
  return res.json(sqlQuery);
};
