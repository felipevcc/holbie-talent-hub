import { RequestHandler } from "express";
import { query } from "../services/ConnetDB.services";

export const Company_profilesGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('SELECT * FROM company_profiles');
  return res.json(sqlQuery);
};
