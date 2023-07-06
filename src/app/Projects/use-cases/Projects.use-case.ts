import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../../../infrastructure/MySQL/ConnetDB.services";
import { Project, Capstone } from "../domain/Projects.d";
import { ProfessionalProfile } from "../../Professional_profiles/domain/Professional_profiles.d";

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
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Project id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get project', error);
    return res.status(500).json({ message: 'Failed to get project' });
  }
};

// POST endpoint to create a project
export const ProjectPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params
    const { title, description, repository, website, start_date, end_date = null } = req.body;

    const sqlQuery = await query('projects')
      .insert({ title, description, repository, website, start_date, end_date });

    const insertedProjectId = sqlQuery[0];
    const createdProject = await query('projects')
      .where('project_id', insertedProjectId)
      .first() as Project;

    // Relationship between profile and project
    await query('professional_profiles_projects')
      .insert({ profile_id, project_id: insertedProjectId });

    return res.status(201).json(createdProject);
  } catch (error) {
    console.error('Failed to create project:', error);
    return res.status(500).json({ message: 'Failed to create project' });
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
      return res.status(404).json({ message: 'Project not found' });
    } else {
      const updatedProject = await query('projects')
        .where('project_id', project_id)
        .first() as Project;
      return res.json(updatedProject);
    }
  } catch (error) {
    console.error('Failed to update project:', error);
    return res.status(500).json({ message: 'Failed to update project' });
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
      return res.status(404).json({ message: 'Project not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete project:', error);
    return res.status(500).json({ message: 'Failed to delete project' });
  }
};

// ===============================================================
// =================== PROJECT COLLABORATORS =====================
// ===============================================================

// Returns all the collaborators of the project with the given project_id
export const ProjectCollaboratorsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;

    // Check if project exists
    const projectExists = await query('projects')
      .select('project_id')
      .where('project_id', project_id)
      .first();
    if (!projectExists) {
      return res.status(404).json({ message: 'Project id not found' });
    }

    const sqlQuery = await query('professional_profiles_projects')
      .select('professional_profiles.*')
      .join('professional_profiles', 'professional_profiles.profile_id', 'professional_profiles_projects.profile_id')
      .join('users', 'users.professional_id', 'professional_profiles_projects.profile_id')
      .where('professional_profiles_projects.project_id', project_id) as ProfessionalProfile[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get collaborators', error);
    return res.status(500).json({ message: 'Failed to get collaborators' });
  }
};

// POST endpoint to create a project relationship (collaborators)
export const ProjectCollaboratorsPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;
    const { profile_id } = req.body;
    await query('professional_profiles_projects')
      .insert({ profile_id, project_id });

    const relationshipCreated = await query('professional_profiles_projects')
      .where('profile_id', profile_id)
      .andWhere('project_id', project_id)
      .first() as Project;

    // Create all project skills in the profile of the new collaborator

    // Project skills
    const projectSkills = await query('project_skills')
      .select('skill_id')
      .where('project_id', project_id);
    // Stop if no skills
    if (!projectSkills.length) {
      return res.status(201).json(relationshipCreated);
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
      return res.status(201).json(relationshipCreated);
    }

    // Calcs ratings value
    let positiveRatings: number = 0;
    let negativeRatings: number = 0;
    for (let rating of projectRatings) {
      rating.positive_rating ? positiveRatings++ : negativeRatings++;
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

    return res.status(201).json(relationshipCreated);
  } catch (error) {
    console.error('Failed to create relationship', error);
    return res.status(500).json({ message: 'Failed to create relationship' });
  }
};

// ===============================================================
// ===============  PROJECTS - PROFESSIONAL_PROFILES =============
// ===============================================================

// Returns all the profile projects with the given profile_id
export const ProfileProjectsGet: RequestHandler = async (req: Request, res: Response) => {
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

    const sqlQuery = await query('professional_profiles_projects')
      .select('projects.*')
      .join('projects', 'projects.project_id', 'professional_profiles_projects.project_id')
      .where('professional_profiles_projects.profile_id', profile_id) as Project[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get projects', error);
    return res.status(500).json({ message: 'Failed to get projects' });
  }
};

// ===============================================================
// =========================  CAPSTONES ==========================
// ===============================================================

// Returns all the company capstones with the given company_id
export const CompanyCapstonesGet: RequestHandler = async (req: Request, res: Response) => {
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

    const sqlQuery = await query('company_capstone_projects')
      .select('*')
      .where('company_id', company_id);
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get capstones', error);
    return res.status(500).json({ message: 'Failed to get capstones' });
  }
};

// Returns the capstone with the given company_id and project_id
export const CapstoneGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { company_id, project_id } = req.params;
    const sqlQuery = await query('company_capstone_projects')
      .select('*')
      .where('company_id', company_id)
      .andWhere('project_id', project_id)
      .first() as Capstone;
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Project id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get capstone', error);
    return res.status(500).json({ message: 'Failed to get capstone' });
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

    return res.status(201).json(createdCapstone);
  } catch (error) {
    console.error('Failed to create capstone relationship', error);
    return res.status(500).json({ message: 'Failed to create capstone relationship' });
  }
};

// PUT endpoint to update a capstone relationship (company)
export const CapstonePut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { company_id, project_id } = req.params;
    const { kind, active } = req.body;
    const sqlQuery = await query('company_capstone_projects')
      .where('company_id', company_id)
      .andWhere('project_id', project_id)
      .update({ kind, active });
    if (!sqlQuery) {
      return res.status(404).json({ message: 'capstone relationship not found' });
    } else {
      const updatedCapstone = await query('company_capstone_projects')
        .where('company_id', company_id)
        .andWhere('project_id', project_id)
        .first() as Capstone;
      return res.json(updatedCapstone);
    }
  } catch (error) {
    console.error('Failed to update capstone', error);
    return res.status(500).json({ message: 'Failed to update capstone' });
  }
};
