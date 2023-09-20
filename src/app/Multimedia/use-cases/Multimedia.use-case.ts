import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../../../infrastructure/MySQL/ConnetDB.services";
import {
  ProfessionalMultimedia,
  CompanyMultimedia,
  ProjectMultimedia,
  EducationMultimedia
} from "../domain/Multimedia.d";

// ===============================================================
// ================ PROFESSIONAL_PROFILE_MULTIMEDIA ==============
// ===============================================================

// Returns all the professional profile multimedia with the given profile_id
export const ProfessionalMultimediaGet: RequestHandler = async (req: Request, res: Response) => {
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

    const sqlQuery = await query('professional_profile_multimedia')
      .select('*')
      .where('profile_id', profile_id) as ProfessionalMultimedia[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get multimedia', error);
    return res.status(500).json({ message: 'Failed to get multimedia' });
  }
};

// Returns the professional profile multimedia with the given multimedia_id
export const ProfessionalMultimediaGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const sqlQuery = await query('professional_profile_multimedia')
      .select('*')
      .where('media_id', media_id)
      .first() as ProfessionalMultimedia;
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Media id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get multimedia', error);
    return res.status(500).json({ message: 'Failed to get multimedia id' });
  }
};

// POST endpoint to create a professional profile multimedia
export const ProfessionalMultimediaPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { media_type, file_path, title, description } = req.body;

    const sqlQuery = await query('professional_profile_multimedia')
      .insert({ media_type, file_path, title, description, profile_id });
    const insertedMultimediaId = sqlQuery[0];

    const createdMultimedia = await query('professional_profile_multimedia')
      .where('media_id', insertedMultimediaId)
      .first() as ProfessionalMultimedia;

    return res.status(201).json(createdMultimedia);
  } catch (error) {
    console.error('Failed to create multimedia:', error);
    return res.status(500).json({ message: 'Failed to create multimedia' });
  }
};

// PUT endpoint to update a professional profile multimedia
export const ProfessionalMultimediaPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const { media_type, file_path, title, description } = req.body;

    const sqlQuery = await query('professional_profile_multimedia')
      .where('media_id', media_id)
      .update({ media_type, file_path, title, description });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Multimedia not found' });
    } else {
      const updatedMultimedia = await query('professional_profile_multimedia')
        .where('media_id', media_id)
        .first() as ProfessionalMultimedia;
      return res.json(updatedMultimedia);
    }
  } catch (error) {
    console.error('Failed to update multimedia:', error);
    return res.status(500).json({ message: 'Failed to update multimedia' });
  }
};

// DELETE endpoint to delete a professional profile multimedia
export const ProfessionalMultimediaDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const sqlQuery = await query('professional_profile_multimedia')
      .where('media_id', media_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      return res.status(404).json({ message: 'Multimedia not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete multimedia:', error);
    return res.status(500).json({ message: 'Failed to delete multimedia' });
  }
};

// ===============================================================
// ================= COMPANY_PROFILE_MULTIMEDIA ==================
// ===============================================================

// Returns all the company profile multimedia with the given company_id
export const CompanyMultimediaGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;

    // Check if company profile exists
    const companyExists = await query('company_profiles')
      .select('profile_id')
      .where('profile_id', profile_id)
      .first();
    if (!companyExists) {
      return res.status(404).json({ message: 'Profile id not found' });
    }

    const sqlQuery = await query('company_multimedia')
      .select('*')
      .where('profile_id', profile_id) as CompanyMultimedia[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get company multimedia', error);
    return res.status(500).json({ message: 'Failed to get company multimedia' });
  }
};

// Returns the company profile multimedia with the given media_id
export const CompanyMultimediaGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const sqlQuery = await query('company_multimedia')
      .select('*')
      .where('media_id', media_id)
      .first() as CompanyMultimedia;
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Media id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get company multimedia', error);
    return res.status(500).json({ message: 'Failed to get company multimedia' });
  }
};

// POST endpoint to create company multimedia
export const CompanyMultimediaPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { media_type, file_path, description, title } = req.body;

    const sqlQuery = await query('company_multimedia')
      .insert({ media_type, file_path, profile_id, description, title });
    const insertedMediaId = sqlQuery[0];

    const createdMedia = await query('company_multimedia')
      .where('media_id', insertedMediaId)
      .first() as CompanyMultimedia;

    return res.status(201).json(createdMedia);
  } catch (error) {
    console.error('Failed to create multimedia:', error);
    return res.status(500).json({ message: 'Failed to create multimedia' });
  }
};

// PUT endpoint to update company multimedia 
export const CompanyMultimediaPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const { media_type, file_path, description, title } = req.body;

    const sqlQuery = await query('company_multimedia')
      .where('media_id', media_id)
      .update({ media_type, file_path, description, title });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Multimedia not found' });
    } else {
      const updatedMultimedia = await query('company_multimedia')
        .where('media_id', media_id)
        .first() as CompanyMultimedia;
      return res.json(updatedMultimedia);
    }
  } catch (error) {
    console.error('Failed to update multimedia:', error);
    return res.status(500).json({ message: 'Failed to update multimedia' });
  }
};

// DELETE endpoint to delete company multimedia
export const CompanyMediaDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const sqlQuery = await query('company_multimedia')
      .where('media_id', media_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      return res.status(404).json({ message: 'Multimedia not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete media:', error);
    return res.status(500).json({ message: 'Failed to delete media' });
  }
};

// ===============================================================
// ====================== PROJECT_MULTIMEDIA =====================
// ===============================================================

// Returns all the project multimedia with the given project_id
export const ProjectMultimediaGet: RequestHandler = async (req: Request, res: Response) => {
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

    const sqlQuery = await query('project_multimedia')
      .select('*')
      .where('project_id', project_id) as ProjectMultimedia[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get project multimedia', error);
    return res.status(500).json({ message: 'Failed to get project multimedia' });
  }
};

// Returns the project multimedia with the given multimedia_id
export const ProjectMultimediaGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const sqlQuery = await query('project_multimedia')
      .select('*')
      .where('media_id', media_id)
      .first() as ProjectMultimedia;
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Media id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get project multimedia', error);
    return res.status(500).json({ message: 'Failed to get project multimedia' });
  }
};

// POST endpoint to create a project multimedia
export const ProjectMultimediaPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;
    const { media_type, file_path, description, title } = req.body;

    const sqlQuery = await query('project_multimedia')
      .insert({ media_type, file_path, project_id, description, title });
    const insertedMultimediaId = sqlQuery[0];

    const createdMultimedia = await query('project_multimedia')
      .where('media_id', insertedMultimediaId)
      .first() as ProjectMultimedia;

    return res.status(201).json(createdMultimedia);
  } catch (error) {
    console.error('Failed to create multimedia:', error);
    return res.status(500).json({ message: 'Failed to create multimedia' });
  }
};

// PUT endpoint to update a project multimedia
export const ProjectMultimediaPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const { media_type, file_path, description, title } = req.body;

    const sqlQuery = await query('project_multimedia')
      .where('media_id', media_id)
      .update({ media_type, file_path, description, title });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Multimedia not found' });
    } else {
      const updatedMultimedia = await query('project_multimedia')
        .where('media_id', media_id)
        .first() as ProjectMultimedia;
      return res.json(updatedMultimedia);
    }
  } catch (error) {
    console.error('Failed to update multimedia:', error);
    return res.status(500).json({ message: 'Failed to update multimedia' });
  }
};

// DELETE endpoint to delete a project multimedia
export const ProjectMultimediaDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const sqlQuery = await query('project_multimedia')
      .where('media_id', media_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      return res.status(404).json({ message: 'Multimedia not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete multimedia:', error);
    return res.status(500).json({ message: 'Failed to delete multimedia' });
  }
};

// ===============================================================
// =================== EDUCATION - MULTIMEDIA ====================
// ===============================================================

// Returns all the education multimedia with the given education_id
export const EducationMultimediaGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { education_id } = req.params;
    const sqlQuery = await query('education_multimedia')
      .select('*')
      .where('education_id', education_id) as EducationMultimedia[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get education multimedia', error);
    return res.status(500).json({ message: 'Failed to get education multimedia' });
  }
};

// Returns the education multimedia with the given multimedia_id
export const EducationMultimediaGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const sqlQuery = await query('education_multimedia')
      .select('*')
      .where('media_id', media_id)
      .first() as EducationMultimedia;
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get education multimedia', error);
    return res.status(500).json({ message: 'Failed to get education multimedia' });
  }
};

// POST endpoint to create a education multimedia
export const EducationMultimediaPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { education_id } = req.params;
    const { media_type, file_path, description, title } = req.body;

    const sqlQuery = await query('education_multimedia')
      .insert({ media_type, file_path, education_id, description, title });
    const insertedMultimediaId = sqlQuery[0];

    const createdMultimedia = await query('education_multimedia')
      .where('media_id', insertedMultimediaId)
      .first() as EducationMultimedia;

    return res.status(201).json(createdMultimedia);
  } catch (error) {
    console.error('Failed to create multimedia:', error);
    return res.status(500).json({ message: 'Failed to create multimedia' });
  }
};

// PUT endpoint to update a education multimedia
export const EducationMultimediaPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const { media_type, file_path, description, title } = req.body;

    const sqlQuery = await query('education_multimedia')
      .where('media_id', media_id)
      .update({ media_type, file_path, description, title });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Multimedia not found' });
    } else {
      const updatedMultimedia = await query('education_multimedia')
        .where('media_id', media_id)
        .first() as EducationMultimedia;
      return res.json(updatedMultimedia);
    }
  } catch (error) {
    console.error('Failed to update multimedia:', error);
    return res.status(500).json({ message: 'Failed to update multimedia' });
  }
};

// DELETE endpoint to delete a education multimedia
export const EducationMultimediaDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const sqlQuery = await query('education_multimedia')
      .where('media_id', media_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      return res.status(404).json({ message: 'Multimedia not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete multimedia:', error);
    return res.status(500).json({ message: 'Failed to delete multimedia' });
  }
};
