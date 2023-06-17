import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { Project } from "../types/projects.d";
import { ProfessionalProfile } from "../types/professional_profiles.d";
import { Capstone } from "../types/projects.d";

// ===============================================================
// ========================== PROJECTS ===========================
// ===============================================================

// Returns the project with the given project_id
export const ProjectGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;
    const sqlQuery = await query('projects')
      .select('*')
      .where('project_id', project_id)
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
    const { profile_id } = req.params
    const { title, description = null, repository = null, website = null } = req.body;

    const sqlQuery = await query('projects')
      .insert({ title, description, repository, website });

    const insertedProjectId = sqlQuery[0];
    const createdProject = await query('projects')
      .where('project_id', insertedProjectId)
      .first() as Project;

    // Relationship between profile and project
    await query('professional_profiles_projects')
      .insert({ profile_id, project_id: insertedProjectId });

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
    const { title, description, repository, website, start_date, end_date } = req.body;

    const sqlQuery = await query('projects')
      .where('project_id', project_id)
      .update({ title, description, repository, website, start_date, end_date });

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

// ===============================================================
// =================== PROJECT COLLABORATORS =====================
// ===============================================================

// Returns all the collaborators of the project with the given project_id
export const ProjectCollaboratorsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;
    const sqlQuery = await query('professional_profiles_projects')
      .select('profile_id')
      .where('project_id', project_id) as ProfessionalProfile[];
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get collaborators', error);
    res.status(500).json({ message: 'Project id not found' });
  }
};

// POST endpoint to create a project relationship (collaborators)
export const ProjectCollaboratorsPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { project_id } = req.body;
    await query('professional_profiles_projects')
      .insert({ profile_id, project_id });

    const relationshipCreated = await query('professional_profiles_projects')
      .where('profile_id', profile_id)
      .andWhere('project_id', project_id)
      .first() as Project;

    // Create all project skills in the profile of the new collaborator
    
    // Project skills
    const projectSkills = await query('projects_skills')
      .select('skill_id')
      .where('project_id', project_id);
    // Stop if no skills
    if (!projectSkills.length) {
      res.status(201).json(relationshipCreated);
    }

    // Create skills in the profile
    for (let projectSkill of projectSkills) {
      await query('professional_skills')
        .insert({ profile_id, skill_id: projectSkill.skill_id })
        .onConflict(['profile_id', 'skill_id'])
        .ignore();
    }

    // Manage the proficiency_level of these new skills based on project ratings

    // Project ratings
    const projectRatings = await query('project_ratings')
      .select('positive_rating')
      .where('project_id', project_id);
    // Stop if no project ratings
    if (!projectRatings.length) {
      res.status(201).json(relationshipCreated);
    }

    // Calcs ratings value
    let positiveRatings: number = 0;
    let negativeRatings: number = 0;
    for (let rating of projectRatings) {
      rating.positive_rating ? positiveRatings++ : negativeRatings--;
    }
    const ratingsValue: number = positiveRatings - negativeRatings;
    
    for (let projectSkill of projectSkills) {
      // Get the proficiency_level of the current skill
      const proficiency_level: number = (await query('professional_skills')
        .select('proficiency_level')
        .where('profile_id', profile_id)
        .andWhere('skill_id', projectSkill.skill_id))[0]['proficiency_level'];

      // Modify proficiency_level according to the total value of the project ratings
      let newProficiencyLevel = proficiency_level;
      if (ratingsValue) {
        newProficiencyLevel += ratingsValue;
      } else {
        if (!proficiency_level) {
          continue;
        }
        newProficiencyLevel -= ratingsValue;
        if (!newProficiencyLevel)
          newProficiencyLevel = 0;
      }

      // proficiency_level update
      await query('professional_skills')
        .where('profile_id', profile_id)
        .andWhere('skill_id', projectSkill.skill_id)
        .update('proficiency_level', newProficiencyLevel);
    }

    res.status(201).json(relationshipCreated);
  } catch(error) {
    console.log('Failed to create relationship' ,error);
    res.status(500).json({message: 'Failed to create relationship'});
  }
};

// ===============================================================
// ===============  PROJECTS - PROFESSIONAL_PROFILES =============
// ===============================================================

// Returns all the profile projects with the given profile_id
export const ProfileProjectsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const sqlQuery = await query('professional_profiles_projects')
      .select('project_id')
      .where('profile_id', profile_id) as Project[];
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get projects', error);
    res.status(500).json({ message: 'Profile id not found' });
  }
};

// ===============================================================
// =========================  CAPSTONES ==========================
// ===============================================================

// Returns all the company capstones with the given company_id
export const CompanyCapstonesGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { company_id } = req.params;
    const sqlQuery = await query('company_capstone_projects')
      .select('*')
      .where('company_id', company_id);
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get capstones', error);
    res.status(500).json({ message: 'Company id not found' });
  }
};

// Returns the capstone with the given project_id
export const CapstoneGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;
    const sqlQuery = await query('company_capstone_projects')
      .select('*')
      .where('project_id', project_id)
      .first() as Capstone;
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get capstone' + error);
    res.status(404).json({ message: 'Failed to get capstone' });
  }
};

// POST endpoint to create a capstone relationship (company)
export const CapstonePost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { company_id } = req.params;
    const { project_id, kind, active } = req.body;
    await query('company_capstone_projects')
      .insert({ company_id, project_id, kind, active });

    const createdCapstone = await query('company_capstone_projects')
      .where('company_id', company_id)
      .andWhere('project_id', project_id)
      .first() as Capstone;

    res.status(201).json(createdCapstone);
  } catch(error) {
    console.log('Failed to create capstone relationship' ,error);
    res.status(500).json({message: 'Failed to create capstone relationship'});
  }
};

// PUT endpoint to update a capstone relationship (company)
export const CapstonePut: RequestHandler = async (req: Request, res: Response) => {
  try{
    const { company_id, project_id } = req.params;
    const { kind = null, active = null } = req.body;
    const sqlQuery = await query('company_capstone_projects')
      .where('company_id', company_id)
      .andWhere('project_id', project_id)
      .update({ kind, active });
    if (!sqlQuery) {
      res.status(404).json({ message: 'capstone relationship not found' });
    } else {
      const updatedCapstone = await query('company_capstone_projects')
        .where('company_id', company_id)
        .andWhere('project_id', project_id)
        .first() as Capstone;
      res.json(updatedCapstone);
    }
  } catch(error) {
    console.log('Failed to update capstone' ,error);
    res.status(500).json({message: 'Failed to update capstone'});
  }
};
