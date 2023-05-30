import { RequestHandler } from "express";

export const UsersGet: RequestHandler = (_req, res) => {
  return res.json({
    message: 'UsersGet',
    user: {
      name: 'Jhon',
      lastName: 'Doe',
      age: 25
    }
  });
};
