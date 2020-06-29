const Game = require('../models/Game');
const ErrorResponse = require('../utils/errorResponse');
const PlayerRepository = require('../repositories/player').PlayerRepository;
const SimulateGameService = require('../utils/simulateGame');  

class GameRepository {

    /**
     * Simulate game
     */
    static async simulateGame(gameId) {
        let game = await Game.findById(gameId)
        .populate({
            path: 'homeTeam',
            select: 'name arenaName arenaSize'
        }).populate({
            path: 'visitorTeam',
            select: 'name'
        });

        if(game.winner) {
            return game;
        }

        const local = await PlayerRepository.findTeamPlayers(game.homeTeam);
        const visitor = await PlayerRepository.findTeamPlayers(game.visitorTeam);

        const simulatedGame = await SimulateGameService.simulateGame(game, local, visitor);

        //simulatedGame['homeTeam'] = game.homeTeam;

        game = await Game.findByIdAndUpdate(gameId, simulatedGame, {
            new: true,
            runValidators: true
        });

        return game;
    }
}

exports.GameRepository = GameRepository;