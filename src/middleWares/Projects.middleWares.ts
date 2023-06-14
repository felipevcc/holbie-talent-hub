import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { Project } from "../types/projects.d";

// Returns all the projects
export const ProjectsGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('projects').select('*');
  res.json(sqlQuery);
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

// POST endpoint to create a project
export const ProjectPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newProject = req.body;

    const sqlQuery = await query('projects').insert(newProject);
    const insertedProjectId = sqlQuery[0];

    const createdProject = await query('projects')
      .where('project_id', insertedProjectId)
      .first() as Project;

    res.status(201).json(createdProject);
  } catch (error) {
    console.error('Failed to create project:', error);
    res.status(500).json({ message: 'Failed to create project' });
  }
};

// PUT endpoint to update a project
export const ProjectPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;
    const updatedFields = req.body;

    const sqlQuery = await query('projects')
      .where('project_id', project_id)
      .update(updatedFields);

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Project not found' });
    } else {
      const updatedProject = await query('projects')
        .where('project_id', project_id)
        .first() as Project;
      res.json(updatedProject);
    }
  } catch (error) {
    console.error('Failed to update project:', error);
    res.status(500).json({ message: 'Failed to update project' });
  }
};

// DELETE endpoint to delete a project
export const ProjectDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;
    const sqlQuery = await query('projects')
      .where('project_id', project_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      res.status(404).json({ message: 'Project not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete project:', error);
    res.status(500).json({ message: 'Failed to delete project' });
  }
};
