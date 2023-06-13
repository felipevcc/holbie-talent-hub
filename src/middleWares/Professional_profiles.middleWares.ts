import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { ProfessionalProfile, Education, Experience } from "../types/professional_profiles.d";

// Returns all the professional profiles
export const ProfilesGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('professional_profiles').select('*') as ProfessionalProfile[];
  return res.json(sqlQuery);
};

// Returns the professional profile with the given profile_id
export const ProfileGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const sqlQuery = await query('professional_profiles')
      .select('*')
      .where('profile_id', profile_id)
      .first() as ProfessionalProfile;
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get user' + error);
    res.status(404).json({ message: 'Profile id not found' });
  }
};

// Returns the professional profile's education with the given profile_id
export const ProfileEducationGet: RequestHandler = async (_req: Request, res: Response) => {
  try {
    const { profile_id } = _req.params;
    const sqlQuery = await query('education')
      .select('*')
      .where('profile_id', profile_id) as Education[];
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get user\'s experience' + error);
    res.status(404).json({ message: 'Education id not found' });
  }
};

// Returns the professional profile's experience with the given profile_id
export const ProfileExperienceGet: RequestHandler = async (_req: Request, res: Response) => {
  try {
    const { profile_id } = _req.params;
    const sqlQuery = await query('experience')
      .select('*')
      .where('profile_id', profile_id) as Experience[];
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get user\'s experience' + error);
    res.status(404).json({ message: 'Experience id not found' });
  }
};

// Returns the education with the given education_id
export const EducationGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { education_id } = req.params;
    const sqlQuery = await query('education')
      .select('*')
      .where('education_id', education_id)
      .first() as Education;
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get education' + error);
    res.status(404).json({ message: 'Education id not found' });
  }
};

// Returns the experience with the given experience_id
export const ExperienceGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { experience_id } = req.params;
    const sqlQuery = await query('experience')
      .select('*')
      .where('experience_id', experience_id)
      .first() as Experience;
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get experience' + error);
    res.status(404).json({ message: 'Experience id not found' });
  }
};
