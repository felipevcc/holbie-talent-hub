import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { ProfessionalContact, CompanyContact, ProjectContact } from "../types/contacts.d";

// ===============================================================
// ================ PROFESSIONAL_PROFILE_CONTACTS ================
// ===============================================================

// Returns all the professional profile contacts with the given profile_id
export const ProfessionalContactsGet: RequestHandler = async (req: Request, res: Response) => {
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

    const sqlQuery = await query('professional_profile_contacts')
      .select('*')
      .where('profile_id', profile_id) as ProfessionalContact[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get contacts', error);
    return res.status(500).json({ message: 'Failed to get contacts' });
  }
};

// Returns the professional profile contact with the given contact_id
export const ProfessionalContactGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { contact_id } = req.params;
    const sqlQuery = await query('professional_profile_contacts')
      .select('*')
      .where('contact_id', contact_id)
      .first() as ProfessionalContact;
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Contact id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get contact', error);
    return res.status(500).json({ message: 'Failed to get contact' });
  }
};
//
// POST endpoint to create a professional profile contact
export const ProfessionalContactPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { contact_type, contact_info } = req.body;

    const sqlQuery = await query('professional_profile_contacts')
      .insert({ contact_type, contact_info, profile_id });
    const insertedContactId = sqlQuery[0];

    const createdContact = await query('professional_profile_contacts')
      .where('contact_id', insertedContactId)
      .first() as ProfessionalContact;

    return res.status(201).json(createdContact);
  } catch (error) {
    console.error('Failed to create contact:', error);
    return res.status(500).json({ message: 'Failed to create contact' });
  }
};

// PUT endpoint to update a professional profile contact
export const ProfessionalContactPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { contact_id } = req.params;
    const { contact_type, contact_info } = req.body;

    const sqlQuery = await query('professional_profile_contacts')
      .where('contact_id', contact_id)
      .update({ contact_type, contact_info });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Contact not found' });
    } else {
      const updatedContact = await query('professional_profile_contacts')
        .where('contact_id', contact_id)
        .first() as ProfessionalContact;
      return res.json(updatedContact);
    }
  } catch (error) {
    console.error('Failed to update contact:', error);
    return res.status(500).json({ message: 'Failed to update contact' });
  }
};

// DELETE endpoint to delete a professional profile contact
export const ProfessionalContactDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { contact_id } = req.params;
    const sqlQuery = await query('professional_profile_contacts')
      .where('contact_id', contact_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      return res.status(404).json({ message: 'Contact not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete contact:', error);
    return res.status(500).json({ message: 'Failed to delete contact' });
  }
};

// ===============================================================
// ================== COMPANY_PROFILE_CONTACTS ===================
// ===============================================================

// Returns all the company profile contacts with the given company_id
export const CompanyContactsGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;

    // Check if company profile exists
    const profileExists = await query('company_profiles')
      .select('profile_id')
      .where('profile_id', profile_id)
      .first();
    if (!profileExists) {
      return res.status(404).json({ message: 'Company profile id not found' });
    }

    const sqlQuery = await query('company_contacts')
      .select('*')
      .where('company_id', profile_id) as CompanyContact[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get company contacts', error);
    return res.status(500).json({ message: 'Failed to get company contacts' });
  }
};

// Returns the company profile contact with the given contact_id
export const CompanyContactGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { contact_id } = req.params;
    const sqlQuery = await query('company_contacts')
      .select('*')
      .where('contact_id', contact_id)
      .first() as CompanyContact;
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Contact id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get company contact', error);
    return res.status(500).json({ message: 'Failed to get company contact' });
  }
};

// POST endpoint to create a company profile contact
export const CompanyContactPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { profile_id } = req.params;
    const { contact_type, contact_info } = req.body;

    const sqlQuery = await query('company_contacts')
      .insert({ contact_type, contact_info, company_id: profile_id });
    const insertedContactId = sqlQuery[0];

    const createdContact = await query('company_contacts')
      .where('contact_id', insertedContactId)
      .first() as CompanyContact;

    return res.status(201).json(createdContact);
  } catch (error) {
    console.error('Failed to create contact:', error);
    return res.status(500).json({ message: 'Failed to create contact' });
  }
};

// PUT endpoint to update a company profile contact
export const CompanyContactPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { contact_id } = req.params;
    const { contact_type, contact_info } = req.body;

    const sqlQuery = await query('company_contacts')
      .where('contact_id', contact_id)
      .update({ contact_type, contact_info });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Contact not found' });
    } else {
      const updatedContact = await query('company_contacts')
        .where('contact_id', contact_id)
        .first() as CompanyContact;
      return res.json(updatedContact);
    }
  } catch (error) {
    console.error('Failed to update contact:', error);
    return res.status(500).json({ message: 'Failed to update contact' });
  }
};

// DELETE endpoint to delete a company profile contact
export const CompanyContactDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { contact_id } = req.params;
    const sqlQuery = await query('company_contacts')
      .where('contact_id', contact_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      return res.status(404).json({ message: 'Contact not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete contact:', error);
    return res.status(500).json({ message: 'Failed to delete contact' });
  }
};

// ===============================================================
// ====================== PROJECT_CONTACTS =======================
// ===============================================================

// Returns all the project contacts with the given project_id
export const ProjectContactsGet: RequestHandler = async (req: Request, res: Response) => {
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

    const sqlQuery = await query('project_contacts')
      .select('*')
      .where('project_id', project_id) as ProjectContact[];
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get project contacts', error);
    return res.status(500).json({ message: 'Failed to get project contacts' });
  }
};

// Returns the project contact with the given contact_id
export const ProjectContactGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { contact_id } = req.params;
    const sqlQuery = await query('project_contacts')
      .select('*')
      .where('contact_id', contact_id)
      .first() as ProjectContact;
    if (!sqlQuery) {
      return res.status(404).json({ message: 'Contact id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get project contact', error);
    return res.status(500).json({ message: 'Failed to get project contact' });
  }
};

// POST endpoint to create a project contact
export const ProjectContactPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;
    const { contact_type, contact_info } = req.body;

    const sqlQuery = await query('project_contacts')
      .insert({ contact_type, contact_info, project_id });
    const insertedContactId = sqlQuery[0];

    const createdContact = await query('project_contacts')
      .where('contact_id', insertedContactId)
      .first() as ProjectContact;

    return res.status(201).json(createdContact);
  } catch (error) {
    console.error('Failed to create contact:', error);
    return res.status(500).json({ message: 'Failed to create contact' });
  }
};

// PUT endpoint to update a project contact
export const ProjectContactPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { contact_id } = req.params;
    const { contact_type, contact_info } = req.body;

    const sqlQuery = await query('project_contacts')
      .where('contact_id', contact_id)
      .update({ contact_type, contact_info });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'Contact not found' });
    } else {
      const updatedContact = await query('project_contacts')
        .where('contact_id', contact_id)
        .first() as ProjectContact;
      return res.json(updatedContact);
    }
  } catch (error) {
    console.error('Failed to update contact:', error);
    return res.status(500).json({ message: 'Failed to update contact' });
  }
};

// DELETE endpoint to delete a project contact
export const ProjectContactDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { contact_id } = req.params;
    const sqlQuery = await query('project_contacts')
      .where('contact_id', contact_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      return res.status(404).json({ message: 'Contact not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete contact:', error);
    return res.status(500).json({ message: 'Failed to delete contact' });
  }
};
