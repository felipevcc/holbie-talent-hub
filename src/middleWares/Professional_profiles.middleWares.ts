import { RequestHandler } from "express";
import { query } from "../services/ConnetDB.services";

// Returns all the professional profiles
export const ProfilesGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('SELECT * FROM professional_profiles');
  return res.json(sqlQuery);
};

// Returns the professional profile with the given profile_id
export const ProfileGet: RequestHandler = async (_req, res) => {
  const { profile_id } = _req.params;
  const sqlQuery = await query(
    'SELECT * FROM professional_profiles \
    WHERE profile_id = ?', [profile_id]
  );
  return res.json(sqlQuery);
};

// Returns the professional profile's education with the given profile_id
export const ProfileEducationGet: RequestHandler = async (_req, res) => {
  const { profile_id } = _req.params;
  const sqlQuery = await query(
    'SELECT * FROM education \
    WHERE profile_id = ?', [profile_id]
  );
  return res.json(sqlQuery);
};

// Returns the professional profile's experience with the given profile_id
export const ProfileExperienceGet: RequestHandler = async (_req, res) => {
  const { profile_id } = _req.params;
  const sqlQuery = await query(
    'SELECT * FROM experience \
    WHERE profile_id = ?', [profile_id]
  );
  return res.json(sqlQuery);
};

// Returns the education with the given education_id
export const EducationGet: RequestHandler = async (_req, res) => {
  const { education_id } = _req.params;
  const sqlQuery = await query(
    'SELECT * FROM education \
    WHERE education_id = ?', [education_id]
  );
  return res.json(sqlQuery);
};

// Returns the experience with the given experience_id
export const ExperienceGet: RequestHandler = async (_req, res) => {
  const { experience_id } = _req.params;
  const sqlQuery = await query(
    'SELECT * FROM experience \
    WHERE experience_id = ?', [experience_id]
  );
  return res.json(sqlQuery);
};
