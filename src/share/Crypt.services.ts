import bycrypt from 'bcrypt';

// Function to hash the password
export const hashPassword = async (password: string) => {
  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hash(password, salt);
  return hash;
};

// Function to verify the entered password with the hash stored in the database
export const auth = async (password: string, hash: string) => {
  return await bycrypt.compare(password, hash);
};
