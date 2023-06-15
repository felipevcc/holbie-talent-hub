import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { Message } from "../types/messages.d";

// ===============================================================
// ========================== MESSAGES ===========================
// ===============================================================

/*
USERS-MESSAGES
users/<user_id>/messages (GET)
users/<user_id>/messages/sent (GET)
users/<user_id>/messages/received (GET)

messages (POST)
messages/<message_id> (GET, DELETE, PUT)

CREATE TABLE IF NOT EXISTS messages (
  message_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  subject VARCHAR(255),
  content TEXT,
  type_connection ENUM('COMPANY', 'PROJECT') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  sender_id BIGINT UNSIGNED NOT NULL,
  receiver_id BIGINT UNSIGNED NOT NULL,
  application_id BIGINT UNSIGNED NULL,
  project_id BIGINT UNSIGNED NULL,
  FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (application_id) REFERENCES applications(application_id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);
*/

// Returns the message with the given message_id
export const MessageGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { message_id } = req.params;
    const sqlQuery = await query('messages')
      .select('*')
      .where('message_id', message_id)  
      .first() as Message;
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get message', error);
    res.status(500).json({ message: 'Message id not found' });
  }
};

// PUT endpoint to update a message
export const MessagePut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { message_id } = req.params;
    const { subject, content } = req.body;
    const sqlQuery = await query('messages')
      .where('message_id', message_id)
      .update({ subject, content });

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'Message not found' });
    } else {
      const updatedMessage = await query('messages')
        .where('message_id', message_id)
        .first() as Message;
      res.json(updatedMessage);
    }
  } catch (error) {
    console.log('Failed to update message', error);
    res.status(500).json({ message: 'Message id not found' });
  }
}

// ===============================================================
// ====================== USERS - MESSAGES =======================
// ===============================================================

// Returns all messages sent by the user with the given user_id
export const UserSentMessagesGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const sqlQuery = await query('messages')
      .select('*')
      .where('sender_id', user_id) as Message[];
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get user\'s sent messages', error);
    res.status(500).json({ message: 'User id not found' });
  }
}

// Returns all user's messages received with the given user_id
export const UserReceivedMessagesGet: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const sqlQuery = await query('messages')
    .select('*')
    .where('receiver_id', user_id) as Message[];
    res.json(sqlQuery);
  } catch (error) {
    console.log('Failed to get user\'s received messages', error);
    res.status(500).json({ message: 'User id not found' });
  }
}

// POST endpoint to create a message
export const MessagePost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { subject, content, type_connection, sender_id, receiver_id, application_id = null, project_id = null } = req.body;
    const sqlQuery = await query('messages')
      .insert({ subject, content, type_connection, sender_id, receiver_id, application_id, project_id });

    const messageId = sqlQuery[0];
    const createdMessage = await query('messages')
      .select('*')
      .where('message_id', messageId)
      .first() as Message;
    res.status(201).json(createdMessage);
  } catch (error) {
    console.log('Failed to create message', error);
    res.status(500).json({ message: 'Failed to create message' });
  }
}
