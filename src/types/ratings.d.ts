export interface Rating {
  rating_id: number;
  positive_rating: boolean;
  comment: string;
  created_at: Date;
  updated_at: Date;
  sender_id: number;
  receiver_id: number;
};
