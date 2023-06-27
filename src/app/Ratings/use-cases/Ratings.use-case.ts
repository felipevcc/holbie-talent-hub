import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../../../infrastructure/MySQL/ConnetDB.services";
import { Rating, ProjectRating } from "../domain/Ratings.d";

// ===============================================================
// ========================== RATINGS ============================
// ===============================================================

// Returns the rating with the given rating_id
export const RatingGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { rating_id } = req.params;
    const sqlQuery = await query('ratings')
      .select('*')
      .where('rating_id', rating_id)
      .first() as Rating;
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Rating id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get rating', error);
    return res.status(500).json({ message: 'Failed to get rating' });
  }
};

// PUT endpoint to update a rating
export const RatingPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { rating_id } = req.params;
    const { comment } = req.body;
    const sqlQuery = await query('ratings')
      .where('rating_id', rating_id)
      .update({ comment });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Rating not found' });
    } else {
      const updatedRating = await query('ratings')
        .where('rating_id', rating_id)
        .first() as Rating;
      return res.json(updatedRating);
    }
  } catch (error) {
    console.error('Failed to update rating', error);
    return res.status(500).json({ message: 'Failed to update rating' });
  }
};

// ===============================================================
// ====================== USERS - RATINGS ========================
// ===============================================================

// Get all sent ratings by a user
export const UserSentRatingsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    // Check if user exists
    const userExists = await query('users')
      .select('user_id')
      .where('user_id', user_id)
      .first();
    if (!userExists) {
      return res.status(404).json({ message: 'User id not found' });
    }

    const sqlQuery = await query('ratings')
      .select('*')
      .where('sender_id', user_id) as Rating[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get user\'s sent ratings', error);
    return res.status(500).json({ message: 'Failed to get user\'s sent ratings' });
  }
}

// POST endpoint to create a rating
export const RatingPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { positive_rating, comment, receiver_id } = req.body;
    const sqlQuery = await query('ratings')
      .insert({ positive_rating, comment, sender_id: user_id, receiver_id });

    // Get the created rating
    const insertedRatingId = sqlQuery[0];
    const createdRating = await query('ratings')
      .where('rating_id', insertedRatingId)
      .first() as Rating;

    const profileReceiverId = await query('users')
      .select('professional_id')
      .where('user_id', receiver_id);
    const profileSkills = await query('professional_skills')
      .select('skill_id', 'proficiency_level')
      .where('profile_id', profileReceiverId[0].professional_id);

    for (let skill of profileSkills) {
      let newProficiencyLevel: number;
      if (positive_rating) {
        newProficiencyLevel = skill.proficiency_level + 1;
      } else {
        if (skill.proficiency_level) {
          newProficiencyLevel = skill.proficiency_level - 1;
        } else {
          // Handle the case when proficiency_level is already at its minimum
          continue;
        }
      }
      await query('professional_skills')
        .where({
          profile_id: profileReceiverId[0].professional_id,
          skill_id: skill.skill_id
        })
        .update({ proficiency_level: newProficiencyLevel });
    }

    return res.status(201).json(createdRating);
  } catch (error) {
    console.log('Failed to get user\'s sent ratings', error);
    return res.status(500).json({ message: 'User id not found' });
  }
};

// Get all user's ratings received with the given receiver_id
export const UserReceivedRatingsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    // Check if user exists
    const userExists = await query('users')
      .select('user_id')
      .where('user_id', user_id)
      .first();
    if (!userExists) {
      return res.status(404).json({ message: 'User id not found' });
    }

    const sqlQuery = await query('ratings')
      .select('*')
      .where('receiver_id', user_id) as Rating[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get user\'s received ratings', error);
    return res.status(500).json({ message: 'Failed to get user\'s received ratings' });
  }
};

// ===============================================================
// ====================== PROJECT_RATINGS ========================
// ===============================================================

// Returns the project rating with the given rating_id
export const ProjectRatingGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { rating_id } = req.params;
    const sqlQuery = await query('project_ratings')
      .select('*')
      .where('rating_id', rating_id)
      .first() as ProjectRating;
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Rating id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get project rating', error);
    return res.status(500).json({ message: 'Failed to get project rating' });
  }
};

// PUT endpoint to update a project rating
export const ProjectRatingPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { rating_id } = req.params;
    const { comment } = req.body;
    const sqlQuery = await query('project_ratings')
      .where('rating_id', rating_id)
      .update({ comment });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Rating not found' });
    } else {
      const updatedRating = await query('project_ratings')
        .where('rating_id', rating_id)
        .first() as ProjectRating;
      return res.json(updatedRating);
    }
  } catch (error) {
    console.error('Failed to update project rating', error);
    return res.status(500).json({ message: 'Failed to update project rating' });
  }
};

// ===============================================================
// ===================== COMPANY - RATINGS =======================
// ===============================================================

// Get all sent ratings by a user
export const CompanySentRatingsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;

    // Check if company profile exists
    const companyExists = await query('company_profiles')
      .select('profile_id')
      .where('profile_id', profile_id)
      .first();
    if (!companyExists) {
      return res.status(404).json({ message: 'Company profile id not found' });
    }

    const sqlQuery = await query('project_ratings')
      .select('*')
      .where('company_id', profile_id) as Rating[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get company\'s sent ratings', error);
    return res.status(500).json({ message: 'Failed to get company\'s sent ratings' });
  }
}

// POST endpoint to create a rating
export const CompanyRatingPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { positive_rating, comment, project_id } = req.body;
    const sqlQuery = await query('project_ratings')
      .insert({ positive_rating, comment, company_id: profile_id, project_id });

    // Get the created rating
    const insertedRatingId = sqlQuery[0];
    const createdRating = await query('project_ratings')
      .where('rating_id', insertedRatingId)
      .first() as Rating;

    // Skills of project contributors
    const profileSkills = await query('project_skills')
      .select('professional_skills.profile_id', 'project_skills.skill_id', 'professional_skills.proficiency_level')
      .join('professional_skills', 'project_skills.skill_id', 'professional_skills.skill_id')
      .join('professional_profiles_projects', 'professional_skills.profile_id', 'professional_profiles_projects.profile_id')
      .join('projects', 'professional_profiles_projects.project_id', 'projects.project_id')
      .where('project_skills.project_id', project_id)
      .andWhere('professional_profiles_projects.project_id', project_id);

    // Updating the skills of project contributors
    for (let profileSkill of profileSkills) {
      let newProficiencyLevel;
      if (positive_rating) {
        newProficiencyLevel = profileSkill.proficiency_level + 1;
      } else {
        if (profileSkill.proficiency_level) {
          newProficiencyLevel = profileSkill.proficiency_level - 1;
        } else {
          // Handle the case when proficiency_level is already at its minimum
          continue;
        }
      }
      try {
        await query('professional_skills')
          .where({
            profile_id: profileSkill.profile_id,
            skill_id: profileSkill.skill_id
          })
          .update({ proficiency_level: newProficiencyLevel });
      } catch (error) {
        console.error('Failed to update proficiency_level', error);
        return res.status(500).json({ message: 'Failed to update proficiency_level' });
      }
    }
    return res.status(201).json(createdRating);
  } catch (error) {
    console.log('Failed to create rating', error);
    return res.status(500).json({ message: 'Failed to create rating' });
  }
};

// Get all project's ratings received with the given project_id
export const ProjectReceivedRatingsGet: RequestHandler = async (req: Request, res: Response) => {
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

    const sqlQuery = await query('project_ratings')
      .select('*')
      .where('project_id', project_id) as ProjectRating[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get project\'s received ratings', error);
    return res.status(500).json({ message: 'Failed to get project\'s received rating' });
  }
};
