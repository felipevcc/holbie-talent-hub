import { RequestHandler } from "express";
import { query } from "../services/ConnetDB.services";

export const RatingsGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('SELECT * FROM ratings');
  return res.json(sqlQuery);
};
