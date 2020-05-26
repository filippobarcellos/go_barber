import { verify } from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch {
    throw new Error('Invalid JWT Token');
  }
}
