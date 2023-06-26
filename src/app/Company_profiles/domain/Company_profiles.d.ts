export interface CompanyProfile {
  profile_id: number;
  company_name: string;
  industry: string;
  about_us: string;
  location: string;
  website: string;
  created_at: Date;
  updated_at: Date;
}

export interface FavoriteProfile {
  company_id: number;
  profile_id: number;
}
