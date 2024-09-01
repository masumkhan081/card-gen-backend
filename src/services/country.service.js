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
  try {
    const fetchResult = await Country.find().skip(0).limit(0);
    const total = await Country.countDocuments();
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
//

async function getCountries(query) {
  try {
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
  } catch (error) {
    return error;
  }
}

async function updateCountry({ id, data }) {
  try {
    const editResult = await Country.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteCountry(id) {
  try {
    const deleteResult = await Country.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getCountries,
  getCountriesAll,

  updateCountry,
  deleteCountry,
};
