import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { ProfessionalProfile, Education, Experience } from "../types/professional_profiles.d";

// ===============================================================
// ==================== PROFESSIONAL_PROFILES ====================
// ===============================================================

// Returns all the profiles
export const ProfilesGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('professional_profiles').select('*') as ProfessionalProfile[];
  return res.json(sqlQuery);
};

// Returns the profile with the given profile_id
export const ProfileGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const sqlQuery = await query('professional_profiles')
      .select('*')
      .where('profile_id', profile_id)
      .first() as ProfessionalProfile;
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get user' + error);
    res.status(404).json({ message: 'Profile id not found' });
  }
};

// POST endpoint to create a profile
export const ProfilePost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newProfile = req.body;

    const sqlQuery = await query('professional_profiles').insert(newProfile);
    const insertedProfileId = sqlQuery[0];

    const createdProfile = await query('professional_profiles')
      .where('profile_id', insertedProfileId)
      .first() as ProfessionalProfile;

    res.status(201).json(createdProfile);
  } catch (error) {
    console.error('Failed to create profile:', error);
    res.status(500).json({ message: 'Failed to create profile' });
  }
};

// PUT endpoint to update a profile
export const ProfilePut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const updatedFields = req.body;

    const sqlQuery = await query('professional_profiles')
      .where('profile_id', profile_id)
      .update(updatedFields);

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Profile not found' });
    } else {
      const updatedProfile = await query('professional_profiles')
        .where('profile_id', profile_id)
        .first() as ProfessionalProfile;
      res.json(updatedProfile);
    }
  } catch (error) {
    console.error('Failed to update profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// DELETE endpoint to delete a profile
export const ProfileDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const sqlQuery = await query('professional_profiles')
      .where('profile_id', profile_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      res.status(404).json({ message: 'Profile not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete profile:', error);
    res.status(500).json({ message: 'Failed to delete profile' });
  }
};

// ===============================================================
// ========================== EDUCATION ==========================
// ===============================================================

// Returns the professional profile's education with the given profile_id
export const ProfileEducationGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const sqlQuery = await query('education')
      .select('*')
      .where('profile_id', profile_id) as Education[];
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get user\'s experience' + error);
    res.status(404).json({ message: 'Education id not found' });
  }
};

// Returns the education with the given education_id
export const EducationGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { education_id } = req.params;
    const sqlQuery = await query('education')
      .select('*')
      .where('education_id', education_id)
      .first() as Education;
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get education' + error);
    res.status(404).json({ message: 'Education id not found' });
  }
};

// POST endpoint to create an education
export const EducationPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newEducation = req.body;

    const sqlQuery = await query('education').insert(newEducation);
    const insertedEducationId = sqlQuery[0];

    const createdEducation = await query('education')
      .where('education_id', insertedEducationId)
      .first() as Education;

    res.status(201).json(createdEducation);
  } catch (error) {
    console.error('Failed to create education:', error);
    res.status(500).json({ message: 'Failed to create education' });
  }
};

// PUT endpoint to update an education
export const EducationPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { education_id } = req.params;
    const updatedFields = req.body;

    const sqlQuery = await query('education')
      .where('education_id', education_id)
      .update(updatedFields);

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Education not found' });
    } else {
      const updatedEducation = await query('education')
        .where('education_id', education_id)
        .first() as Education;
      res.json(updatedEducation);
    }
  } catch (error) {
    console.error('Failed to update education:', error);
    res.status(500).json({ message: 'Failed to update education' });
  }
};

// DELETE endpoint to delete an education
export const EducationDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { education_id } = req.params;
    const sqlQuery = await query('education')
      .where('education_id', education_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      res.status(404).json({ message: 'Education not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete ducation:', error);
    res.status(500).json({ message: 'Failed to delete education' });
  }
};

// ===============================================================
// ========================== EXPERIENCE =========================
// ===============================================================

// Returns the professional profile's experience with the given profile_id
export const ProfileExperienceGet: RequestHandler = async (_req: Request, res: Response) => {
  try {
    const { profile_id } = _req.params;
    const sqlQuery = await query('experience')
      .select('*')
      .where('profile_id', profile_id) as Experience[];
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get user\'s experience' + error);
    res.status(404).json({ message: 'Experience id not found' });
  }
};


// Returns the experience with the given experience_id
export const ExperienceGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { experience_id } = req.params;
    const sqlQuery = await query('experience')
      .select('*')
      .where('experience_id', experience_id)
      .first() as Experience;
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get experience' + error);
    res.status(404).json({ message: 'Experience id not found' });
  }
};

// POST endpoint to create an experience
export const ExperiencePost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newExperience = req.body;

    const sqlQuery = await query('experience').insert(newExperience);
    const insertedExperienceId = sqlQuery[0];

    const createdExperience = await query('experience')
      .where('experience_id', insertedExperienceId)
      .first() as Experience;

    res.status(201).json(createdExperience);
  } catch (error) {
    console.error('Failed to create experience:', error);
    res.status(500).json({ message: 'Failed to create experience' });
  }
};

// PUT endpoint to update an experience
export const ExperiencePut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { experience_id } = req.params;
    const updatedFields = req.body;

    const sqlQuery = await query('experience')
      .where('experience_id', experience_id)
      .update(updatedFields);

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Experience not found' });
    } else {
      const updatedExperience = await query('experience')
        .where('experience_id', experience_id)
        .first() as Experience;
      res.json(updatedExperience);
    }
  } catch (error) {
    console.error('Failed to update experience:', error);
    res.status(500).json({ message: 'Failed to update experience' });
  }
};

// DELETE endpoint to delete an experience
export const ExperienceDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { experience_id } = req.params;
    const sqlQuery = await query('experience')
      .where('experience_id', experience_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      res.status(404).json({ message: 'Experience not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete experience:', error);
    res.status(500).json({ message: 'Failed to delete experience' });
  }
};
