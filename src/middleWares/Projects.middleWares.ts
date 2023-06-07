import { RequestHandler } from "express";
import { query } from "../services/ConnetDB.services";

export const ProjectsGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('SELECT * FROM projects');
  return res.json(sqlQuery);
};
