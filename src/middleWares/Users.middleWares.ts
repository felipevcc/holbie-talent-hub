import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { User } from "../types/users.d";

// Returns all the users
export const UsersGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('users').select('*') as User[];
  res.json(sqlQuery);
};

// Returns the user with the given user_id
export const UserGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const sqlQuery = await query('users')
      .select('*')
      .where('user_id', user_id)
      .first() as User;
    res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get user:', error);
    res.status(404).json({ message: 'Failed to get user' });
  }
};

// POST endpoint to create an user
export const UserPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;

    const sqlQuery = await query('users').insert(newUser);
    const insertedUserId = sqlQuery[0];

    const createdUser = await query('users')
      .where('user_id', insertedUserId)
      .first() as User;

    res.status(201).json(createdUser);
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

// PUT endpoint to update an user
export const UserPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const updatedFields = req.body;

    const sqlQuery = await query('users')
      .where('user_id', user_id)
      .update(updatedFields);

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      res.status(404).json({ message: 'User not found' });
    } else {
      const updatedUser = await query('users')
        .where('user_id', user_id)
        .first() as User;
      res.json(updatedUser);
    }
  } catch (error) {
    console.error('Failed to update user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// DELETE endpoint to delete an user
export const UserDelete: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const sqlQuery = await query('users')
      .where('user_id', user_id)
      .del();

    const deletedRows = sqlQuery;
    if (!deletedRows) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
