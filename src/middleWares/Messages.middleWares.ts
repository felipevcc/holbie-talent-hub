import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { Message } from "../types/messages.d";

// ===============================================================
// ========================== MESSAGES ===========================
// ===============================================================

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
    res.status(500).json({ message: 'Failed to get message' });
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
    res.status(500).json({ message: 'Failed to update message' });
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
    res.status(500).json({ message: 'Failed to get user\'s sent messages' });
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
    res.status(500).json({ message: 'Failed to get user\'s received messages' });
  }
}

// POST endpoint to create a message
export const MessagePost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { subject, content, type_connection , receiver_id, application_id = null, project_id = null } = req.body;
    const sqlQuery = await query('messages')
      .insert({ subject, content, type_connection, sender_id: user_id, receiver_id, application_id, project_id });

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
