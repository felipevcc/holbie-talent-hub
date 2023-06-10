import { RequestHandler } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";

// Get all company_profiles
export const Company_profilesGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('company_profiles').select('*');
  return res.json(sqlQuery);
};
