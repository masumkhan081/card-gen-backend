const { operableEntities } = require("../config/constants");
const Card = require("../model/card.model");
const { getSearchAndPagination } = require("../util/pagination");
const {
  getCreateResponse,
  getErrorResponse,
  getDeletionResponse,
  getUpdateResponse,
} = require("../util/responseHandler");

async function getCards(query) {
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

async function createCard(data) {
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

async function updateCard({ id, data }) {
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
async function deleteCard(id) {
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

module.exports = { getCards, createCard, deleteCard, updateCard };
