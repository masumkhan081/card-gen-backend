const playerData = require("../static-data/footballers.json")


async function getPlayers(search) {
      const regex = new RegExp(search, 'i');
      return playerData.filter(player => regex.test(player.name));
}

module.exports = { getPlayers };