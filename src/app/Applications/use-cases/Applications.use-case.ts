import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "$Infrastructure/MySQL/ConnetDB.services";
import { Application } from "$Applications/domain/Applications.d";

// ===============================================================
// ========================== APPLICATIONS =======================
// ===============================================================

// Returns the company applications with the given company_id
export const CompanyApplicationsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { company_id } = req.params;

    // Check if company exists
    const companyExists = await query('company_profiles')
      .select('company_id')
      .where('company_id', company_id)
      .first();
    if (!companyExists) {
      return res.status(404).json({ message: 'Company id not found' });
    }

    const sqlQuery = await query('applications')
      .select('*')
      .where('company_id', company_id) as Application[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get applications', error);
    return res.status(500).json({ message: 'Failed to get applications' });
  }
};

// Returns the professional profiles applications with the given profile_id
export const ProfileApplicationsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;

    // Check if profile exists
    const profileExists = await query('professional_profiles')
      .select('profile_id')
      .where('profile_id', profile_id)
      .first();
    if (!profileExists) {
      return res.status(404).json({ message: 'Profile id not found' });
    }

    const sqlQuery = await query('applications')
      .select('*')
      .where('professional_id', profile_id) as Application[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get applications', error);
    return res.status(500).json({ message: 'Failed to get applications' });
  }
};

// Returns the application with the given application_id
export const ApplicationGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { application_id } = req.params;
    const sqlQuery = await query('applications')
      .select('*')
      .where('application_id', application_id)
      .first() as Application;
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Application id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get application', error);
    return res.status(500).json({ message: 'Failed to get application' });
  }
};

// POST endpoint to create an application
export const ApplicationPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { status, company_id, professional_id } = req.body;
    const sqlQuery = await query('applications')
      .insert({ status, company_id, professional_id });

    const applicationId = sqlQuery[0];
    const createdApplication = await query('applications')
      .select('*')
      .where('application_id', applicationId)
      .first() as Application;
    return res.status(201).json(createdApplication);
  } catch (error) {
    console.error('Failed to create application', error);
    return res.status(500).json({ message: 'Failed to create application' });
  }
};

// PUT endpoint to update an application
export const ApplicationPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { application_id } = req.params;
    const { status } = req.body;

    const sqlQuery = await query('applications')
      .where('application_id', application_id)
      .update({ status });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Application id not found' });
    } else {
      const updatedApplication = await query('applications')
        .where('application_id', application_id)
        .first() as Application;
      return res.json(updatedApplication);
    }
  } catch (error) {
    console.error('Failed to update application', error);
    return res.status(500).json({ message: 'Failed to update application' });
  }
};

// DELETE endpoint to delete an application
export const ApplicationDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { application_id } = req.params;
    const sqlQuery = await query('applications')
      .where('application_id', application_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      return res.status(404).json({ message: 'Application id not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete application', error);
    return res.status(500).json({ message: 'Failed to delete application' });
  }
};
