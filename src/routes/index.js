import { Router } from "express";
import tournamentsYearRouter from './tournament_year.js';
import countryRouter from './country.js';
import playerRouter from './player.js';

const router = Router();
router.use(
    tournamentsYearRouter,
    countryRouter,
    playerRouter
);
export default router;