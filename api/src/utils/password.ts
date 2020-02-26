import bcrypt from 'bcryptjs';

export const isValidPassword = (
  password: string, hash: string,
): boolean => bcrypt.compareSync(password, hash);

export const hashPassword = (password: string): string => bcrypt.hashSync(password, 8);
