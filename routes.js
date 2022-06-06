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

routes.get('/games', (req, res) => {
  return res.status(200).json(DB.games);
});

routes.get('/game/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) return res.status(400).json({ error: 'Parâmetro inválido' });

  let game = DB.games.find(g => g.id == id);

  if (!game) return res.status(404).json({ error: 'Game não encontrado' });

  return res.status(200).json(game);
});

routes.delete('/game/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) return res.status(400).json({ error: 'Parâmetro inválido' });

  let index = DB.games.findIndex(g => g.id == id)

  if (index == -1) return res.status(404).json({ error: 'Game não encontrado' });

  let removedGame = DB.games.splice(index, 1);

  return res.status(200).json({ data: removedGame, message: 'Game removido' });
})

routes.put('/game/:id', (req, res) => {
  const id = req.params.id;
  const { name, year, price } = req.body;

  if (isNaN(id)) return res.status(400).json({ error: 'Parâmetro inválido' });

  let game = DB.games.find(g => g.id == id);

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

  return res.status(200).json(game);
});
