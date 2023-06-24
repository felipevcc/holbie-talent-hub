import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { ProfessionalProfile, Education, Experience } from "../types/professional_profiles.d";
import { CompanyProfile } from "../types/company_profiles.d";

// ===============================================================
// ==================== PROFESSIONAL_PROFILES ====================
// ===============================================================

// Returns all the profiles
export const ProfilesGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('professional_profiles')
    .select('*')
    .where('is_user', true) as ProfessionalProfile[];
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
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Profile id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get profile', error);
    return res.status(500).json({ message: 'Failed to get profile' });
  }
};

// POST endpoint to create a profile
export const ProfilePost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { is_user, headline, about_me, location, job_name, kind_job, job_type, salary_min, salary_max } = req.body;

    const sqlQuery = await query('professional_profiles')
      .insert({ is_user, headline, about_me, location, job_name, kind_job, job_type, salary_min, salary_max });
    const insertedProfileId = sqlQuery[0];

    const createdProfile = await query('professional_profiles')
      .where('profile_id', insertedProfileId)
      .first() as ProfessionalProfile;

    return res.status(201).json(createdProfile);
  } catch (error) {
    console.error('Failed to create profile:', error);
    return res.status(500).json({ message: 'Failed to create profile' });
  }
};

// PUT endpoint to update a profile
export const ProfilePut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { headline, about_me, location, job_name, kind_job, job_type, salary_min, salary_max } = req.body;

    const sqlQuery = await query('professional_profiles')
      .where('profile_id', profile_id)
      .update({ headline, about_me, location, job_name, kind_job, job_type, salary_min, salary_max });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Profile not found' });
    } else {
      const updatedProfile = await query('professional_profiles')
        .where('profile_id', profile_id)
        .first() as ProfessionalProfile;
      return res.json(updatedProfile);
    }
  } catch (error) {
    console.error('Failed to update profile:', error);
    return res.status(500).json({ message: 'Failed to update profile' });
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
      return res.status(404).json({ message: 'Profile not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete profile:', error);
    return res.status(500).json({ message: 'Failed to delete profile' });
  }
};

// ===============================================================
// ========================== EDUCATION ==========================
// ===============================================================

// Returns the professional profile's education with the given profile_id
export const ProfileEducationGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;

    // Check if the profile exists
    const profileExists = await query('professional_profiles')
      .select('profile_id')
      .where('profile_id', profile_id)
      .first();
    if (!profileExists) {
      return res.status(404).json({ message: 'Profile id not found' });
    }

    const sqlQuery = await query('education')
      .select('*')
      .where('profile_id', profile_id) as Education[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get user\'s experience', error);
    return res.status(500).json({ message: 'Failed to get user\'s experience' });
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
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Education id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get profile\'s education' + error);
    return res.status(500).json({ message: 'Failed to get profile\'s education' });
  }
};

// POST endpoint to create an education
export const EducationPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { institution, degree, field_of_study, start_date, end_date = null } = req.body;

    const sqlQuery = await query('education')
      .insert({ institution, degree, field_of_study, start_date, end_date, profile_id });
    const insertedEducationId = sqlQuery[0];

    const createdEducation = await query('education')
      .where('education_id', insertedEducationId)
      .first() as Education;
    return res.status(201).json(createdEducation);
  } catch (error) {
    console.error('Failed to create education:', error);
    return res.status(500).json({ message: 'Failed to create education' });
  }
};

// PUT endpoint to update an education
export const EducationPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { education_id } = req.params;
    const { institution, degree, field_of_study, start_date, end_date } = req.body;

    const sqlQuery = await query('education')
      .where('education_id', education_id)
      .update({ institution, degree, field_of_study, start_date, end_date });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Education not found' });
    } else {
      const updatedEducation = await query('education')
        .where('education_id', education_id)
        .first() as Education;
      return res.json(updatedEducation);
    }
  } catch (error) {
    console.error('Failed to update education:', error);
    return res.status(500).json({ message: 'Failed to update education' });
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
      return res.status(404).json({ message: 'Education not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete ducation:', error);
    return res.status(500).json({ message: 'Failed to delete education' });
  }
};

// ===============================================================
// ========================== EXPERIENCE =========================
// ===============================================================

// Returns the professional profile's experience with the given profile_id
export const ProfileExperienceGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;

    // Check if the profile exists
    const profileExists = await query('professional_profiles')
      .select('profile_id')
      .where('profile_id', profile_id)
      .first();
    if (!profileExists) {
      return res.status(404).json({ message: 'Profile id not found' });
    }

    const sqlQuery = await query('experience')
      .select('*')
      .where('profile_id', profile_id) as Experience[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get profile\'s experience', error);
    return res.status(500).json({ message: 'Failed to get user\'s experience' });
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
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Experience id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get experience', error);
    return res.status(500).json({ message: 'Failed to get experience' });
  }
};

// POST endpoint to create an experience
export const ExperiencePost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { company_name, position, description, start_date, end_date = null } = req.body;

    const sqlQuery = await query('experience')
      .insert({ company_name, position, description, start_date, end_date, profile_id });
    const insertedExperienceId = sqlQuery[0];

    const createdExperience = await query('experience')
      .where('experience_id', insertedExperienceId)
      .first() as Experience;

    return res.status(201).json(createdExperience);
  } catch (error) {
    console.error('Failed to create experience:', error);
    return res.status(500).json({ message: 'Failed to create experience' });
  }
};

// PUT endpoint to update an experience
export const ExperiencePut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { experience_id } = req.params;
    const { company_name, description, start_date, end_date } = req.body;

    const sqlQuery = await query('experience')
      .where('experience_id', experience_id)
      .update({ company_name, description, start_date, end_date });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Experience not found' });
    } else {
      const updatedExperience = await query('experience')
        .where('experience_id', experience_id)
        .first() as Experience;
      return res.json(updatedExperience);
    }
  } catch (error) {
    console.error('Failed to update experience:', error);
    return res.status(500).json({ message: 'Failed to update experience' });
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
      return res.status(404).json({ message: 'Experience not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete experience:', error);
    return res.status(500).json({ message: 'Failed to delete experience' });
  }
};

// ===============================================================
// ============= COMPANY_PROFESSIONAL_PROFILES (jobs) ============
// ===============================================================

// Returns the jobs with the given profile_id
export const JobGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;

    // Check if the profile exists
    const profileExists = await query('professional_profiles')
      .select('profile_id')
      .where('profile_id', profile_id)
      .first();
    if (!profileExists) {
      return res.status(404).json({ message: 'Profile id not found' });
    }

    const sqlQuery = await query('company_professional_profiles')
      .select('company_professional_profiles.company_id', 'company_profiles.company_name')
      .join('company_profiles', 'company_profiles.profile_id', 'company_professional_profiles.company_id')
      .where('company_professional_profiles.professional_profile_id', profile_id) as CompanyProfile[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get jobs', error);
    return res.status(500).json({ message: 'Failed to get jobs' });
  }
};
