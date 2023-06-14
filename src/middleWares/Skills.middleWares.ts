import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { Skill } from "../types/skills.d";

// ===============================================================
// ============================ SKILLS ===========================
// ===============================================================

// GET Returns all the skills
export const SkillsGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('skills').select('*') as Skill[];
  res.json(sqlQuery);
};

// GET Returns the skill with the given skill_id
export const SkillGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { skill_id } = req.params;
    const sqlQuery = await query('skills')
      .select('*')
      .where('skill_id', skill_id)
      .first() as Skill;
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get skill:', error);
    res.status(404).json({ message: 'Failed to get skill' });
  }
};

// POST endpoint to create a skill
export const SkillPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newSkill = req.body;

    const sqlQuery = await query('skills').insert(newSkill);
    const insertedSkillId = sqlQuery[0];

    const createdSkill = await query('skills')
      .where('skill_id', insertedSkillId)
      .first() as Skill;

    res.status(201).json(createdSkill);
  } catch (error) {
    console.error('Failed to create skill:', error);
    res.status(500).json({ message: 'Failed to create skill' });
  }
};

// PUT endpoint to update a skill
export const SkillPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { skill_id } = req.params;
    const updatedFields = req.body;

    const sqlQuery = await query('skills')
      .where('skill_id', skill_id)
      .update(updatedFields);

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Skill not found' });
    } else {
      const updatedSkill = await query('skills')
        .where('skill_id', skill_id)
        .first() as Skill;
      res.json(updatedSkill);
    }
  } catch (error) {
    console.error('Failed to update skill:', error);
    res.status(500).json({ message: 'Failed to update skill' });
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
      res.status(404).json({ message: 'Skill not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete skill:', error);
    res.status(500).json({ message: 'Failed to delete skill' });
  }
};

// ===============================================================
// ===================== PROFESSIONAL_SKILLS =====================
// ===============================================================

// Returns the professional profile's skills with the given profile_id
export const ProfileSkillsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const sqlQuery = await query('skills')
      .select('skills.skill_id', 'skills.name', 'skills.description', 'professional_skills.proficiency_level')
      .join('professional_skills', 'skills.skill_id', '=', 'professional_skills.skill_id')
      .where('professional_skills.profile_id', profile_id) as Skill[];
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get profile\'s skill' + error);
    res.status(404).json({ message: 'Failed to get profile\'s skill' });
  }
};

// POST endpoint to create a professional profile's skill
export const ProfileSkillPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newProfileSkill = req.body;

    const sqlQuery = await query('professional_skills').insert(newProfileSkill);
    const insertedSkillId = sqlQuery[0];

    const createdSkill = await query('professional_skills')
      .where('skill_id', insertedSkillId)
      .first() as Skill;

    res.status(201).json(createdSkill);
  } catch (error) {
    console.error('Failed to create profile skill:', error);
    res.status(500).json({ message: 'Failed to create profile skill' });
  }
};

// ===============================================================
// ======================= PROJECT_SKILLS =======================
// ===============================================================

// Returns the project's skills with the given project_id
export const ProjectSkillsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;
    const sqlQuery = await query('skills')
      .select('skills.skill_id', 'skills.name', 'skills.description')
      .join('project_skills', 'skills.skill_id', '=', 'project_skills.skill_id')
      .where('project_skills.project_id', project_id) as Skill[];
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get project\'s skill' + error);
    res.status(404).json({ message: 'Failed to get project\'s skill' });
  }
};

// POST endpoint to create a project's skill
export const ProjectSkillPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newProjectSkill = req.body;

    const sqlQuery = await query('project_skills').insert(newProjectSkill);
    const insertedSkillId = sqlQuery[0];

    const createdSkill = await query('project_skills')
      .where('skill_id', insertedSkillId)
      .first() as Skill;

    res.status(201).json(createdSkill);
  } catch (error) {
    console.error('Failed to create project skill:', error);
    res.status(500).json({ message: 'Failed to create project skill' });
  }
};
