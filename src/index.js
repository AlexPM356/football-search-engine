import currentDateTime from './utils/time.js';
import bodyParser from 'body-parser';
import express from 'express';
import { fileURLToPath } from 'url';
import limiter from './utils/limiter.js';
import path from 'path';
import pool from './config/index.js';
import routes from './routes/index.js';
import year_played from './utils/lists_render.js';

//============================================================================================
//DEFINE PATH TO RENDER HTML FILES AND EXPRESS CONSTANTS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const views_path = __dirname + '/views';

const app = express();
const PORT = process.env.PORT || 8443;

app.use(routes);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'script')));
app.use(limiter);

//============================================================================================
const results = await pool.query('SELECT DISTINCT player_name FROM copy_world_cup_players');
const playersList = [];
for (let i = 0; i < results.rows.length; i++) {
    playersList.push(results.rows[i].player_name);
}

app.get('/', async (req, res) =>{
    console.log(req.url);
    console.log(currentDateTime);
    console.log('----------------------------------------------');
    res.render(path.join(views_path + '/index.ejs'), {
        players: playersList,
        years: year_played
    });
});

app.post('/redirect', (req, res) => {
    if (playersList.includes(req.body.player)) {
        res.redirect(`/api/${req.body.player}`);
    } else { res.redirect('/') }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('----------------------------------------------');
});