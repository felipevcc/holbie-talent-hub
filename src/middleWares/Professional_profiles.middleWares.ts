import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { ProfessionalProfile, Education, Experience } from "../types/professional_profiles.d";
import { CompanyProfile } from "../types/company_profiles.d";
import { Application } from "../types/applications.d";

// ===============================================================
// ==================== PROFESSIONAL_PROFILES ====================
// ===============================================================

// Returns all the profiles
export const ProfilesGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('professional_profiles').select('*') as ProfessionalProfile[];
  res.json(sqlQuery);
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
    const { is_user, headline, about_me, location, job_name, kind_job, job_type, salary_min, salary_max } = req.body;

    const sqlQuery = await query('professional_profiles')
      .insert({ is_user, headline, about_me, location, job_name, kind_job, job_type, salary_min, salary_max });
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
    const { headline, about_me, location, job_name, kind_job, job_type, salary_min, salary_max } = req.body;

    const sqlQuery = await query('professional_profiles')
      .where('profile_id', profile_id)
      .update({ headline, about_me, location, job_name, kind_job, job_type, salary_min, salary_max });

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
    console.error('Failed to get profile\'s education' + error);
    res.status(404).json({ message: 'Failed to get profile\'s education' });
  }
};

// POST endpoint to create an education
export const EducationPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { institution, degree, field_of_study, profile_id } = req.body;

    const sqlQuery = await query('education')
      .insert({ institution, degree, field_of_study, profile_id });
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
    const { institution, degree, field_of_study, start_date, end_date } = req.body;

    const sqlQuery = await query('education')
      .where('education_id', education_id)
      .update({ institution, degree, field_of_study, start_date, end_date });

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
export const ProfileExperienceGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const sqlQuery = await query('experience')
      .select('*')
      .where('profile_id', profile_id) as Experience[];
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get profile\'s experience' + error);
    res.status(404).json({ message: 'Failed to get user\'s experience' });
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
    const { company_name, position, description, start_date, end_date, profile_id } = req.body;

    const sqlQuery = await query('experience')
      .insert({ company_name, position, description, start_date, end_date, profile_id});
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
    const { company_name, description, start_date, end_date } = req.body;

    const sqlQuery = await query('experience')
      .where('experience_id', experience_id)
      .update({ company_name, description, start_date, end_date });

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

// ===============================================================
// ============= COMPANY_PROFESSIONAL_PROFILES (jobs) ============
// ===============================================================

// Returns the jobs with the given profile_id
export const JobGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const sqlQuery = await query('company_professional_profiles')
      .select('company_id')
      .where('professional_profile_id', profile_id) as CompanyProfile[];
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get jobs' + error);
    res.status(404).json({ message: 'Profile id not found' });
  }
};

// POST endpoint to create a job
export const JobPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { company_id, professional_profile_id } = req.body;
    await query('company_professional_profiles').insert({ company_id, professional_profile_id });

    const createdJob = await query('company_professional_profiles')
      .where('professional_profile_id', professional_profile_id)
      .andWhere('company_id', company_id)
      .first() as CompanyProfile;

    res.status(201).json(createdJob);
  } catch(error) {
    console.log('Failed to create job' ,error);
    res.status(500).json({message: 'Failed to create job'});
  }
};

// ===============================================================
// ============= PROFESSIONAL_PROFILES - APPLICATIONS ============
// ===============================================================

// Returns the professional profiles applications with the given profile_id
export const ProfileApplicationsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const sqlQuery = await query('applications')
      .select('*')
      .where('profile_id', profile_id) as Application[];
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get applications' + error);
    res.status(404).json({ message: 'Profile id not found' });
  }
};
