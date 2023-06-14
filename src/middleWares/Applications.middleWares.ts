import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { Application } from "../types/applications.d";

// Returns all the applications
export const ApplicationsGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('applications').select('*');
  res.json(sqlQuery);
};

// Returns the application with the given application_id
export const ApplicationGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { application_id } = req.params;
    const sqlQuery = await query('applications')
      .select('*')
      .where('application_id', application_id)
      .first() as Application;
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get application', error);
    res.status(404).json({ message: 'Application id not found' });
  }
};

// POST endpoint to create an application
export const ApplicationPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newApplication = req.body;
    const sqlQuery = await query('applications').insert(newApplication);

    const applicationId = sqlQuery[0];
    const createdApplication = await query('applications')
      .select('*')
      .where('application_id', applicationId)
      .first() as Application;
    res.status(201).json(createdApplication);
  } catch (error) {
    console.log('Failed to create application', error);
    res.status(500).json({ message: 'Failed to create application' });
  }
};

// PUT endpoint to update an application
export const ApplicationPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { application_id } = req.params;
    const updatedApplication = req.body;

    const sqlQuery = await query('applications')
      .where('application_id', application_id)
      .update('id', updatedApplication);

    const applicationId = sqlQuery[0];
    if (!applicationId) {
      res.status(404).json({ message: 'Application id not found' });
    } else {
      const createdApplication = await query('applications')
        .select('*')
        .where('application_id', applicationId)
        .first() as Application;
      res.status(201).json(createdApplication);
    }
  } catch (error) {
    console.log('Failed to update application', error);
    res.status(500).json({ message: 'Failed to update application' });
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
      res.status(404).json({ message: 'Application id not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.log('Failed to delete application', error);
    res.status(500).json({ message: 'Failed to delete application' });
  }
};
