const GameAction = require('./gameAction');
const PlayerStandingsOnGame = require('./playerStandingsOnGame');

exports.simulateGame = async (game, local, visitor) => {
    let totalHomePoints = 0;
    let totalVisitorPoints = 0;
    let scoreByQuarter = []
    let gameActions = [];

    let homePoints = 0;
    let visitorPoints = 0;

    let gameTime = 0;

    gameActions.unshift(new GameAction(gameTime, 'startOfTheGame', 'Game starts.'))

    for(let i=0; i<4; i++) {
        gameActions.unshift(new GameAction(gameTime, 'startOfQtr', `Start of quarter. ${totalHomePoints} - ${totalVisitorPoints}`))
        homePoints = getRandomInt(15, 30);
        visitorPoints = getRandomInt(15, 30);
        scoreByQuarter.push({
            homePoints,
            visitorPoints,
            actions: actionsDuringQuarter()
        });
        totalHomePoints += homePoints;
        totalVisitorPoints += visitorPoints;
        gameTime += 10 * 60;
        gameActions.unshift(new GameAction(gameTime, 'endOfQtr', `End of quarter. ${totalHomePoints} - ${totalVisitorPoints}`))
    }

    let localStandings = local.map(player => new PlayerStandingsOnGame(player.name, 0, 0, 0, 0, 0, 0));
    let visitorStandings = visitor.map(player => new PlayerStandingsOnGame(player.name, 0, 0, 0, 0, 0, 0));

    gameActions.unshift(new GameAction(gameTime, 'endOfTheGame', 'End of the game.'));

    let winner = homePoints > visitorPoints ? game.homeTeam : game.visitorTeam;
    let winnerPlayers = homePoints > visitorPoints ? local : visitor;
    let mostValuablePlayer = await generateMVP(winnerPlayers)

    return {
        homePoints: totalHomePoints,
        visitorPoints: totalVisitorPoints,
        winner,
        mostValuablePlayer,
        scoreByQuarter,
        gameActions,
        gameStandings: {
            localStandings,
            visitorStandings
        }
    }
}

const generateMVP = (winnerTeam) => {
    return winnerTeam[getRandomInt(0,1)].name;
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const actionsDuringQuarter = () => {
    let actions = 0;
    let time = 10 * 60;
    while(time > 24) {
        time = time - getRandomInt(7, 24);
        actions++;
    }
    actions++;
    return actions;
}