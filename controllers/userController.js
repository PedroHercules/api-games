import express from 'express';

import { User } from '../models/User.js';

import { generateToken } from '../services/auth-service.js';

const routes = express.Router();

routes.post('/register', async (req, res) => {
  console.log('kkkkk')
  try {
    const { nickname, email, password } = req.body;

    if (!nickname || !email || password){
      return res.status(400).json({error: "Dados de usuário são obrigatórios"});
    }

    const userExist = await User.findOne({ $or: [ {'nickname': nickname}, {'email': email} ] });

    if (userExist) return res.status(400).json({ error: 'Esse usuário já existe' });

    await User.create({
      nickname,
      email,
      password
    });

    return res.status(201).json({ message: 'Usuário criado' });
  } catch (error) {
    return res.status(500).send();
  }
});

routes.post('/auth', async (req, res) => {
  try {
    const { nickname, password } = req.body;
    
    if (!nickname || !password){
      return res.status(400).json({ error: "Dados de login são obrigatórios" });
    }

    const user = await User.findOne({"nickname": nickname});
    if (!user){
      return res.status(404).json({ error: "Usuário não existe" });
    }

    if (user.password != password){
      return res.status(404).json({ error: "Senha incorreta" });
    }
    user.password = undefined;
    const token = generateToken({ id: user.id, nickname: user.nickname });
    return res.status(200).json({ token, user })
  } catch (error) {
    return res.status(500).send();
  }
});

export default routes;