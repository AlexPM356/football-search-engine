import currentDateTime from '../utils/time.js';
import path from 'path';
import pool from "../config/index.js";
import { Router } from "express";
import { views_path } from '../index.js';

const router = Router();

router.get('/api/world_cup/:year', async (req, res) => {
    console.log(req.url);
    console.log(currentDateTime)
    console.log('----------------------------------------------');
    const results = await pool.query(
        'SELECT DISTINCT year_played, country FROM copy_world_cup_players WHERE year_played = $1' +
        ' ORDER BY country', [req.params.year]
    )
    res.render(path.join(views_path + '/world_cup_year.ejs'),
    {countries: results.rows, year: req.params.year});
});

export default router;