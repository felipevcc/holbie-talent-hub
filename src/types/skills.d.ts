export interface Skill {
  user_id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export interface ProfileSkill {
  user_id: number;
  name: string;
  description: string;
  proficiency_level: number;
}
