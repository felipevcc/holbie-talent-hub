import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { ProfessionalContact, CompanyContact, ProjectContact } from "../types/contacts.d";

// ===============================================================
// ================ PROFESSIONAL_PROFILE_CONTACTS ================
// ===============================================================

// Returns all the professional profile contacts with the given profile_id
export const ProfessionalContactsGet: RequestHandler = async (_req: Request, res: Response) => {
  const { profile_id } = _req.params;
  const sqlQuery = await query('professional_profile_contacts')
    .select('*')
    .where('profile_id', profile_id) as ProfessionalContact[];
  return res.json(sqlQuery);
};

// Returns the professional profile contact with the given contact_id
export const ProfessionalContactGetById: RequestHandler = async (req: Request, res: Response) => {
  const { contact_id } = req.params;
  const sqlQuery = await query('professional_profile_contacts')
    .select('*')
    .where('contact_id', contact_id)
    .first() as ProfessionalContact;
  return res.json(sqlQuery);
};

// POST endpoint to create a professional profile contact
export const ProfessionalContactPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newContact = req.body;

    const sqlQuery = await query('professional_profile_contacts').insert(newContact);
    const insertedContactId = sqlQuery[0];

    const createdContact = await query('professional_profile_contacts')
      .where('contact_id', insertedContactId)
      .first() as ProfessionalContact;

    res.status(201).json(createdContact);
  } catch (error) {
    console.error('Failed to create contact:', error);
    res.status(500).json({ message: 'Failed to create contact' });
  }
};

// PUT endpoint to update a professional profile contact
export const ProfessionalContactPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { contact_id } = req.params;
    const updatedFields = req.body;

    const sqlQuery = await query('professional_profile_contacts')
      .where('contact_id', contact_id)
      .update(updatedFields);

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      const updatedContact = await query('professional_profile_contacts')
        .where('contact_id', contact_id)
        .first() as ProfessionalContact;
      res.json(updatedContact);
    }
  } catch (error) {
    console.error('Failed to update contact:', error);
    res.status(500).json({ message: 'Failed to update contact' });
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
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete contact:', error);
    res.status(500).json({ message: 'Failed to delete contact' });
  }
};

// ===============================================================
// ================== COMPANY_PROFILE_CONTACTS ==================
// ===============================================================

// Returns all the company profile contacts with the given company_id
export const CompanyContactsGet: RequestHandler = async (_req: Request, res: Response) => {
  const { company_id } = _req.params;
  const sqlQuery = await query('company_contacts')
  .select('*')
  .where('company_id', company_id) as CompanyContact[];
  return res.json(sqlQuery);
};

// Returns the company profile contact with the given contact_id
export const CompanyContactGetById: RequestHandler = async (req: Request, res: Response) => {
  const { contact_id } = req.params;
  const sqlQuery = await query('company_contacts')
    .select('*')
    .where('contact_id', contact_id)
    .first() as CompanyContact;
  return res.json(sqlQuery);
};

// POST endpoint to create a company profile contact
export const CompanyContactPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newContact = req.body;

    const sqlQuery = await query('company_contacts').insert(newContact);
    const insertedContactId = sqlQuery[0];

    const createdContact = await query('company_contacts')
      .where('contact_id', insertedContactId)
      .first() as CompanyContact;

    res.status(201).json(createdContact);
  } catch (error) {
    console.error('Failed to create contact:', error);
    res.status(500).json({ message: 'Failed to create contact' });
  }
};

// PUT endpoint to update a company profile contact
export const CompanyContactPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { contact_id } = req.params;
    const updatedFields = req.body;

    const sqlQuery = await query('company_contacts')
      .where('contact_id', contact_id)
      .update(updatedFields);

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      const updatedContact = await query('company_contacts')
        .where('contact_id', contact_id)
        .first() as CompanyContact;
      res.json(updatedContact);
    }
  } catch (error) {
    console.error('Failed to update contact:', error);
    res.status(500).json({ message: 'Failed to update contact' });
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
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete contact:', error);
    res.status(500).json({ message: 'Failed to delete contact' });
  }
};

// ===============================================================
// ====================== PROJECT_CONTACTS =======================
// ===============================================================

// Returns all the project contacts with the given project_id
export const ProjectContactsGet: RequestHandler = async (_req: Request, res: Response) => {
  const { project_id } = _req.params;
  const sqlQuery = await query('project_contacts')
    .select('*')
    .where('project_id', project_id) as ProjectContact[];
  return res.json(sqlQuery);
};

// Returns the project contact with the given contact_id
export const ProjectContactGetById: RequestHandler = async (req: Request, res: Response) => {
  const { contact_id } = req.params;
  const sqlQuery = await query('project_contacts')
    .select('*')
    .where('contact_id', contact_id)
    .first() as ProjectContact;
  return res.json(sqlQuery);
};

// POST endpoint to create a project contact
export const ProjectContactPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newContact = req.body;

    const sqlQuery = await query('project_contacts').insert(newContact);
    const insertedContactId = sqlQuery[0];

    const createdContact = await query('project_contacts')
      .where('contact_id', insertedContactId)
      .first() as ProjectContact;

    res.status(201).json(createdContact);
  } catch (error) {
    console.error('Failed to create contact:', error);
    res.status(500).json({ message: 'Failed to create contact' });
  }
};

// PUT endpoint to update a project contact
export const ProjectContactPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { contact_id } = req.params;
    const updatedFields = req.body;

    const sqlQuery = await query('project_contacts')
      .where('contact_id', contact_id)
      .update(updatedFields);

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      const updatedContact = await query('project_contacts')
        .where('contact_id', contact_id)
        .first() as ProjectContact;
      res.json(updatedContact);
    }
  } catch (error) {
    console.error('Failed to update contact:', error);
    res.status(500).json({ message: 'Failed to update contact' });
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
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete contact:', error);
    res.status(500).json({ message: 'Failed to delete contact' });
  }
};
