import { RequestHandler } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";

// Get all projects
export const MultimediaGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('multimedia').select('*');
  return res.json(sqlQuery);
};
