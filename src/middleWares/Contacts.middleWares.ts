import { RequestHandler } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";

// Returns all the professional profile contacts with the given profile_id
export const ProfessionalContactsGet: RequestHandler = async (_req, res) => {
  const { profile_id } = _req.params;
  const sqlQuery = await query('professional_profile_contacts')
    .select('*')
    .where('profile_id', profile_id);
  return res.json(sqlQuery);
};

// Returns the professional profile contact with the given contact_id
export const ProfessionalContactGet: RequestHandler = async (_req, res) => {
  const { contact_id } = _req.params;
  const sqlQuery = await query('professional_profile_contacts')
    .select('*')
    .where('contact_id', contact_id);
  return res.json(sqlQuery[0]);
};
