import { RequestHandler, Request, Response } from "express";
import { knexInstance as query } from "../services/ConnetDB.services";
import { User } from "../types/users.d";
import { hashPassword } from "./Auth.middleWares";
import public_domains from "../resources/public_domains.json"

// * Temporary registration: (POST)
// Endpoint handler for the temporary registration
export const tempRegistrationPost = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Validate if it's an enterprise email
    const domains: string[] = public_domains.domains;
    const domainRegex = /@([^\s@]+)$/; // Regex to extract the domain from the email
    const extractedDomain = email.match(domainRegex)?.[1]; // Extract the domain from the email

    if (extractedDomain && domains.includes(extractedDomain)) {
      console.error("Email is not from an enterprise domain");
      return res.status(400).json({ message: 'Invalid email domain (public domain)' });
    }

    // Check if the email domain already exists in other users
    const existingUser = await query('users')
      .select('company_id')
      .where('email', 'LIKE', `%@${extractedDomain}`)
      .andWhere('company_id', 'IS NOT', null)
      .first();

    let companyProfileId = null;
    let userRole: string = 'COMPANY-STAFF';
    if (existingUser) {
      // Relate the new user to the existing company_profile
      companyProfileId = existingUser.company_id;
    } else {
      // Create a new company_profile and relate the new user to it
      const newCompanyProfile = await query('company_profiles')
        .insert({});
      companyProfileId = newCompanyProfile[0];
      userRole = 'COMPANY-ADMIN';
    }

    const tempPassword: string = '1234';
    const hashedPassword: string = await hashPassword(tempPassword);

    // Create the new user with the email and the company_profile id
    const newUser = await query('users')
      .insert({ email, company_id: companyProfileId, first_name: '', last_name: '', password_hash: hashedPassword, role: userRole});
    const insertedUserId = newUser[0];

    const createdUser = await query('users')
      .select('*')
      .where('user_id', insertedUserId)
      .first() as User;

    return res.status(201).json(createdUser);
  } catch (error) {
    console.error('Failed to register user:', error);
    return res.status(500).json({ message: 'Failed to register user' });
  }
};

// * Registration: (PUT)
// Update the user's attributes with the ones provided in the body
export const RegistrationPut: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { first_name, last_name, password, role } = req.body;

    // Validate that the user exists
    const hashedPassword: string = await hashPassword(password);

    const sqlQuery = await query('users')
      .where('user_id', user_id)
      .update({ first_name, last_name, password_hash: hashedPassword, role });

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
    console.error('Failed to register user:', error);
    return res.status(500).json({ message: 'Failed to register user' });
  }
};
