import { RequestHandler } from "express";
import { query } from "../services/ConnetDB.services";

export const ApplicationsGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('SELECT * FROM applications');
  return res.json(sqlQuery);
};
