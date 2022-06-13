import jwt from 'jsonwebtoken';

import { User } from '../models/User.js';

import 'dotenv/config';

export function generateToken(data){
  return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1d' });
}

export function authorize(req, res, next) {
  const token = req.headers['access-token'];

  if (!token){
    return res.status(401).json({error: 'Acesso restrito'});
  }

  jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
    if (error) {
      return res.status(401).json({error: 'Token inválido'});
    }
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
  })
}