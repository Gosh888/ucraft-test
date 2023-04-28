import jwt from 'jsonwebtoken';

export const signToken = (data, expiresIn, secret) => jwt.sign(data, secret, { expiresIn });

export const verifyToken = (token, secret) => jwt.verify(token, secret);
