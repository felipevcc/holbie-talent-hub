import { RequestHandler } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { ProfessionalProfile, Education, Experience } from "../types/professional_profiles.d";

// Returns all the professional profiles
export const ProfilesGet: RequestHandler = async (_req, res) => {
  const sqlQuery = await query('professional_profiles').select('*') as ProfessionalProfile[];
  return res.json(sqlQuery);
};

// Returns the professional profile with the given profile_id
export const ProfileGet: RequestHandler = async (_req, res) => {
  const { profile_id } = _req.params;
  const sqlQuery = await query('professional_profiles')
    .select('*')
    .where('profile_id', profile_id) as ProfessionalProfile[];
  return res.json(sqlQuery[0]);
};

// Returns the professional profile's education with the given profile_id
export const ProfileEducationGet: RequestHandler = async (_req, res) => {
  const { profile_id } = _req.params;
  const sqlQuery = await query('education')
    .select('*')
    .where('profile_id', profile_id) as Education[];
  return res.json(sqlQuery);
};

// Returns the professional profile's experience with the given profile_id
export const ProfileExperienceGet: RequestHandler = async (_req, res) => {
  const { profile_id } = _req.params;
  const sqlQuery = await query('experience')
    .select('*')
    .where('profile_id', profile_id) as Experience[];
  return res.json(sqlQuery);
};

// Returns the education with the given education_id
export const EducationGet: RequestHandler = async (_req, res) => {
  const { education_id } = _req.params;
  const sqlQuery = await query('education')
    .select('*')
    .where('education_id', education_id) as Education[];
  return res.json(sqlQuery[0]);
};

// Returns the experience with the given experience_id
export const ExperienceGet: RequestHandler = async (_req, res) => {
  const { experience_id } = _req.params;
  const sqlQuery = await query('experience')
    .select('*')
    .where('experience_id', experience_id) as Experience[];
  return res.json(sqlQuery[0]);
};
