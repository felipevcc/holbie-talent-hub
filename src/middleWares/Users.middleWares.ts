import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { User } from "../types/users.d";
import bcrypt from 'bcrypt';

// Returns all the users
export const UsersGet: RequestHandler = async (_req: Request, res: Response) => {
  const sqlQuery = await query('users').select('*') as User[];
  return res.json(sqlQuery);
};

// Returns the user with the given user_id
export const UserGetById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const sqlQuery = await query('users')
      .select('*')
      .where('user_id', user_id)
      .first() as User;
    if (!sqlQuery) {
      return res.status(404).json({ message: 'User id not found' });
    }
    return res.json(sqlQuery);
  } catch (error) {
    console.error('Failed to get user:', error);
    return res.status(500).json({ message: 'Failed to get user' });
  }
};

// POST endpoint to create an user
export const UserPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password_hash, role, company_id = null, professional_id = null } = req.body;

    // Number of salt rounds (higher is safer but slower)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

    const sqlQuery = await query('users')
      .insert({ first_name, last_name, email, password_hash: hashedPassword, role, company_id, professional_id });
    const insertedUserId = sqlQuery[0];

    const createdUser = await query('users')
      .where('user_id', insertedUserId)
      .first() as User;

    return res.status(201).json(createdUser);
  } catch (error) {
    console.error('Failed to create user:', error);
    return res.status(500).json({ message: 'Failed to create user' });
  }
};

// PUT endpoint to update an user
export const UserPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { first_name, last_name, email, password_hash, role } = req.body; // the role and id can be modified

    let hashedPassword: string | undefined = undefined;
    if (password_hash !== undefined) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password_hash, saltRounds);
    }

    const updateData: Partial<User> = { first_name, last_name, email, role };
    if (hashedPassword !== undefined) {
      updateData.password_hash = hashedPassword;
    }

    const sqlQuery = await query('users')
      .where('user_id', user_id)
      .update(updateData);

    const affectedRows = sqlQuery;
    if (!affectedRows) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      const updatedUser = await query('users')
        .where('user_id', user_id)
        .first() as User;
      return res.json(updatedUser);
    }
  } catch (error) {
    console.error('Failed to update user:', error);
    return res.status(500).json({ message: 'Failed to update user' });
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
      return res.status(404).json({ message: 'User not found' });
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    console.error('Failed to delete user:', error);
    return res.status(500).json({ message: 'Failed to delete user' });
  }
};
