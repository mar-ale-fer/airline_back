require('dotenv').config();
import jwt from 'jwt-decode'
import { userSessionType } from '../../types/userSessionType';
export const getJWTTokenFromRequest = (req: { req: { headers: { authorization: any; }; }; }) => {
  const header = req.req.headers.authorization;
  if (header) {
    const token = header.replace('Bearer ', '');
    return token;
  }

  throw new Error('You must be logged in to access the resource');
}

export const getUserFromToken = (jwtToken: string): userSessionType => {
  if (!jwtToken || jwtToken === '') throw new Error('No session token information');

  let user: userSessionType = null
  try {
    user = jwt(jwtToken);
  } catch (e: any) {
    throw new Error('The token is invalid. Sign in again');
  }

  if (user) return user
  return null
}
