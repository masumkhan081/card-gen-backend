const { operableEntities } = require("../config/constants");
const League = require("../model/league.model");
const { getSearchAndPagination } = require("../util/pagination");
const {
  getCreateResponse,
  getErrorResponse,
  getDeletionResponse,
  getUpdateResponse,
} = require("../util/responseHandler");
// 


// 

async function getLeaguesAll() {
  const fetchResult = await League.find().skip(0).limit(0);
  const total = await League.countDocuments();
  return {
    meta: {
      total,
    },
    data: fetchResult,
  };
}
// 

// 

async function getLeagues(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({ query, what: operableEntities.Club });

  const fetchResult = await Club.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Club.countDocuments(filterConditions);
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

async function createLeague(data) {
  try {
    const addResult = await Club.create(data);
    return getCreateResponse({
      data: addResult,
      what: operableEntities.club,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.club });
  }
}

async function updateLeague({ id, data }) {
  try {
    const editResult = await Club.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({
      data: editResult,
      what: operableEntities.club,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.club });
  }
}
//
async function deleteLeague(id) {
  try {
    const deleteResult = await Club.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: operableEntities.club,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.club });
  }
}

module.exports = { getLeagues,getLeaguesAll, createLeague, deleteLeague, updateLeague };
