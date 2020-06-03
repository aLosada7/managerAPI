const Player = require('../models/Player');

class PlayerRepository {

    /**
     * Get team players
     */
    static findTeamPlayers(teamId) {
      return Player.find({ team: teamId });
    }
}

exports.PlayerRepository = PlayerRepository;