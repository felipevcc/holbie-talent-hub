import { RequestHandler } from "express";
import { query } from "../services/ConnetDB.services";

export const ContactsGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('SELECT * FROM contacts');
  return res.json(sqlQuery);
};
