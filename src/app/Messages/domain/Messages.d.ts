export interface Message {
  message_id: number;
  subject: string;
  content: string;
  type_connection: string;
  created_at: Date;
  updated_at: Date;
  sender_id: number;
  receiver_id: number;
  application_id: number;
  project_id: number;
}
