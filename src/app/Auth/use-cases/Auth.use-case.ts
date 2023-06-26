import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "$Infrastructure/MySQL/ConnetDB.services";
import { auth } from "$Share/Crypt.services";

// Login
export const Login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Obtaining the stored hash from the database using the email
    const storedUser = await query('users').where('email', email).first();
    const storedHashedPassword = storedUser?.password_hash;

    if (!storedHashedPassword) {
      // User with the entered email was not found
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify the entered password with the stored hash
    const passwordMatch = await auth(password, storedHashedPassword);

    if (passwordMatch) {
      return res.status(200).json(storedUser);
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Failed to login', error);
    return res.status(500).json({ message: 'Failed to login' });
  }
};
