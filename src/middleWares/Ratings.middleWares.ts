import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { Rating, ProjectRating } from "../types/ratings.d";

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
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get rating', error);
    res.status(500).json({ message: 'Rating id not found' });
  }
};

// PUT endpoint to update a rating
export const RatingPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { rating_id } = req.params;
    const { positive_rating, comment } = req.body;
    const sqlQuery = await query('ratings')
      .where('rating_id', rating_id)
      .update({ positive_rating, comment });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Rating not found' });
    } else {
      const updatedRating = await query('ratings')
        .where('rating_id', rating_id)
        .first() as Rating;
      res.json(updatedRating);
    }
  } catch (error) {
    console.log('Failed to update rating', error);
    res.status(500).json({ message: 'Rating id not found' });
  }
};

// ===============================================================
// ====================== USERS - RATINGS ========================
// ===============================================================

// Get all sent ratings by a user
export const UserSentRatingsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const sqlQuery = await query('ratings')
      .select('*')
      .where('sender_id', user_id) as Rating[];
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get user\'s sent ratings', error);
    res.status(500).json({ message: 'User id not found' });
  }
}

// POST endpoint to create a rating
export const RatingPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { positive_rating, comment, receiver_id } = req.body;
    const sqlQuery = await query('ratings')
      .insert({ positive_rating, comment, sender_id: user_id, receiver_id }) as Rating[];

    const profileReceiverId = await query('users')
      .select('professional_id')
      .where('user_id', receiver_id);
    const profileSkills = await query('professional_skills')
      .select('skill_id, proficiency_level')
      .where('profile_id', profileReceiverId);

    for (const skill of profileSkills) {
      let newProficiencyLevel;
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
          profile_id: profileReceiverId,
          skill_id: skill.skill_id
        })
        .update({ proficiency_level: newProficiencyLevel });
    }
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get user\'s sent ratings', error);
    res.status(500).json({ message: 'User id not found' });
  }
};

// Get all user's ratings received with the given receiver_id
export const UserReceivedRatingsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const sqlQuery = await query('ratings')
      .select('*')
      .where('receiver_id', user_id) as Rating[];
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get user\'s received ratings', error);
    res.status(500).json({ message: 'User id not found' });
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
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get project rating', error);
    res.status(500).json({ message: 'Rating id not found' });
  }
};

// PUT endpoint to update a project rating
export const ProjectRatingPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { rating_id } = req.params;
    const { positive_rating, comment } = req.body;
    const sqlQuery = await query('project_ratings')
      .where('rating_id', rating_id)
      .update({ positive_rating, comment });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Rating not found' });
    } else {
      const updatedRating = await query('project_ratings')
        .where('rating_id', rating_id)
        .first() as ProjectRating;
      res.json(updatedRating);
    }
  } catch (error) {
    console.log('Failed to update project rating', error);
    res.status(500).json({ message: 'Rating id not found' });
  }
};

// ===============================================================
// ===================== COMPANY - RATINGS =======================
// ===============================================================

// Get all sent ratings by a user
export const CompanySentRatingsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const sqlQuery = await query('project_ratings')
      .select('*')
      .where('company_id', profile_id) as Rating[];
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get company\'s sent ratings', error);
    res.status(500).json({ message: 'Company id not found' });
  }
}

// POST endpoint to create a rating
export const CompanyRatingPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { positive_rating, comment, project_id } = req.body;
    const sqlQuery = await query('project_ratings')
      .insert({ positive_rating, comment, company_id: profile_id, project_id }) as ProjectRating[];
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to create rating', error);
    res.status(500).json({ message: 'Failed to create rating' });
  }
};

// Get all project's ratings received with the given project_id
export const ProjectReceivedRatingsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;
    const sqlQuery = await query('project_ratings')
      .select('*')
      .where('project_id', project_id) as ProjectRating[];
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get project\'s received ratings', error);
    res.status(500).json({ message: 'Project id not found' });
  }
};
