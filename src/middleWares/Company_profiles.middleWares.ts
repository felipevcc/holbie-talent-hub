import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { CompanyProfile } from "../types/company_profiles.d";

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
    const createCompany = await query('company_profiles')
      .where('id', CompanyId)
      .first() as CompanyProfile;

    res.status(201).json(createCompany);
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
