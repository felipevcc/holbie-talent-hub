import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { Project } from "../types/projects.d";

// Returns all the projects
export const ProjectsGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('projects').select('*');
  return res.json(sqlQuery);
};

// Returns the project with the given project_id
export const ProjectGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
  const { project_id } = req.params;
  const sqlQuery = await query('projects')
    .select('*')
    .where('id', project_id)
    .first() as Project;
  res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get project', error);
    res.status(500).json({ message: 'Project id not found' });
  }
};
