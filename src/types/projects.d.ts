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
