const { operableEntities } = require("../config/constants");
const Country = require("../model/country.model");
const { getSearchAndPagination } = require("../util/pagination");
const {
  getCreateResponse,
  getErrorResponse,
  getDeletionResponse,
  getUpdateResponse,
} = require("../util/responseHandler");
// 

async function getCountriesAll() {
  const fetchResult = await Country.find().skip(0).limit(0);
  const total = await Country.countDocuments();
  return {
    meta: {
      total,
    },
    data: fetchResult,
  };
}
// 

async function getCountries(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({ query, what: operableEntities.country });

  const fetchResult = await Country.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Country.countDocuments(filterConditions);
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

async function createCountry(data) {
  try {
    const addResult = await Country.create(data);
    return getCreateResponse({
      data: addResult,
      what: operableEntities.country,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.country });
  }
}

async function updateCountry({ id, data }) {
  try {
    const editResult = await Country.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({
      data: editResult,
      what: operableEntities.country,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.country });
  }
}
//
async function deleteCountry(id) {
  try {
    const deleteResult = await Country.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: operableEntities.country,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.country });
  }
}

module.exports = { getCountries,getCountriesAll, createCountry, updateCountry, deleteCountry };
