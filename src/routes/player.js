import currentDateTime from '../utils/time.js';
import path from 'path';
import pool from "../config/index.js";
import { Router } from "express";
import { views_path } from '../index.js';

const router = Router();

router.get('/api/:player', async (req, res) => {
    console.log(req.url);
    console.log(currentDateTime)
    console.log('----------------------------------------------');
    const results = await pool.query(
        'SELECT DISTINCT player_position, caps, goals, country, birthdate, year_played' +
        ' FROM copy_world_cup_players' +
        ` WHERE player_name = $1 ORDER BY year_played DESC LIMIT 1`, [req.params.player]
    );
    res.render(path.join(views_path + '/player.ejs'), {
        player: results.rows,
        playerName: req.params.player
    });
});

export default router;