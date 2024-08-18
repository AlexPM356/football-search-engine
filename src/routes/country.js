import currentDateTime from '../utils/time.js';
import path from 'path';
import pool from "../config/index.js";
import { Router } from "express";
import { views_path } from '../index.js';

const router = Router();

router.get('/api/world_cup/:year/:country', async (req, res) => {
    console.log(req.url);
    console.log(currentDateTime)
    console.log('----------------------------------------------');
    let countryParam = req.params.country;
    let countryDB = (countryParam[0].toUpperCase() + countryParam.slice(1));
    const results = await pool.query(
        'SELECT player_name, player_position, shirt_number FROM copy_world_cup_players' +
        ' WHERE year_played = $1 AND country = $2' +
        ' ORDER BY shirt_number', [parseInt(req.params.year), countryDB]
    );
    res.render(path.join(views_path + '/countries.ejs'),
    {players: results.rows, country: countryDB, countryYear: req.params.year});
});

export default router;