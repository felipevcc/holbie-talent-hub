export interface ProfessionalContact {
  contact_id: number;
  contact_type: string;
  contact_info: string;
  created_at: Date;
  updated_at: Date;
  profile_id: number;
}

export interface CompanyContact {
  contact_id: number;
  contact_type: string;
  contact_info: string;
  created_at: Date;
  updated_at: Date;
  company_id: number;
}

export interface ProjectContact {
  contact_id: number;
  contact_type: string;
  contact_info: string;
  created_at: Date;
  updated_at: Date;
  project_id: number;
}
