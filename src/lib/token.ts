import jwt, { SignOptions } from 'jsonwebtoken';
import { Context, Middleware } from 'koa';
import { getRepository } from 'typeorm';
import User from '../entity/User';
import '../env';

const { SECRET_KEY } = process.env;

if (!SECRET_KEY) {
  const error = new Error('InvalidSecretKeyError');
  error.message = 'Secret key for JWT is missing.';
  throw error;
}

export const generateToken = (payload: any, options: SignOptions): Promise<string> => {
  const jwtOptions: SignOptions = {
    issuer: 'songc.io',
    expiresIn: '7d',
    ...options
  };
  if (!jwtOptions.expiresIn) {
    delete jwtOptions.expiresIn;
  }
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, jwtOptions, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export const decodeToken = <T = any>(token: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded as any);
    });
  });
};

export function setTokenCookie(
  ctx: Context,
  tokens: { accessToken: string; refreshToken: string }
) {
  // set cookie
  ctx.cookies.set('access_token', tokens.accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    domain: process.env.NODE_ENV === 'development' ? undefined : '.songc.io'
  });

  ctx.cookies.set('refresh_token', tokens.refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    domain: process.env.NODE_ENV === 'development' ? undefined : '.songc.io'
  });
}

type TokenData = {
  iat: number;
  exp: number;
  sub: string;
  iss: string;
};
