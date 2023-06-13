import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { CompanyProfile, FavoriteProfile } from "../types/company_profiles.d";

// ===============================================================
// ====================== COMPANY_PROFILES =======================
// ===============================================================

// Returns all the company profiles
export const ProfilesGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('company_profiles').select('*') as CompanyProfile[];
  return res.json(sqlQuery);
};

// Returns the company profile with the given profile_id
export const ProfileGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const sqlQuery = await query('company_profiles')
      .select('*')
      .where('id', user_id)
      .first() as CompanyProfile;
    res.json(sqlQuery);
  } catch(error) {
    console.log('Failed to get company profile' ,error);
    res.status(404).json({message: 'Company id not found'});
  }
};

// POST endpoint to create a company profile
export const ProfilePost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newCompany = req.body;
    const sqlQuery = await query('company_profiles').insert(newCompany);

    const CompanyId = sqlQuery[0];
    const createdCompany = await query('company_profiles')
      .where('id', CompanyId)
      .first() as CompanyProfile;

    res.status(201).json(createdCompany);
  } catch(error) {
    console.log('Failed to create company profile' ,error);
    res.status(500).json({message: 'Failed to create company profile'});
  }
};

// PUT endpoint to update a company profile
export const ProfilePut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const updateCompany = req.body;

    const sqlQuery = await query('company_profiles')
      .update(updateCompany)
      .where('id', user_id);

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Company not found' });
    } else {
      const updatedCompany = await query('company_profiles')
        .select('*')
        .where('id', user_id)
        .first() as CompanyProfile;
      res.json(updatedCompany);
    }
  } catch (error) {
    console.log('Failed to update company profile', error);
    res.status(500).json({ message: 'Failed to update company profile' });
  }
};

// DELETE endpoint to delete a company profile
export const ProfileDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const sqlQuery = await query('company_profiles')
      .where('profile_id', profile_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      res.status(404).json({ message: 'Company profile not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete company profile:', error);
    res.status(500).json({ message: 'Failed to delete company profile' });
  }
};

// ===============================================================
// =============== FAVORITE_PROFESSIONAL_PROFILES ================
// ===============================================================

// Returns all the favorite professional profiles
export const FavoriteProfilesGet: RequestHandler = async (req: Request, res: Response) => {
  const { company_id } = req.params;
  const sqlQuery = await query('favorite_profiles')
    .select('profile_id')
    .where('company_id', company_id) as FavoriteProfile[];
  return res.json(sqlQuery);
};

// POST endpoint to create a favorite professional profile
export const FavoriteProfilePost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newFavoriteProfile = req.body;
    await query('favorite_profiles').insert(newFavoriteProfile);

    const createdFavoriteProfile = await query('favorite_profiles')
      .where('company_id', newFavoriteProfile.company_id)
      .andWhere('profile_id', newFavoriteProfile.profile_id)
      .first() as FavoriteProfile;

    res.status(201).json(createdFavoriteProfile);
  } catch(error) {
    console.log('Failed to create favorite profile' ,error);
    res.status(500).json({message: 'Failed to create favorite profile'});
  }
};

// DELETE endpoint to delete a favorite profile
export const FavoriteProfileDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { company_id, profile_id } = req.params;
    const sqlQuery = await query('favorite_profiles')
      .where('profile_id', profile_id)
      .andWhere('company_id', company_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      res.status(404).json({ message: 'Favorite profile not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete favorite profile:', error);
    res.status(500).json({ message: 'Failed to delete favorite profile' });
  }
};
