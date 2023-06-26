export interface ProfessionalProfile {
  profile_id: number;
  is_user: boolean;
  headline: string;
  about_me: string;
  location: string;
  job_name: string;
  kind_job: string;
  job_type: string;
  salary_min: number;
  salary_max: number;
  created_at: Date;
  updated_at: Date;
}

export interface Education {
  education_id: number;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
  profile_id: number;
}

export interface Experience {
  experience_id: number;
  company_name: string;
  position: string;
  description: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
  profile_id: number;
}
