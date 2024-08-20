const { operableEntities } = require("../config/constants");
const Club = require("../model/club.model");
const { getSearchAndPagination } = require("../util/pagination");
const {
  getCreateResponse,
  getErrorResponse,
  getDeletionResponse,
  getUpdateResponse,
} = require("../util/responseHandler");

async function getClubs(query) {
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

async function createClub(data) {
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

async function updateClub({ id, data }) {
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
async function deleteClub(id) {
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

module.exports = { getClubs, createClub, deleteClub, updateClub };
