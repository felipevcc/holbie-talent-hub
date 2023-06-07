import { RequestHandler } from "express";
import { query } from "../services/ConnetDB.services";

export const MultimediaGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('SELECT * FROM multimedia');
  return res.json(sqlQuery);
};
