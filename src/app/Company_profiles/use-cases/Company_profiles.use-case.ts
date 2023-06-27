import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../../../infrastructure/MySQL/ConnetDB.services";
import { CompanyProfile, FavoriteProfile } from "../domain/Company_profiles.d";
import { ProfessionalProfile } from "../../Professional_profiles/domain/Professional_profiles.d";

// ===============================================================
// ====================== COMPANY_PROFILES =======================
// ===============================================================

// Returns all the company profiles
export const ProfilesGet: RequestHandler = async (_req: Request, res: Response) => {
  try {
    const sqlQuery = await query('company_profiles').select('*') as CompanyProfile[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get company profiles', error);
    return res.status(500).json({ message: 'Failed to get company profiles' });
  }
};

// Returns the company profile with the given profile_id
export const ProfileGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const sqlQuery = await query('company_profiles')
      .select('*')
      .where('profile_id', profile_id)
      .first() as CompanyProfile;
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Company profile id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get company profile', error);
    return res.status(500).json({ message: 'Failed to get company profile' });
  }
};

// POST endpoint to create a company profile
export const ProfilePost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { company_name, industry, about_us, location, website } = req.body;
    const sqlQuery = await query('company_profiles')
      .insert({ company_name, industry, about_us, location, website });

    const ProfileId = sqlQuery[0];
    const createdCompany = await query('company_profiles')
      .where('profile_id', ProfileId)
      .first() as CompanyProfile;

    return res.status(201).json(createdCompany);
  } catch (error) {
    console.error('Failed to create company profile', error);
    return res.status(500).json({ message: 'Failed to create company profile' });
  }
};

// PUT endpoint to update a company profile
export const ProfilePut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { company_name, industry, about_us, location, website } = req.body;

    const sqlQuery = await query('company_profiles')
      .where('profile_id', profile_id)
      .update({ company_name, industry, about_us, location, website });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Company not found' });
    } else {
      const updatedCompany = await query('company_profiles')
        .select('*')
        .where('profile_id', profile_id)
        .first() as CompanyProfile;
      return res.json(updatedCompany);
    }
  } catch (error) {
    console.error('Failed to update company profile', error);
    return res.status(500).json({ message: 'Failed to update company profile' });
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
      return res.status(404).json({ message: 'Company profile not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete company profile:', error);
    return res.status(500).json({ message: 'Failed to delete company profile' });
  }
};

// ===============================================================
// =============== FAVORITE_PROFESSIONAL_PROFILES ================
// ===============================================================

// Returns all the favorite professional profiles
export const FavoriteProfilesGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { company_id } = req.params;

    // Check if company exists
    const companyExists = await query('company_profiles')
      .select('profile_id')
      .where('profile_id', company_id)
      .first();
    if (!companyExists) {
      return res.status(404).json({ message: 'Company id not found' });
    }

    const sqlQuery = await query('favorite_profiles')
      .select('favorite_profiles.profile_id', 'users.first_name', 'professional_profiles.headline')
      .join('professional_profiles', 'professional_profiles.profile_id', 'favorite_profiles.profile_id')
      .join('users', 'users.professional_id', 'favorite_profiles.profile_id')
      .where('favorite_profiles.company_id', company_id) as FavoriteProfile[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get favorite profiles', error);
    return res.status(500).json({ message: 'Failed to get favorite profiles' });
  }
};

// POST endpoint to create a favorite professional profile
export const FavoriteProfilePost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { company_id } = req.params;
    const { profile_id } = req.body;
    await query('favorite_profiles').insert({ company_id, profile_id });

    const createdFavoriteProfile = await query('favorite_profiles')
      .where('company_id', company_id)
      .andWhere('profile_id', profile_id)
      .first() as FavoriteProfile;

    return res.status(201).json(createdFavoriteProfile);
  } catch (error) {
    console.error('Failed to create favorite profile', error);
    return res.status(500).json({ message: 'Failed to create favorite profile' });
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
      return res.status(404).json({ message: 'Favorite profile not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete favorite profile:', error);
    return res.status(500).json({ message: 'Failed to delete favorite profile' });
  }
};

// ===============================================================
// ========== COMPANY_PROFESSIONAL_PROFILES (employees) ==========
// ===============================================================

// Returns the employees with the given company_id
export const EmployeesGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { company_id } = req.params;

    // Check if company exists
    const companyExists = await query('company_profiles')
      .select('profile_id')
      .where('profile_id', company_id)
      .first();
    if (!companyExists) {
      return res.status(404).json({ message: 'Company id not found' });
    }

    const sqlQuery = await query('company_professional_profiles')
      .select('company_professional_profiles.professional_profile_id', 'users.first_name', 'professional_profiles.headline')
      .join('professional_profiles', 'professional_profiles.profile_id', 'company_professional_profiles.professional_profile_id')
      .join('users', 'users.professional_id', 'company_professional_profiles.professional_profile_id')
      .where('company_professional_profiles.company_id', company_id) as ProfessionalProfile[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get professional profiles', error);
    return res.status(500).json({ message: 'Failed to get professional profiles' });
  }
};

// POST endpoint to create a employee
export const EmployeePost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { company_id } = req.params;
    const { professional_profile_id } = req.body;
    await query('company_professional_profiles')
      .insert({ company_id, professional_profile_id });

    const createdEmployee = await query('company_professional_profiles')
      .where('company_id', company_id)
      .andWhere('professional_profile_id', professional_profile_id)
      .first() as FavoriteProfile;

    return res.status(201).json(createdEmployee);
  } catch (error) {
    console.error('Failed to create employee', error);
    return res.status(500).json({ message: 'Failed to create employee' });
  }
};
