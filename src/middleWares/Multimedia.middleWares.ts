import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { ProfessionalMultimedia, CompanyMultimedia, ProjectMultimedia, EducationMultimedia } from "../types/multimedia.d";

// ===============================================================
// ================ PROFESSIONAL_PROFILE_MULTIMEDIA ================
// ===============================================================

// Returns all the professional profile multimedia with the given profile_id
export const ProfessionalMultimediaGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const sqlQuery = await query('professional_profile_multimedia')
      .select('*')
      .where('profile_id', profile_id) as ProfessionalMultimedia[];
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get multimedia', error);
    res.status(500).json({ message: 'Failed to get multimedia' });
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
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get multimedia', error);
    res.status(500).json({ message: 'Failed to get multimedia id' });
  }
};

// POST endpoint to create a professional profile multimedia
export const ProfessionalMultimediaPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { media_type, file_path } = req.body;

    const sqlQuery = await query('professional_profile_multimedia')
      .insert({ media_type, file_path, profile_id });
    const insertedMultimediaId = sqlQuery[0];

    const createdMultimedia = await query('professional_profile_multimedia')
      .where('media_id', insertedMultimediaId)
      .first() as ProfessionalMultimedia;

    res.status(201).json(createdMultimedia);
  } catch (error) {
    console.error('Failed to create multimedia:', error);
    res.status(500).json({ message: 'Failed to create multimedia' });
  }
};

// PUT endpoint to update a professional profile multimedia
export const ProfessionalMultimediaPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const { media_type, file_path } = req.body;

    const sqlQuery = await query('professional_profile_multimedia')
      .where('media_id', media_id)
      .update({ media_type, file_path });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Multimedia not found' });
    } else {
      const updatedMultimedia = await query('professional_profile_multimedia')
        .where('media_id', media_id)
        .first() as ProfessionalMultimedia;
      res.json(updatedMultimedia);
    }
  } catch (error) {
    console.error('Failed to update multimedia:', error);
    res.status(500).json({ message: 'Failed to update multimedia' });
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
      res.status(404).json({ message: 'Multimedia not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete multimedia:', error);
    res.status(500).json({ message: 'Failed to delete multimedia' });
  }
};

// ===============================================================
// ================= COMPANY_PROFILE_MULTIMEDIA ==================
// ===============================================================

// Returns all the company profile multimedia with the given company_id
export const CompanyMultimediaGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const sqlQuery = await query('company_multimedia')
      .select('*')
      .where('profile_id', profile_id) as CompanyMultimedia[];
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get company multimedia', error);
    res.status(500).json({ message: 'Failed to get company multimedia' });
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
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get company multimedia', error);
    res.status(500).json({ message: 'Failed to get company multimedia' });
  }
};

// POST endpoint to create company multimedia
export const CompanyMultimediaPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { media_type, file_path } = req.body;

    const sqlQuery = await query('company_multimedia')
      .insert({ media_type, file_path, profile_id });
    const insertedMediaId = sqlQuery[0];

    const createdMedia = await query('company_multimedia')
      .where('media_id', insertedMediaId)
      .first() as CompanyMultimedia;

    res.status(201).json(createdMedia);
  } catch (error) {
    console.error('Failed to create multimedia:', error);
    res.status(500).json({ message: 'Failed to create multimedia' });
  }
};

// PUT endpoint to update company multimedia 
export const CompanyMultimediaPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const { media_type, file_path } = req.body;

    const sqlQuery = await query('company_multimedia')
      .where('media_id', media_id)
      .update({ media_type, file_path });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Multimedia not found' });
    } else {
      const updatedMultimedia = await query('company_multimedia')
        .where('media_id', media_id)
        .first() as CompanyMultimedia;
      res.json(updatedMultimedia);
    }
  } catch (error) {
    console.error('Failed to update multimedia:', error);
    res.status(500).json({ message: 'Failed to update multimedia' });
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
      res.status(404).json({ message: 'Multimedia not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete media:', error);
    res.status(500).json({ message: 'Failed to delete media' });
  }
};

// ===============================================================
// ====================== PROJECT_MULTIMEDIA =====================
// ===============================================================

// Returns all the project multimedia with the given project_id
export const ProjectMultimediaGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;
    const sqlQuery = await query('project_multimedia')
      .select('*')
      .where('project_id', project_id) as ProjectMultimedia[];
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get project multimedia', error);
    res.status(500).json({ message: 'Failed to get project multimedia' });
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
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get project multimedia', error);
    res.status(500).json({ message: 'Failed to get project multimedia' });
  }
};

// POST endpoint to create a project multimedia
export const ProjectMultimediaPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;
    const { media_type, file_path } = req.body;

    const sqlQuery = await query('project_multimedia')
      .insert({ media_type, file_path, project_id });
    const insertedMultimediaId = sqlQuery[0];

    const createdMultimedia = await query('project_multimedia')
      .where('media_id', insertedMultimediaId)
      .first() as ProjectMultimedia;

    res.status(201).json(createdMultimedia);
  } catch (error) {
    console.error('Failed to create multimedia:', error);
    res.status(500).json({ message: 'Failed to create multimedia' });
  }
};

// PUT endpoint to update a project multimedia
export const ProjectMultimediaPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const { media_type, file_path } = req.body;

    const sqlQuery = await query('project_multimedia')
      .where('media_id', media_id)
      .update({ media_type, file_path });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Multimedia not found' });
    } else {
      const updatedMultimedia = await query('project_multimedia')
        .where('media_id', media_id)
        .first() as ProjectMultimedia;
      res.json(updatedMultimedia);
    }
  } catch (error) {
    console.error('Failed to update multimedia:', error);
    res.status(500).json({ message: 'Failed to update multimedia' });
  }
};

// DELETE endpoint to delete a project multimedia
export const ProjectMultimediaDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const sqlQuery = await query('project_cmultimedia')
      .where('media_id', media_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      res.status(404).json({ message: 'Multimedia not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete multimedia:', error);
    res.status(500).json({ message: 'Failed to delete multimedia' });
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
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get education multimedia', error);
    res.status(500).json({ message: 'Failed to get education multimedia' });
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
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get education multimedia', error);
    res.status(500).json({ message: 'Failed to get education multimedia' });
  }
};

// POST endpoint to create a education multimedia
export const EducationMultimediaPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { education_id } = req.params;
    const { media_type, file_path } = req.body;

    const sqlQuery = await query('education_multimedia')
      .insert({ media_type, file_path, education_id });
    const insertedMultimediaId = sqlQuery[0];

    const createdMultimedia = await query('education_multimedia')
      .where('media_id', insertedMultimediaId)
      .first() as EducationMultimedia;

    res.status(201).json(createdMultimedia);
  } catch (error) {
    console.error('Failed to create multimedia:', error);
    res.status(500).json({ message: 'Failed to create multimedia' });
  }
};

// PUT endpoint to update a education multimedia
export const EducationMultimediaPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const { media_type, file_path } = req.body;

    const sqlQuery = await query('education_multimedia')
      .where('media_id', media_id)
      .update({ media_type, file_path });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Multimedia not found' });
    } else {
      const updatedMultimedia = await query('education_multimedia')
        .where('media_id', media_id)
        .first() as EducationMultimedia;
      res.json(updatedMultimedia);
    }
  } catch (error) {
    console.error('Failed to update multimedia:', error);
    res.status(500).json({ message: 'Failed to update multimedia' });
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
      res.status(404).json({ message: 'Multimedia not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete multimedia:', error);
    res.status(500).json({ message: 'Failed to delete multimedia' });
  }
};
