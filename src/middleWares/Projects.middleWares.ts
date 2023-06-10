import { RequestHandler } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";

// Get all projects
export const ProjectsGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('projects').select('*');
  return res.json(sqlQuery);
};
