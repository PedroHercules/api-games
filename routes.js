import express from 'express';

import { Game } from './models/Game.js';

export const routes = express.Router();

routes.post('/game', async (req, res) => {
  try {
    console.log('Entrou')
    const game = await Game.create(req.body);
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

    const game = await Game.findById(id);

    if (!game) return res.status(404).json({ error: 'Game não encontrado' });

    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
});

routes.delete('/game/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const game = await Game.findById(id);
    if (!game) return res.status(404).json({ error: 'Jogo não encontrado' });

    await Game.deleteOne({_id: id});

    return res.status(200).json({ data: game, message: 'Game removido' });
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
})

routes.put('/game/:id', async (req, res) => {

  try {
    const id = req.params.id;
    const { name, year, price } = req.body;

    const game = await Game.findById(id);
    if (!game) return res.status(404).json({ error: 'Game não encontrado' });

    if (name != undefined) {
      game.name = name
    }

    if (year != undefined) { 
      game.year = year;
    }

    if (price != undefined) { 
      game.price = price
    }

    game.save();

    return res.status(200).json(game);
  } catch (error) {
    
  }
});
