// 
import { RequestHandler } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";

// Get all applications
export const ApplicationsGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('applications').select('*');
  return res.json(sqlQuery);
};
