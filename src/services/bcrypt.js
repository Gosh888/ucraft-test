import bcrypt from 'bcrypt';

export const hashPassword = (password) => bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));

export const comparePassword = (loginPassword, userPassword) =>
  bcrypt.compare(loginPassword, userPassword);
