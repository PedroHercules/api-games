import express from 'express';

import { Game } from '../models/Game.js';

import { authorize } from '../services/auth-service.js';

const routes = express.Router();

routes.post('/game', authorize, async (req, res) => {
  try {
    const { name, year, price } = req.body;
    if (!name || !year){
      return res.status(400).json({error: "Todos os dados de requisição são obrigatórios"})
    }

    if(typeof name !== 'string'){
      return res.status(400).json({ error: "O nome precisa ser String!" });
    }
    if(typeof year !== 'number'){
      return res.status(400).json({ error: "O ano precisa ser um número!" });
    }
    if(typeof price !== 'number'){
      return res.status(400).json({ error: "O preço precisa ser um número" });
    }

    const gameExists = await Game.findOne({name: name});

    if (gameExists){
      return res.status(400).json({ error: "Este jogo já existe no banco de dados" })
    }

    const game = await Game.create({
      name,
      year,
      price
    });
    return res.status(201).json(game);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

routes.get('/games', async (req, res) => {
  try {
    const games = await Game.find();
    return res.status(200).json(games);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

routes.get('/game/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!id){
      return res.status(400).json({error: "Parâmetro ID é obrigatório"})
    }

    const game = await Game.findById(id);

    if (!game) return res.status(404).json({ error: 'Game não encontrado' });

    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
});

routes.delete('/game/:id', authorize, async (req, res) => {
  try {
    const id = req.params.id;

    if (!id){
      return res.status(400).json({error: "Parâmetro ID é obrigatório"})
    }

    const game = await Game.findById(id);
    if (!game) return res.status(404).json({ error: 'Jogo não encontrado' });

    await Game.deleteOne({_id: id});

    return res.status(200).json({ data: game, message: 'Game removido' });
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
})

routes.put('/game/:id', authorize, async (req, res) => {

  try {
    const id = req.params.id;

    if (!id){
      return res.status(400).json({error: "Parâmetro ID é obrigatório"})
    }

    const { name, year, price } = req.body;

    const game = await Game.findById(id);
    if (!game) return res.status(404).json({ error: 'Game não encontrado' });

    if (name != undefined) {
      if(typeof name !== 'string'){
        return res.status(400).json({ error: "O nome precisa ser String!" });
      }
      game.name = name
    }

    if (year != undefined) {
      if(typeof year !== 'number'){
        return res.status(400).json({ error: "O ano precisa ser um número!" });
      } 
      game.year = year;
    }

    if (price != undefined) {
      if(typeof price !== 'number'){
        return res.status(400).json({ error: "O preço precisa ser um número" });
      } 
      game.price = price
    }

    game.save();

    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
});

export default routes;
