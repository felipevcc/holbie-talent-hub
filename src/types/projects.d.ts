export interface Project {
  id: number;
  title: string;
  description: string;
  repository: string;
  website: string;
  start_date: string;
  end_date: string;
  created_at: Date;
  updated_at: Date;
  is_capstone: boolean;
}

export interface Capstone {
  company_id: number;
  project_id: number;
  kind: string;
  active: boolean;
}
