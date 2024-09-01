const { operableEntities } = require("../config/constants");
const Player = require("../model/player.model");
const { getSearchAndPagination } = require("../util/pagination");

async function getPlayers(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.player });

    const fetchResult = await Player.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit)
      .populate("rarity")
      .populate("nationality")
      .populate("league");

    const total = await Player.countDocuments(filterConditions);
    return {
      meta: {
        total,
        limit: viewLimit,
        page: currentPage,
        skip: viewSkip,
        sortBy,
        sortOrder,
      },
      data: fetchResult,
    };
  } catch (error) {
    return error;
  }
}

//
async function getPlayer(id) {
  try {
    console.log("on this id:" + id);
    const fetchResult = await Player.findById(id)
      .populate("rarity")
      .populate("nationality")
      .populate("league");

    return fetchResult;
  } catch (error) {
    return error;
  }
}

async function updatePlayer({ id, data }) {
  try {
    const editResult = await Player.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deletePlayer(id) {
  try {
    const deleteResult = await Player.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer,
};
