export interface Rating {
  rating_id: number;
  positive_rating: boolean;
  comment: string;
  created_at: Date;
  updated_at: Date;
  sender_id: number;
  receiver_id: number;
};

export interface ProjectRating {
  rating_id: number;
  positive_rating: boolean;
  comment: string;
  created_at: Date;
  updated_at: Date;
  company_id: number;
  project_id: number;
};
