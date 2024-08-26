const { operableEntities } = require("../config/constants");
const Player = require("../model/player.model");
const { getSearchAndPagination } = require("../util/pagination");
const {
  getCreateResponse,
  getErrorResponse,
  getDeletionResponse,
  getUpdateResponse,
} = require("../util/responseHandler");

async function getPlayers(query) {
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
}
async function getPlayer(id) {
  try {
    console.log("on this id:" + id);
    const fetchResult = await Player.findById(id)
      .populate("rarity")
      .populate("nationality")
      .populate("league");

    return fetchResult;
  } catch (error) {
    console.log("in catch");
    return null;
    return getErrorResponse({ error, what: operableEntities.player });
  }
}

async function createPlayer(data) {
  try {
    const addResult = await Player.create(data);
    return getCreateResponse({
      data: addResult,
      what: operableEntities.player,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.player });
  }
}

async function updatePlayer({ id, data }) {
  try {
    const editResult = await Player.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({
      data: editResult,
      what: operableEntities.player,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.player });
  }
}
//
async function deletePlayer(id) {
  try {
    const deleteResult = await Player.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: operableEntities.player,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.player });
  }
}

module.exports = {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
