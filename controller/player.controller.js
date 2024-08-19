const playerService = require("../services/player.service")
// 
async function getPlayers(req, res) {

      const { search } = req.query;
      // 
      const result = await playerService.getPlayers(search);
      // 
      res.send({
            statusCode: result ? 200 : 404,
            success: result ? true : false,
            message: result ? "Players fetched successfully" : "No data found",
            data: result,
      });
}

module.exports = {
      getPlayers,
};
