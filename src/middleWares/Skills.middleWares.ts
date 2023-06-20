import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { Skill } from "../types/skills.d";

// ===============================================================
// ============================ SKILLS ===========================
// ===============================================================

// GET Returns all the skills
export const SkillsGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('skills').select('*') as Skill[];
  return res.json(sqlQuery);
};

// GET Returns the skill with the given skill_id
export const SkillGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { skill_id } = req.params;
    const sqlQuery = await query('skills')
      .select('*')
      .where('skill_id', skill_id)
      .first() as Skill;
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Skill id not found' });
    }

    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get skill:', error);
    return res.status(500).json({ message: 'Failed to get skill' });
  }
};

// POST endpoint to create a skill
export const SkillPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const sqlQuery = await query('skills')
      .insert({ name, description });
    const insertedSkillId = sqlQuery[0];

    const createdSkill = await query('skills')
      .where('skill_id', insertedSkillId)
      .first() as Skill;

    return res.status(201).json(createdSkill);
  } catch (error) {
    console.error('Failed to create skill:', error);
    return res.status(500).json({ message: 'Failed to create skill' });
  }
};

// PUT endpoint to update a skill
export const SkillPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { skill_id } = req.params;
    const { name, description } = req.body;

    const sqlQuery = await query('skills')
      .where('skill_id', skill_id)
      .update({ name, description });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Skill not found' });
    } else {
      const updatedSkill = await query('skills')
        .where('skill_id', skill_id)
        .first() as Skill;
      return res.json(updatedSkill);
    }
  } catch (error) {
    console.error('Failed to update skill:', error);
    return res.status(500).json({ message: 'Failed to update skill' });
  }
};

// DELETE endpoint to delete a skill
export const SkillDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { skill_id } = req.params;
    const sqlQuery = await query('skills')
      .where('skill_id', skill_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      return res.status(404).json({ message: 'Skill not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete skill:', error);
    return res.status(500).json({ message: 'Failed to delete skill' });
  }
};

// ===============================================================
// ===================== PROFESSIONAL_SKILLS =====================
// ===============================================================

// Returns the professional profile's skills with the given profile_id
export const ProfileSkillsGet: RequestHandler = async (req: Request, res: Response) => {
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

    const sqlQuery = await query('skills')
      .select('skills.skill_id', 'skills.name', 'skills.description', 'professional_skills.proficiency_level')
      .join('professional_skills', 'skills.skill_id', '=', 'professional_skills.skill_id')
      .where('professional_skills.profile_id', profile_id) as Skill[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get profile\'s skill', error);
    return res.status(500).json({ message: 'Failed to get profile\'s skill' });
  }
};

// POST endpoint to create a professional profile's skill
export const ProfileSkillPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { skill_id } = req.body;

    await query('professional_skills').insert({ profile_id, skill_id });

    const createdSkill = await query('professional_skills')
      .where('profile_id', profile_id)
      .andWhere('skill_id', skill_id)
      .first() as Skill;

    return res.status(201).json(createdSkill);
  } catch (error) {
    console.error('Failed to create profile skill:', error);
    return res.status(500).json({ message: 'Failed to create profile skill' });
  }
};

// ===============================================================
// ======================= PROJECT_SKILLS =======================
// ===============================================================

// Returns the project's skills with the given project_id
export const ProjectSkillsGet: RequestHandler = async (req: Request, res: Response) => {
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

    const sqlQuery = await query('skills')
      .select('skills.skill_id', 'skills.name', 'skills.description')
      .join('project_skills', 'skills.skill_id', '=', 'project_skills.skill_id')
      .where('project_skills.project_id', project_id) as Skill[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get project\'s skill', error);
    return res.status(500).json({ message: 'Failed to get project\'s skill' });
  }
};

// POST endpoint to create a project's skill
export const ProjectSkillPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;
    const { skill_id } = req.body;

    await query('project_skills').insert({ project_id, skill_id });

    const createdSkill = await query('project_skills')
      .where('project_id', project_id)
      .andWhere('skill_id', skill_id)
      .first() as Skill;

    // Create skill in all collaborator profiles when adding a new project skill
    const collaboratorsIds = await query('professional_profiles_projects')
      .select('profile_id')
      .where('project_id', project_id);
    for (let collaboratorId of collaboratorsIds) {
      await query('professional_skills')
        .insert({ profile_id: collaboratorId.profile_id, skill_id })
        .onConflict(['profile_id', 'skill_id'])
        .ignore();
    }

    return res.status(201).json(createdSkill);
  } catch (error) {
    console.error('Failed to create project skill:', error);
    return res.status(500).json({ message: 'Failed to create project skill' });
  }
};
