const { operableEntities } = require("../config/constants");
const League = require("../model/league.model");
const { getSearchAndPagination } = require("../util/pagination");

async function getLeaguesAll() {
  try {
    const fetchResult = await League.find().skip(0).limit(0);
    const total = await League.countDocuments();
    return {
      meta: {
        total,
      },
      data: fetchResult,
    };
  } catch (error) {
    return error;
  }
}

async function getLeagues(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.league });

    const fetchResult = await League.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await League.countDocuments(filterConditions);
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

async function updateLeague({ id, data }) {
  try {
    const editResult = await League.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteLeague(id) {
  try {
    const deleteResult = await League.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getLeagues,
  getLeaguesAll,
  deleteLeague,
  updateLeague,
};
